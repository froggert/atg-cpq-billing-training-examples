# Code Examples for Salesforce CPQ And Salesforce Billing
These code examples are the companion to the Salesforce Billing and Salesforce CPQ Apex training crash-course.

## Examples

| Name                             | Type                                | Description                                                                                                     |
| -------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ApexUtils.cls                    | Apex Class                          | General utility class that should be provided in every project                                                  |
| ApexUtilsTest.cls                | Apex Class                          | Unit test for `ApexUtils`                                                                                       |
| CPQ_ApiDataModels.cls            | Apex Class                          | Data model class for the CPQ API                                                                                |
| CPQ_ApiDataModelsTest.cls        | Apex Class                          | Unit tests for `CPQ_ApiDataModels`                                                                              |
| CPQ_ApiWrapper.cls               | Apex Class                          | Utility class for working with `CPQ_ApiDataModels`                                                              |
| TriggerHandler.cls               | Apex Class                          | Trigger handler framework                                                                                       |
| TriggerHandlerTest.cls           | Apex Class                          | Unit test for `TriggerHandler`                                                                                  |
| Account.trigger                  | Apex Class                          | Example trigger using the `TriggerHandler` framework                                                            |
| AccountTriggerHandlerExample.cls | Apex Trigger                        | Example trigger handler for `Account.trigger` using the `TriggerHandler` framework                              |
| qcp.js                           | Quote Calculator Plugin             | Example QCP script                                                                                              |
| CPQ_QuickQuote                   | Lightning Component Bundle (folder) | Example lightning component that can be used with a quick action to create a quote using the Salesforce CPQ API |


## Other Resources
### VSCode Salesforce CPQ Extension
* **Link**:
  * https://marketplace.visualstudio.com/items?itemName=paustint.sfdc-qcp-vscode-extension
* **Blog Article**:
  * https://medium.com/@paustint/getting-started-with-the-salesforce-cpq-quote-calculator-plugin-qcp-vscode-extension-718306ff40d4

### Salesforce CPQ Api Docs
* https://developer.salesforce.com/docs/atlas.en-us.cpq_dev_api.meta/cpq_dev_api/cpq_api_get_started.htm

