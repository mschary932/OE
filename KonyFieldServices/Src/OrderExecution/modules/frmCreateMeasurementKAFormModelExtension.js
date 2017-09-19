/*
 * FormModel Extension class for frmCreateMeasurementKA
 * Developer can add UI formatting logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
/**
 * Creates a new Form Model Extension.
 * @class frmCreateMeasurementKAFormModelExtension
 * @param {Object} formModelObj - Form Model.
 */
kony.sdk.mvvm.frmCreateMeasurementKAFormModelExtension = Class({
    constructor: function(formModelObj) {
        var formModel = formModelObj;
        this.getFormModelObj = function() {
            return formModel;
        }
    },

    /**
     * This is life cycle method invoked before bindData method, primarily used for UI customization.
     * @memberof frmCreateMeasurementKAFormModelExtension#
     */
    formatUI: function() {
        //TO-DO add custom formatting
    }
});