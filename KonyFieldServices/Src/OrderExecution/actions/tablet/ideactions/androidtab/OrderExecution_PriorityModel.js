/*
 * Model class for Priority object under OrderExecution object service group
 * This is generated file. Please do not edit.
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.ObjectServices = kony.sdk.mvvm.ObjectServices || {};
kony.sdk.mvvm.ObjectServices.OrderExecution = kony.sdk.mvvm.ObjectServices.OrderExecution || {};
kony.sdk.mvvm.ObjectServices.OrderExecution.PriorityModel = Class(kony.sdk.mvvm.BaseModel, {
    /**
     * constructor method.
     */
    constructor: function(applicationContext, entityMetaData, configOptions) {
        this.$class.$super.call(this, applicationContext, entityMetaData, configOptions);
    },
    /**
     * This method would return requested property of column from metadata.
     */
    getValueForColumnProperty: function(columnName, key) {
        return this.$class.$superp.getValueForColumnProperty.call(this, columnName, key);
    },
    /**
     * This method would return list of column names for this object from metadata.
     */
    getColumnNames: function() {
        return this.$class.$superp.getColumnNames.call(this);
    },
    /**
     * This method would return requested property of this object from metadata.
     */
    getValueForProperty: function(propertyName) {
        return this.$class.$superp.getValueForProperty.call(this, propertyName);
    },
    /**
     * This method would return properties map of column from metadata.
     */
    getColumnInfo: function(columnName) {
        return this.$class.$superp.getColumnInfo.call(this, columnName);
    },
    /**
     * This method would return picklist values if exists for column from metadata.
     */
    getFieldPickListValues: function(columnName) {
        return this.$class.$superp.getFieldPickListValues.call(this, columnName);
    },
    /**
     * This method would fetch the data for requested columns of this object.
     */
    fetchDataForColumns: function(columnNames, onSuccess, onError, contextData) {
        this.$class.$superp.fetchDataForColumns.call(this, columnNames, onSuccess, onError, contextData);
    },
    /**
     * This method would fetch the data of this object as requested in dataObject
     */
    fetch: function(dataObject, onSuccess, onError) {
        this.$class.$superp.fetch.call(this, dataObject, onSuccess, onError);
    },
    /**
     * This method would save the record provided in dataObject.
     */
    create: function(dataObject, onSuccess, onError) {
        this.$class.$superp.create.call(this, dataObject, onSuccess, onError);
    },
    /**
     * This method would update the record provided in dataObject.
     */
    update: function(dataObject, onSuccess, onError) {
        this.$class.$superp.update.call(this, dataObject, onSuccess, onError);
    },
    /**
     * This method would remove the record provided in dataObject.
     */
    remove: function(dataObject, onSuccess, onError) {
        this.$class.$superp.remove.call(this, dataObject, onSuccess, onError);
    },
    /**
     * This method would remove the record in this object with provided primary key values.
     */
    removeByPrimaryKey: function(primaryKeyValueMap, onSuccess, onError) {
        this.$class.$superp.removeByPrimaryKey.call(this, primaryKeyValueMap, onSuccess, onError);
    },
    /**
     * This method will call the validate method in model extension class.
     * This is called from create and update methods.
     */
    validate: function(dataObject, validationType) {
        return this.$class.$superp.validate.call(this, dataObject, validationType);
    }
});