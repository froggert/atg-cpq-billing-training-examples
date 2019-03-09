/**
 * Created by aturner on 2019-03-09.
 */
({
    callApex: function(component, methodName, params) {
        return new Promise($A.getCallback(function(resolve, reject) {
            var action = component.get(methodName);

            if (params) {
                action.setParams(params);
            }

            action.setCallback(this, function(results) {
                utils.log(methodName + ' results', results);
                if (results.getState() === 'SUCCESS') {
                    utils.log('results:', results.getReturnValue());
                    resolve(results.getReturnValue());
                } else if (results.getState() === 'ERROR') {
                    utils.log('getQuoteLines() ERROR', results.getError());
                    $A.log('Errors', results.getError());
                    reject(results.getError());
                }
            });
            $A.enqueueAction(action);
        }));
    },
})