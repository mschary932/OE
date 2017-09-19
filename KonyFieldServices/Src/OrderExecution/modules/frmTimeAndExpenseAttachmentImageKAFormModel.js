/*
 * FormModel class for frmTimeAndExpenseAttachmentImageKA
 * This is generated file. Please do not edit.
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmTimeAndExpenseAttachmentImageKAFormModel = Class(kony.sdk.mvvm.BaseFormModel, {
    /**
     * constructor method.
     */
    constructor: function(controller) {
        this.$class.$super.call(this, controller);
        /*
            Properties in viewmodel are 
            lblDayandTimeKA,lblStatusKA,lblTaskDescriptionKA,flxStrtKA,lblTimerKA,segTaskExecutionKA,
        */
    },
    /**
     * This method will clear all form model properties and also all registered view observers' widget. 
     */
    clear: function() {
        this.$class.$superp.clear.call(this);
    },
    /**
     * This method will clear all form model properties and also all registered view observers' widget.
     * Will be used for object life cycle maintenance.
     */
    destroy: function() {
        this.$class.$superp.destroy.call(this);
    },
    /**
     * This method would be used to notify or update all the registerd view observers listening to the formModel for a property value change.
     */
    notifyObservers: function(formModelPropertyName) {
        this.$class.$superp.notifyObservers.call(this, formModelPropertyName);
    },
    /**
     * This method would be used to update all the registerd view observers listening to the formmodel. 
     * This will used for multiple property value change.
     */
    update: function(widgetArray) {
        this.$class.$superp.update.call(this, widgetArray);
    },
    /**
     * This method would be used to trigger show form.
     */
    showView: function() {
        this.$class.$superp.showView.call(this);
    },
    /**
     * This method would return requested property value from the formmodel.
     */
    getWidgetData: function(formModelPropertyName) {
        return this.$class.$superp.getWidgetData.call(this, formModelPropertyName);
    },
    /**
     * This method would set given property value to the formmodel.
     */
    setWidgetData: function(formModelPropertyName, data, doNotNotify) {
        this.$class.$superp.setWidgetData.call(this, formModelPropertyName, data, doNotNotify);
    },
    /**
     * This method would be used to check whether form model is in sync with view.
     */
    isPropertyValueChanged: function(formModelPropertyName) {
        return this.$class.$superp.isPropertyValueChanged.call(this, formModelPropertyName);
    },
    /**
     * This method would set given property masterdata value to the view.
     */
    setMasterDataByProperty: function(masterData, formModelPropertyName) {
        this.$class.$superp.setMasterDataByProperty.call(this, masterData, formModelPropertyName);
    },
    /**
     * This method would return requested property masterdata value from the view.
     */
    getMasterDataByProperty: function(formModelPropertyName) {
        return this.$class.$superp.getMasterDataByProperty.call(this, formModelPropertyName);
    },
    /**
     * This method would set given view property value to the view.
     */
    setViewAttributeByProperty: function(formModelPropertyName, attributeName, attributeVal) {
        this.$class.$superp.setViewAttributeByProperty.call(this, formModelPropertyName, attributeName, attributeVal);
    },
    /**
     * This method would return requested view property value from the view.
     */
    getViewAttributeByProperty: function(formModelPropertyName, attributeName) {
        return this.$class.$superp.getViewAttributeByProperty.call(this, formModelPropertyName, attributeName);
    },
    /**
     * This method would be used to execute view property methods.
     */
    performActionOnView: function(formModelPropertyName, actionName, argsArray) {
        return this.$class.$superp.performActionOnView.call(this, formModelPropertyName, actionName, argsArray);
    },
    /**
     * This method would be used to execute form model methods.
     */
    performAction: function(actionName, argsArray) {
        return this.$class.$superp.performAction.call(this, actionName, argsArray);
    },
    /**
     * This method would return kony form view instance.
     */
    getForm: function() {
        return this.$class.$superp.getForm.call(this);
    },
    formatUI: function() {
        return this.$class.$superp.formatUI.call(this);
    }
});