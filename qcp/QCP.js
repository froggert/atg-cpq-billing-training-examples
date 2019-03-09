/**
 * SFDC QCP Plugin docs: https://resources.docs.salesforce.com/214/latest/en-us/sfdc/pdf/cpq_plugins.pdf
 *
 * It is recommended Use the JavaScript way of iterating look (e.x. rarely use for(i=0;i++;i<foo) and instead use array iteraction methods and chain them together)
 * Overview: https://gist.github.com/ljharb/58faf1cfcb4e6808f74aae4ef7944cff
 *
 * The conn property is a customized JSForce connection object that can be used to perform DML or call Apex methods
 *
 * FROM DOCS:
 * JSForce is a third-party library that provides a unified way to perform queries, execute Apex REST calls, use theMetadata API, or make
 * HTTP requests remotely. Methods access jsforce through the optional parameter conn.
 *
 * This code must be able to run in the browser and on node, do not use any browser specific (e.x. DOM) related functions
 *
 * TIP: if you are using VSCode, rename the file with a .ts file extension to get better IDE debug information.
 *
 * For information on when each Life Cycle Hook runs in the Calculation Sequence, refer to this Salesforce Documentation
 * https://help.salesforce.com/articleView?id=cpq_quote_calc_process.htm&type=5
 */

const DEBUG = true;
const MIN_SUB_TERM_PRODUCT_CODE = "GC-01";
/**
 * Log - takes any number of parameters and will log them to the console if DEBUG = true
 */
function log(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}

/**
 * Page Security Plugin
 * Allows hiding or locking down fields based on conditions
 */
export function isFieldEditable(fieldName, quoteLine) {
  if (fieldName === "SBQQ__SubscriptionTerm__c") {
    return quoteLine.SBQQ__ProductCode__c === MIN_SUB_TERM_PRODUCT_CODE;
  }
  return true;
}

/**
 * QCP PLUGIN LIFE-CYCLE HOOKS
 */

export function onInit(quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    log("onInit()", quoteLineModels);

    resolve();
  });
}
export function onBeforeCalculate(quoteModel, quoteLineModels) {
  return new Promise((resolve, reject) => {
    log("onBeforeCalculate()", quoteModel, quoteLineModels);

    // Set the max subscription term on whichever quote line if the parent to the product code provided
    const minimumTerm =
      typeof quoteModel.record.Min_Subscription_Term__c === "number"
        ? quoteModel.record.Min_Subscription_Term__c
        : 12;
    getMaxSubTermForProductsByBundle(
      quoteLineModels,
      MIN_SUB_TERM_PRODUCT_CODE,
      minimumTerm
    );

    resolve();
  });
}
export function onBeforePriceRules(quoteModel, quoteLineModels) {
  return new Promise((resolve, reject) => {
    log("onBeforePriceRules()", quoteModel, quoteLineModels);

    resolve();
  });
}
export function onAfterPriceRules(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    log("onAfterPriceRules()", quoteModel, quoteLineModels);

    resolve();
  });
}
export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    log("onAfterCalculate()", quoteModel, quoteLineModels);

    resolve();
  });
}

function getMaxSubTermForProductsByBundle(
  quoteLineModels,
  productCode,
  minimumTerm
) {
  const quoteLinesModelsByParentKey = quoteLineModels
    .filter(qlModel => qlModel.parentItemKey !== null) // filter out lines with no parent
    .filter(qlModel => qlModel.record.SBQQ__ProductCode__c === productCode) // filter out lines that do not match provided productCode
    .reduce((qlByBundleId, qlModel) => {
      // combine all objects into an map where the key is the parent quote line id
      // If current required by is not set, initialize to empty array
      qlByBundleId[qlModel.parentItemKey] =
        qlByBundleId[qlModel.parentItemKey] || [];
      qlByBundleId[qlModel.parentItemKey].push(qlModel);
      return qlByBundleId;
    }, {});

  log("quoteLinesModelsByParentKey", quoteLinesModelsByParentKey);

  // For each bundle, set the maximum subscription term on the parent quote line
  Object.keys(quoteLinesModelsByParentKey).forEach(key => {
    log("Working on bundle:", key);
    log("Child Lines:", quoteLinesModelsByParentKey[key]);
    // find parent quote line based on key (== because a number key got turned into a string when placed in a map)
    const parentQuoteLine = quoteLineModels.find(qlModel => qlModel.key == key);
    log("parentQuoteLine:", parentQuoteLine);

    // set to default minimum term in case no lines have a SBQQ__SubscriptionTerm__c set
    parentQuoteLine.record.SBQQ__SubscriptionTerm__c = minimumTerm;

    const maxSubTermFromChildLines = quoteLinesModelsByParentKey[key]
      .filter(ql => !!ql.record.SBQQ__SubscriptionTerm__c) // filter out products that do not have a subscription term set
      .reduce((maxSubTerm, ql) => {
        return Math.max(maxSubTerm, ql.record.SBQQ__SubscriptionTerm__c);
      }, 0);

    log("maxSubTermFromChildLines:", maxSubTermFromChildLines);

    // Set the subscription term on the parent quote line or the default, whichever is higher
    parentQuoteLine.record.SBQQ__SubscriptionTerm__c = Math.max(
      parentQuoteLine.record.SBQQ__SubscriptionTerm__c,
      maxSubTermFromChildLines
    );
    log(
      "Max subscription term for bundle:",
      parentQuoteLine.record.SBQQ__SubscriptionTerm__c
    );
  });
}
