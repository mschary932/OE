/*
 * FormModel Extension class for frmOrderResourceDetailsKA
 * Developer can add UI formatting logic here
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrderResourceDetailsKAFormModelExtension = Class({
    constructor: function(formModelObj) {
        var formModel = formModelObj;
        this.getFormModelObj = function() {
            return formModel;
        }
    },
    formatUI: function() {
        //TO-DO add custom formatting
    }
});