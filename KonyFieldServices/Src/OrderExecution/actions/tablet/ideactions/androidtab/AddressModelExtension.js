/*
 * Model Extension class for entity model
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.AddressModelExtension = Class({
    constructor: function(modelObj) {
        var model = modelObj;
        this.getModel = function() {
            return model;
        };
        this.setModel = function(modelObj) {
            model = modelObj;
        };
    },
    validate: function(model, validationType) {
        //TO-DO add custom validation
        return true;
    }
});