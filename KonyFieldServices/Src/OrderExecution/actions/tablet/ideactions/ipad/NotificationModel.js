/*
 * Entity controller class for Notification entity
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.NotificationModel = Class({
    constructor: function(entityMetaData) {
        this.addedStandardFields = entityMetaData.addedStandardFields;
        this.alias = entityMetaData.alias;
        this.applicationId = entityMetaData.applicationId;
        this.applicationName = entityMetaData.applicationName;
        this.childRelationshipList = entityMetaData.childRelationshipList;
        this.columns = entityMetaData.columns;
        this.custom = entityMetaData.custom;
        this.customizable = entityMetaData.customizable;
        this.dataFilter = entityMetaData.dataFilter;
        this.dataProviderId = entityMetaData.dataProviderId;
        this.dataProviderName = entityMetaData.dataProviderName;
        this.defaultEntity = entityMetaData.defaultEntity;
        this.description = entityMetaData.description;
        this.displayName = entityMetaData.displayName;
        this.entityProperties = entityMetaData.entityProperties;
        this.entityTypeID = entityMetaData.entityTypeID;
        this.junction = entityMetaData.junction;
        this.label = entityMetaData.label;
        this.metadataObject = entityMetaData.metadataObject;
        this.entityName = entityMetaData.name;
        this.operationType = entityMetaData.operationType;
        this.pageTemplates = entityMetaData.pageTemplates;
        this.primaryFieldDatatype = entityMetaData.primaryFieldDatatype;
        this.primaryFieldDisplayName = entityMetaData.primaryFieldDisplayName;
        this.primaryFieldName = entityMetaData.primaryFieldName;
        this.primaryKeyDatatype = entityMetaData.primaryKeyDatatype;
        this.primaryKeyName = entityMetaData.primaryKeyName;
        this.sourceEntityName = entityMetaData.sourceEntityName;
        this.uiconfigObject = entityMetaData.uiconfigObject;
        this.updateable = entityMetaData.updateable;
        this.fields = entityMetaData.fields;
        this.columnsMap = entityMetaData.columnsMap;
    },
    getValueForColumnProperty: function(columnName, key) {
        var propertyVal = null;
        if (columnName && key) {
            propertyVal = this.getColumnInfo(columnName)[key];
        }
        return propertyVal;
    },
    getColumnNames: function() {
        var columnNames = [];
        for (var key in this.columnsMap) {
            columnNames.push(key);
        }
        return columnNames;
    },
    getAddedStandardFields: function() {
        return this.addedStandardFields;
    },
    getAlias: function() {
        return this.alias;
    },
    getApplicationId: function() {
        return this.applicationId;
    },
    getApplicationName: function() {
        return this.applicationName;
    },
    getChildRelationshipList: function() {
        return this.childRelationshipList;
    },
    getColumns: function() {
        return this.columns;
    },
    isCustom: function() {
        return this.custom;
    },
    isCustomizable: function() {
        return this.customizable;
    },
    getDataFilter: function() {
        return this.dataFilter;
    },
    getDataProviderId: function() {
        return this.dataProviderId;
    },
    getDataProviderName: function() {
        return this.dataProviderName;
    },
    getDefaultEntity: function() {
        return this.defaultEntity;
    },
    getDescription: function() {
        return this.description;
    },
    getDisplayName: function() {
        return this.displayName;
    },
    getEntityProperties: function() {
        return this.entityProperties;
    },
    getEntityTypeID: function() {
        return this.entityTypeID;
    },
    isJunction: function() {
        return this.junction;
    },
    getLabel: function() {
        return this.label;
    },
    isMetadataObject: function() {
        return this.metadataObject;
    },
    getEntityName: function() {
        return this.entityName;
    },
    getOperationType: function() {
        return this.operationType;
    },
    getPageTemplates: function() {
        return this.pageTemplates;
    },
    getPrimaryFieldDatatype: function() {
        return this.primaryFieldDatatype;
    },
    getPrimaryFieldDisplayName: function() {
        return this.primaryFieldDisplayName;
    },
    getPrimaryFieldName: function() {
        return this.primaryFieldName;
    },
    getPrimaryKeyDatatype: function() {
        return this.primaryKeyDatatype;
    },
    getPrimaryKeyName: function() {
        return this.primaryKeyName;
    },
    getSourceEntityName: function() {
        return this.sourceEntityName;
    },
    isUiconfigObject: function() {
        return this.uiconfigObject;
    },
    isUpdateable: function() {
        return this.updateable;
    },
    getFields: function() {
        return this.fields;
    },
    getColumnInfo: function(columnName) {
        return this.columnsMap[columnName];
    },
    getFieldPickListValues: function(columnName) {
        return this.getColumnInfo(columnName)["pickListValues"];
    },
    getRelationshipForChildEntityName: function(childEntityName) {
        var relationshipObject;
        var childRelationships = this.getChildRelationshipList();
        for (var i = 0; i < childRelationships.length; i++) {
            if (childRelationships[i]["entityName"] === childEntityName) {
                relationshipObject = childRelationships[i];
            }
        }
        return relationshipObject;
    },
    fetchDataForColumns: function(columnNames, onSuccess, onError, contextData) {
        var self = this;
        var dataProvider = kony.sdk.mvvm.SaaSApplication.getDataProvider();
        var columnNamesString = "*";
        //TO-DO: fetch primary key value ..
        columnNames.push(this.getPrimaryKeyName());
        columnNames.push(this.getPrimaryFieldName());
        for (var column in columnNames) {
            if (columnNamesString === "*") {
                columnNamesString = columnNames[column];
            } else {
                columnNamesString = columnNamesString + "," + columnNames[column];
            }
        }
        var queryStr = this.getEntityName() + '?$select=' + columnNamesString;
        kony.sdk.mvvm.log.info("columnNamesString : " + columnNamesString);
        var query = new kony.sdk.mvvm.SelectQuery(queryStr);
        if (contextData) {
            kony.sdk.mvvm.log.info("Info 999 --> ", contextData);
            var primaryKeyValue = contextData.getDataModel().primaryFieldValue;
            var masterEntityName = contextData.getDataModel().masterEntityName;
            if (primaryKeyValue && this.getPrimaryKeyName() && masterEntityName && masterEntityName === this.getEntityName()) {
                var table = new kony.sdk.mvvm.Table(this.getEntityName());
                var primaryKeyColumn = new kony.sdk.mvvm.Column(table, this.getPrimaryKeyName());
                var criteria = new kony.sdk.mvvm.Match(primaryKeyColumn, kony.sdk.mvvm.MatchType.EQUALS, primaryKeyValue);
                query.addCriteria(criteria);
            }
        }
        var queryObj = new kony.sdk.mvvm.Query(query, "odata");
        this.fetch(queryObj, success, error);
        //
        function success(response) {
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    },
    fetch: function(query, onSuccess, onError) {
        var self = this;
        var dataProvider = kony.sdk.mvvm.SaaSApplication.getDataProvider();
        dataProvider.fetch(query, success, error);
        //
        function success(response) {
            if (response && (response.length > 0)) {
                for (var key in response) {
                    if (response[key].hasOwnProperty(self.getPrimaryKeyName())) {
                        response[key].primaryKeyValue = response[key][self.getPrimaryKeyName()];
                    }
                    if (response[key].hasOwnProperty(self.getPrimaryFieldName())) {
                        response[key].primaryDisplayValue = response[key][self.getPrimaryFieldName()];
                    }
                }
            }
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    },
    fetchAll: function(onSuccess, onError) {
        //
        function success(response) {
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    },
    getAllDetailsByPrimaryKey: function(primaryFieldValue, onSuccess, onError) {
        //
        function success(response) {
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    },
    create: function(model, onSuccess, onError) {
        var dataProvider = new kony.sdk.mvvm.SaaSApplication.getDataProvider();
        if (!model.entityDetails) {
            model.entityDetails = new kony.sdk.mvvm.EntityDetails(this.getEntityName(), null, null, this.getPrimaryKeyName(), null, null, null);
        }
        dataProvider.create(model, success, error);
        //
        function success(response) {
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    },
    createRecord: function(record, onSuccess, onError) {
        var dataProvider = new kony.sdk.mvvm.SaaSApplication.getDataProvider();
        var model = new kony.sdk.mvvm.Model(this.getEntityName());
        for (var key in record) {
            model.set(key, record[key]);
        }
        model.entityDetails = new kony.sdk.mvvm.EntityDetails(this.getEntityName(), null, null, this.getPrimaryKeyName(), null, null, null);
        dataProvider.create(model, success, error);
        //
        function success(response) {
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    },
    update: function(model, onSuccess, onError) {
        var dataProvider = new kony.sdk.mvvm.SaaSApplication.getDataProvider();
        if (!model.entityDetails) {
            model.entityDetails = new kony.sdk.mvvm.EntityDetails(this.getEntityName(), null, null, this.getPrimaryKeyName(), null, null, null);
        }
        dataProvider.update(model, success, error);
        //
        function success(response) {
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    },
    updateByPrimaryKey: function(record, primaryFieldValue, onSuccess, onError) {
        var dataProvider = new kony.sdk.mvvm.SaaSApplication.getDataProvider();
        var model = new kony.sdk.mvvm.Model(this.getEntityName());
        for (var key in record) {
            model.set(key, record[key]);
        }
        model.set(this.getPrimaryKeyName(), primaryFieldValue);
        model.entityDetails = new kony.sdk.mvvm.EntityDetails(this.getEntityName(), null, null, this.getPrimaryKeyName(), null, null, null);
        dataProvider.update(model, success, error);
        //
        function success(response) {
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    },
    remove: function(model, primaryFieldValue, onSuccess, onError) {
        var dataProvider = new kony.sdk.mvvm.SaaSApplication.getDataProvider();
        if (!model.entityDetails) {
            model.entityDetails = new kony.sdk.mvvm.EntityDetails(this.getEntityName(), null, null, this.getPrimaryKeyName(), null, null, null);
        }
        dataProvider.deleteRecord(model, primaryFieldValue, success, error);
        //
        function success(response) {
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    },
    removeByPrimaryKey: function(primaryFieldValue, onSuccess, onError) {
        var dataProvider = new kony.sdk.mvvm.SaaSApplication.getDataProvider();
        var model = new kony.sdk.mvvm.Model(this.getEntityName());
        model.entityDetails = new kony.sdk.mvvm.EntityDetails(this.getEntityName(), null, null, this.getPrimaryKeyName(), null, null, null);
        model.set(this.getPrimaryKeyName(), primaryFieldValue);
        //
        dataProvider.deleteRecord(model, primaryFieldValue, success, error);
        //
        function success(response) {
            onSuccess(response);
        };
        //
        function error(response) {
            onError(response);
        };
    }
});