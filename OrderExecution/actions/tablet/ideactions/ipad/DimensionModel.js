/*
 * Entity controller class for Dimension entity
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.DimensionModel = Class(kony.sdk.mvvm.BaseModel, {
    constructor: function(applicationContext, entityMetaData, options) {
        this.$class.$super.call(this, applicationContext, entityMetaData, options);
    },
    getValueForColumnProperty: function(columnName, key) {
        return this.$class.$superp.getValueForColumnProperty.call(this, columnName, key);
    },
    getColumnNames: function() {
        return this.$class.$superp.getColumnNames.call(this);
    },
    getValueForProperty: function(propertyName) {
        return this.$class.$superp.getValueForProperty.call(this, propertyName);
    },
    getColumnInfo: function(columnName) {
        return this.$class.$superp.getColumnInfo.call(this, columnName);
    },
    getFieldPickListValues: function(columnName) {
        return this.$class.$superp.getFieldPickListValues.call(this, columnName);
    },
    getChildRelationshipList: function(successCallback, errorCallback) {
        this.$class.$superp.getChildRelationshipList.call(this, successCallback, errorCallback);
    },
    getRelationshipForChildEntityName: function(childEntityName, successCallback, errorCallback) {
        this.$class.$superp.getRelationshipForChildEntityName.call(this, childEntityName, successCallback, errorCallback);
    },
    fetchDataForColumns: function(columnNames, onSuccess, onError, contextData) {
        this.$class.$superp.fetchDataForColumns.call(this, columnNames, onSuccess, onError, contextData);
    },
    fetch: function(query, onSuccess, onError) {
        this.$class.$superp.fetch.call(this, query, onSuccess, onError);
    },
    create: function(model, onSuccess, onError) {
        this.$class.$superp.create.call(this, model, onSuccess, onError);
    },
    createRecord: function(record, onSuccess, onError) {
        this.$class.$superp.createRecord.call(this, record, onSuccess, onError);
    },
    update: function(model, onSuccess, onError) {
        this.$class.$superp.update.call(this, model, onSuccess, onError);
    },
    updateByPrimaryKey: function(record, primaryFieldValue, onSuccess, onError) {
        this.$class.$superp.updateByPrimaryKey.call(this, record, primaryFieldValue, onSuccess, onError);
    },
    remove: function(model, primaryFieldValue, onSuccess, onError) {
        this.$class.$superp.remove.call(this, model, primaryFieldValue, onSuccess, onError);
    },
    removeByPrimaryKey: function(primaryFieldValue, onSuccess, onError) {
        this.$class.$superp.removeByPrimaryKey.call(this, primaryFieldValue, onSuccess, onError);
    },
    validate: function(data, validationType) {
        return this.$class.$superp.validate.call(this, data, validationType);
    }
});