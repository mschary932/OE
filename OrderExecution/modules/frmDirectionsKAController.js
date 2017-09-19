/*
 * Controller class for frmDirectionsKA
 * This is generated file. Please do not edit. 
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmDirectionsKAController = Class(kony.sdk.mvvm.BaseFormController, {
    /**
     * constructor method.
     */
    constructor: function(applicationContext, config) {
        this.$class.$super.call(this, applicationContext, config);
    },
    /**
     * This method would act as an entry point for all fetch related flows.
     */
    fetchData: function() {
        this.$class.$superp.fetchData.call(this);
    },
    /**
     * Controller bind data method.
     */
    bindData: function(data) {
        this.$class.$superp.bindData.call(this, data);
    },
    /**
     * Controller format data method.
     */
    processData: function(dataMap) {
        return this.$class.$superp.processData.call(this, dataMap);
    },
    /**
     * This method would act as an entry point for all save related flows.
     */
    saveData: function() {
        this.$class.$superp.saveData.call(this);
    },
    /**
     * This method would act as an entry point for all delete/remove related flows.
     */
    deleteData: function() {
        this.$class.$superp.deleteData.call(this);
    },
    /**
     * This method would return requested entity controller object.
     */
    getModel: function(entityName, serviceName, options) {
        return this.$class.$superp.getModel.call(this, entityName, serviceName, options);
    },
    /**
     * This method would return requested entity meta data for an entity.
     */
    getApplicationEntityMetaData: function(entityName, serviceName, options) {
        return this.$class.$superp.getApplicationEntityMetaData.call(this, entityName, serviceName, options);
    },
    /**
     * This method would act as an entry point to the controller for form navigation.
     */
    loadDataAndShowForm: function(contextData) {
        this.$class.$superp.loadDataAndShowForm.call(this, contextData);
    },
    /**
     * This method would act as an entry point to the controller for refesh form data.
     */
    refershFormData: function() {
        this.$class.$superp.refershFormData.call(this);
    },
    /**
     * Data Translation Logic between source and destination
     */
    getDataAsPerType: function(val, srcDataType, destDataType, entityName, fieldName) {
        return this.$class.$superp.getDataAsPerType.call(this, val, srcDataType, destDataType, entityName, fieldName);
    },
    /**
     * This method would be used to exectute given controller method/action.
     */
    performAction: function(actionName, argsArray) {
        return this.$class.$superp.performAction.call(this, actionName, argsArray);
    },
    /**
     * This method would be used to render the view attached to the controller..
     */
    showView: function() {
        this.$class.$superp.showView.call(this);
    }
});