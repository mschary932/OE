/*
 * Model Extension class for entity model
 */
kony = kony || {};
kony.appfoundation = kony.appfoundation || {};
kony.appfoundation.v2 = kony.appfoundation.v2 || {};
kony.appfoundation.v2.WorkOrderMaterialModelExtension = Class({
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