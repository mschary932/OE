/*
 * Model Extension class for MeasureValue object under OrderExecution object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.ObjectServices = kony.sdk.mvvm.ObjectServices || {};
kony.sdk.mvvm.ObjectServices.OrderExecution = kony.sdk.mvvm.ObjectServices.OrderExecution || {};
/**
 * Creates a new Model Extension.
 * @class MeasureValueModelExtension
 * @param {Object} modelObj - Model.
 */
kony.sdk.mvvm.ObjectServices.OrderExecution.MeasureValueModelExtension = Class({
    constructor: function(modelObj) {
        var model = modelObj;

        this.getModel = function() {
            return model;
        };
        this.setModel = function(modelObj) {
            model = modelObj;
        };

    },

    /**
     * This is called from create and update methods of Model class.
     * This method is a handle to custom validation written by developer.
     * @memberof MeasureValueModelExtension#
     * @param {Object} dataObject - Data object.
     * @param {kony.sdk.mvvm.v2.Model.ValidationType} validationType - Create/Update.
     * @returns {Boolean} - whether data is valid
     */
    validate: function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
});