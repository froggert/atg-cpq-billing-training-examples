/**
 * Created by aturner on 2019-03-09.
 */
({
    doInit: function (component, event, helper) {
        const accountId = component.get('v.recordId');
        helper.callApex(component, 'c.createQuote', {accountId})
            .then(quoteId => {
                helper.callApex(component, 'c.createQuote', {accountId})
                    .then(() => {
                        var urlEvent = $A.get("e.force:navigateToURL");
                        urlEvent.setParams({
                            'url': '/apex/sbqq__sb?id=' + quoteId + '#quote/le?qId=' + quoteId,
                        });
                        urlEvent.fire();
                    })
                    .catch(err => {
                        component.set('v.loading', false);
                        component.set('v.errorMessage', 'There was an error calculating the quote - Id ' + quoteId);
                        console.log(err);
                    })
            })
            .catch(err => {
                component.set('v.loading', false);
                component.set('v.errorMessage', 'There was an error creating the quote');
                console.log(err);
            })
    }
})