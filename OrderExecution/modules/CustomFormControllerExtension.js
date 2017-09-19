/**
 * common business logic implementaion class, Would be app specific.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.CustomFormControllerExtensionMF = Class(kony.sdk.mvvm.BaseFormControllerExtension,{
    constructor: function(controllerObj) {         
    	var baseFormControllerExtensionObj = null;
    	var formmodelInfoMap = {};    	
    	this.setBaseFormControllerExtensionObj = function(obj){
    		baseFormControllerExtensionObj = new kony.sdk.mvvm.BaseFormControllerExtension(obj);
    	};        
        this.getBaseFormControllerExtensionObj = function(){
        	return baseFormControllerExtensionObj;
        };        
        this.getFormModelInfo = function(prop) {
            return formmodelInfoMap[prop];
        };        
        this.setFormModelInfo = function(prop, data) {
            formmodelInfoMap[prop] = data;
        };        
        this.getController = function() {
        	return baseFormControllerExtensionObj.getController();
        };
       this.setController = function(controller) {
        	return baseFormControllerExtensionObj.setController(controller);
        };
        this.getContainerRecord = function(prop) {
            return baseFormControllerExtensionObj.getContainerRecord(prop);
        };        
        this.setContainerRecord = function(prop, data) {
            baseFormControllerExtensionObj.setContainerRecord(prop, data);
        };        
        this.getWidgetData = function(prop) {
            return baseFormControllerExtensionObj.getWidgetData(prop);
        };        
        this.setWidgetData = function(prop, data) {
            baseFormControllerExtensionObj.setWidgetData(prop, data);
        };        
        this.getORMController = function(){
        	return baseFormControllerExtensionObj.getORMController();
        };        
        this.setGroupWidgetsContext = function(groupContext){
        	baseFormControllerExtensionObj.setGroupWidgetsContext(groupContext);
        };        
        this.getGroupWidgetsContext = function(){
        	return baseFormControllerExtensionObj.getGroupWidgetsContext();
        };        
      	this.getRecordsDataMap = function(){
            return baseFormControllerExtensionObj.getRecordsDataMap();
        };
        this.setBaseFormControllerExtensionObj(controllerObj);
    },
	/**
		'fetchData' is used to fetch the data from device database
	*/
    fetchData: function(SuccessCallBack,ErrorCallBack) {
        try {
            var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
            formmodel.clear();
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
            scopeObj.getBaseFormControllerExtensionObj().fetchData(successcallback,errorcallback);            
            /*             
            might be useful if listbox is added in any of the screens,so left it commenting the code             
            if (this.fetchMasterData && (typeof this.fetchMasterData === "function")) {
                this.fetchMasterData(onSuccess, onError);
            } else {
                onSuccess(null);
            }
            */
            function successcallback(responseDataMap) {
            	if(typeof SuccessCallBack === "function" )
            		SuccessCallBack(responseDataMap);
           		else{
	            	TAG.NC.applyFormTransitions(formmodel.getView().getKonyForm());
					scopeObj.bindData(responseDataMap);
	                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
	            }
            };
            function errorcallback(error) {
            	TAG.NC.applyFormTransitions(formmodel.getView().getKonyForm());
                kony.sdk.mvvm.log.error("Error in Blogic fetchData ", error);
                formmodel.showView();
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            };           
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_DATA, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_DATA, error);
        }
    },
	/**
		'performFetchAndBindFormData' will fetch the data from device database and then bind the values to correcponding form elements
	*/
    performFetchAndBindFormData: function(successcallback, errorcallback) {
        try {
            var scopeObj = this;
            function fetchAndBindFormData(transactions, successcallback, errorcallback) {
                var indx = 0;
                var responseDataMap = {};
                fetchDataForWidgetGroup();
                function fetchDataForWidgetGroup() {
                    if (indx >= transactions.length) {
                        scopeObj.bindData(responseDataMap);
                        if(successcallback && typeof successcallback === 'function')
                        	successcallback.call(scopeObj);
                        return;
                    }
                    var fetchDataObj = scopeObj.bLogicContextObj.getFetchDataStrategy(transactions[indx]);
                    if (fetchDataObj && fetchDataObj.fetch && (typeof fetchDataObj.fetch === "function")) {
                        fetchDataObj.fetch(scopeObj.bLogicContextObj.getContext(transactions[indx]), sucCallback, errCallback);
                        function sucCallback(response) {
                            responseDataMap[transactions[indx]] = response;
                            indx++;
                            fetchDataForWidgetGroup();
                        };
                        function errCallback(err) {
                            indx++;
                            fetchDataForWidgetGroup();
                        };
                    }
                };
            };
            scopeObj.prepareFetchAndBindDataStrategy();
            var transactions = [];
            for (var prop in scopeObj.bLogicContextObj) {
                if ((typeof scopeObj.bLogicContextObj[prop] !== "function") && !scopeObj.bLogicContextObj[prop]["constrained"]) {
                    transactions.push(prop);
                }
            }
            fetchAndBindFormData(transactions, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA, error);
        }
    },
	//refreshes form config with a new entity or with a new query in run time
    refreshFormConfig:function(formConfig,widgetId,entity,query)
			{
				var scopeObj=this;
				var formId=formConfig["formid"];
				formConfig[formId]["entity"]=entity
				if(widgetId=="form"){
					formConfig[formId]["query"]=query
				}
				else{
					formConfig[widgetId]["fieldprops"]["query"]=query
					formConfig[widgetId]["fieldprops"]["entity"]=entity
				}
				scopeObj.refreshConfig.call(scopeObj, formConfig);
			},
	/**
		'prepareFetchAndBindDataStrategy' will prepare queries for all the widgets of the form
	*/
    prepareFetchAndBindDataStrategy: function() {
        try {
            var scopeObj = this;
			var controller = scopeObj.getController();
			var config = controller.getConfig();
            var queryWidgetsMapping = config.getQueryEnabledWidgetsMap();
            var contextData = controller.getContextData();
            var entityName, queryType, query, queryParams, strategyobj;
            var dataModel, operationType;
            scopeObj.bLogicContextObj = new kony.sdk.mvvm.persistent.BLogicContext();
            var widgetContext;
            for (var widgetMapping in queryWidgetsMapping) {
                if (!queryWidgetsMapping[widgetMapping]) {
                    continue;
                }
                operationType = contextData.getOperationType(widgetMapping);
                if (operationType && (operationType === kony.sdk.mvvm.OperationType.ADD)) {
                    continue;
                }
                dataModel = contextData.getDataModel(widgetMapping);
                widgetContext = {};
                widgetContext["widgetGroupId"] = widgetMapping;
                widgetContext["widgets"] = queryWidgetsMapping[widgetMapping]["widgets"];
                if ((dataModel && dataModel.getPrimaryFieldValue()) && (operationType === kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY)) {
                    if (widgetMapping === "form") {
                        entityName = config.getEntity();
                        queryType = config.getQueryType();
                        query = config.getQuery();
                        queryParams = config.getQueryParams() || {};
                    } else {
                        entityName = queryWidgetsMapping[widgetMapping]["config"].getWidgetEntity();
                        queryType = queryWidgetsMapping[widgetMapping]["config"].getQueryType();
                        query = queryWidgetsMapping[widgetMapping]["config"].getQuery();
                        queryParams = queryWidgetsMapping[widgetMapping]["config"].getQueryParams() || {};
                        widgetContext["constrained"] = queryWidgetsMapping[widgetMapping]["config"].isConstrained();
                    }
                    strategyobj = kony.sdk.mvvm.persistent.FetchAndBindDataByPKStrategy;
                } else if (!operationType || (operationType === kony.sdk.mvvm.OperationType.NO_FILTER)) {
                    entityName = queryWidgetsMapping[widgetMapping]["config"].getWidgetEntity();
                    queryType = queryWidgetsMapping[widgetMapping]["config"].getQueryType();
                    query = queryWidgetsMapping[widgetMapping]["config"].getQuery();
                    queryParams = queryWidgetsMapping[widgetMapping]["config"].getQueryParams() || {};
                    widgetContext["constrained"] = queryWidgetsMapping[widgetMapping]["config"].isConstrained();
                    strategyobj = kony.sdk.mvvm.persistent.FetchAndBindListDataStrategy;
                } else {
                    kony.sdk.mvvm.log.error("Error in Blogic prepare Blogic context, Wrong config");
                    continue;
                }
                if ((queryType === "sql") && query && (query.toLowerCase().indexOf("select") >= 0)) {
                    strategyobj = kony.sdk.mvvm.persistent.FetchAndBindDataWithNativeQueryStrategy;
                } //TODO
                widgetContext["entityName"] = entityName;
                widgetContext["entityCtrlr"] = controller.getModel(entityName);
                widgetContext["ORMController"] = scopeObj.ORMController;
                widgetContext["queryType"] = queryType || "sql";
                widgetContext["query"] = query;
                widgetContext["queryParams"] = queryParams;
                scopeObj.bLogicContextObj.setContext(widgetMapping, widgetContext);
                scopeObj.bLogicContextObj.setFetchDataStrategy(widgetMapping, new strategyobj());
                scopeObj.updateBLogicContextData(widgetMapping);
            }
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA_STRATEGY, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA_STRATEGY,
                kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA_STRATEGY,
                error);
        }
    },
  	
	/**
		'updateBLogicContextData' will update the object with latest query parameters
	*/
    updateBLogicContextData: function(widgetMapping) {
        try {
            var scopeObj = this;
            var navContextData = scopeObj.getController().getContextData();
            if (navContextData) {
                var queryType, query, queryParams, dataModel, operationType;
                var navQueryType, navQuery, navQueryParams;
                var widgetContext = scopeObj.bLogicContextObj.getContext(widgetMapping);
                queryType = widgetContext["queryType"];
                query = widgetContext["query"];
                queryParams = widgetContext["queryParams"] || {};
                navQueryType = navContextData.getQueryType(widgetMapping);
                navQuery = navContextData.getQuery(widgetMapping);
                navQueryParams = navContextData.getQueryParams(widgetMapping);
                for (var key in navQueryParams) {
                    queryParams[key] = navQueryParams[key];
                }
                dataModel = navContextData.getDataModel(widgetMapping);
                operationType = navContextData.getOperationType(widgetMapping);
                widgetContext["queryType"] = navQueryType || queryType;
                widgetContext["query"] = navQuery || query;
                widgetContext["queryParams"] = queryParams;
                widgetContext["dataModel"] = dataModel;
                widgetContext["operationType"] = operationType;
            }
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_UPDATE_CONTEXT_DATA, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_UPDATE_CONTEXT_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_UPDATE_CONTEXT_DATA, error);
        }
    },
	/**
		'fetchAndBindDataByWidgetGroup' will fetch and bind the data based on the widget group
		widgetGroupId - is a widget id
	*/
    fetchAndBindDataByWidgetGroup: function(widgetGroupId) {
        try {
            var scopeObj = this;
            scopeObj.updateBLogicContextData(widgetGroupId);
            var fetchDataObj = scopeObj.bLogicContextObj.getFetchDataStrategy(widgetGroupId);
            if (fetchDataObj && fetchDataObj.fetch && (typeof fetchDataObj.fetch === "function")) {
                fetchDataObj.fetch(scopeObj.bLogicContextObj.getContext(widgetGroupId), sucCallback, errCallback);
                function sucCallback(response) {
                    var responseDataMap = {};
                    responseDataMap[widgetGroupId] = response;
                    scopeObj.bindData(responseDataMap);
                };
                function errCallback(error) {
                    kony.sdk.mvvm.log.error("Error in Blogic fetchAndBindDataByWidgetGroup : ", error);
                    return;
                };
            }
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_BIND_DATA, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_BIND_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_BIND_DATA, error);
        }
    },
	/**
		'bindData' will bind the data to the widgets of the form
		dataMap - data to be mapped to a form(JSON object)
	*/
    bindData: function(dataMap) {
    	var scopeObj = this;
        scopeObj.getBaseFormControllerExtensionObj().bindData(dataMap);
        /*var formmodel = scopeObj.getController().getFormModel();
        for (var widgetGroupId in dataMap) {
            var widgetConfig = scopeObj.getGroupWidgetsContext().getWidgetContext(widgetGroupId)["widgets"];
            var widgets = Object.keys(widgetConfig);
            var widgetData = dataMap[widgetGroupId];
            for (var indx in widgets) {
                formmodel.setWidgetData(widgets[indx], dataMap[widgets[indx]]);
                scopeObj.setWidgetData(widgets[indx], dataMap[widgets[indx]]);
            }
        }
        try {
            var scopeObj = this;
            var formModelJSON = kony.sdk.mvvm.persistent.util.unmarshallToFormModelJSON;
            for (var widgetGroupId in dataMap) {
                dataMap[widgetGroupId] = formModelJSON(dataMap[widgetGroupId], scopeObj.bLogicContextObj.getContext(widgetGroupId)["widgets"], scopeObj.ORMController);
            }
            var formmodel = this.getController().getFormModel();
            var bindDataObj;
            for (var widgetGroupId in dataMap) {
                bindDataObj = scopeObj.bLogicContextObj.getFetchDataStrategy(widgetGroupId);
                bindDataObj.bind(formmodel, dataMap[widgetGroupId], scopeObj.bLogicContextObj.getContext(widgetGroupId)["widgets"]);
            }
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_BIND_DATA, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_BIND_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_BIND_DATA, error);
        }*/
    },
	/**
		'fetchMasterData' will fetch the master data related to each widget in the form
	*/
    fetchMasterData: function(successcallback, errorcallback) {
        try {
			var scopeObj = this;
			var controller = scopeObj.getController();
			var config = controller.getConfig();
            var mDataEnabledWidgetsArray = config.getMasterDataEnabledWidgets();
            var indx = 0;            
            loadMasterData();
            function loadMasterData() {
                if (indx >= mDataEnabledWidgetsArray.length) {
                    successcallback.call(scopeObj);
                    return;
                }
                var widgetConfig = config.getWidget(mDataEnabledWidgetsArray[indx]);
                if (widgetConfig.isConstrained()) {
                    var masterData = [];
                    var masterDataElement = [];
                    masterDataElement.push(-1);
                    masterDataElement.push("Select..."); //TODO: i18n
                    masterData.push(masterDataElement);
                    var formmodel = controller.getFormModel();
                    formmodel.setMasterDataByProperty(masterData, mDataEnabledWidgetsArray[indx]);
                    sucCallback.call(scopeObj, null);
                } else {
                    scopeObj.fetchMasterDataForWidget(mDataEnabledWidgetsArray[indx], sucCallback, errCallback);
                }
                function sucCallback(response) {
                    indx++;
                    loadMasterData();
                };
                function errCallback(err) {
                    indx++;
                    loadMasterData();
                };
            };
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA, error);
        }
    },
	/**
		'fetchMasterDataForWidget' will fetch the master data related to a perticular widget in the form
		widgetId - Widget id
	*/
    fetchMasterDataForWidget: function(widgetId, successcallback, errorcallback) {
        try {
            var scopeObj = this;
			var controller = scopeObj.getController();
            var contextData = controller.getContextData();
            var widgetConfig = controller.getConfig().getWidget(widgetId);
            var widgetField = widgetConfig.getField().split(".")[0];
            var widgetEntity = widgetConfig.getWidgetEntity();
            var entityContrl = controller.getModel(widgetEntity);
            var widgetFieldType = entityContrl.getValueForColumnProperty(widgetField, "type");
            if (widgetFieldType === "reference") {
                var fieldQuery = widgetConfig.getFieldQuery();
                var fieldQueryType = widgetConfig.getQueryType() || "sql";
                var refEntityName = entityContrl.getValueForColumnProperty(widgetField, "parentTableName");
                var refFld = entityContrl.getValueForColumnProperty(widgetField, "parentPrimaryKeyName");
                var refDisplayFld = entityContrl.getValueForColumnProperty(widgetField, "parentFieldName");
                var refEntityContrlr = controller.getModel(refEntityName);
                var columnsdef = {};
                columnsdef[refFld] = {};
                columnsdef[refDisplayFld] = {};
                var navQueryParams, formQueryParams, queryParams;
                formQueryParams = widgetConfig.getQueryParams();
                queryParams = formQueryParams || {};
                if (contextData && contextData.getQueryParams(widgetId)) {
                    navQueryParams = contextData.getQueryParams(widgetId);
                    for (var key in navQueryParams) {
                        queryParams[key] = navQueryParams[key];
                    }
                }
                scopeObj.ORMController.fetchByColumns(refEntityName, columnsdef, fieldQuery, queryParams, onSuccess, onError);
            } else if (widgetFieldType === "picklist") {
                onSuccess(entityContrl.getFieldPickListValues(widgetField));
            } else {
                onError(null);
            }
            function onSuccess(response) {
                //kony.sdk.mvvm.log.info("meta data fetch response : " + JSON.stringify(response));
                var masterData = [];
                var masterDataElement = [];
                if (response) {
                    masterDataElement.push(-1);
                    masterDataElement.push("Select..."); //TODO: i18n
                    masterData.push(masterDataElement);
                    if (widgetFieldType === "reference") {
                        for (var i = 0; i < response.length; i++) {
                            masterDataElement = [];
                            masterDataElement.push(response[i][refFld].toString());
                            masterDataElement.push(response[i][refDisplayFld].toString());
                            masterData.push(masterDataElement);
                        }
                    } else if (widgetFieldType === "picklist") {
                        var pickListItem;
                        for (var i = 0; i < response.length; i++) {
                            masterDataElement = [];
                            pickListItem = response[i];
                            masterDataElement.push(pickListItem.getValue().toString());
                            masterDataElement.push(pickListItem.getLabel().toString());
                            masterData.push(masterDataElement);
                        }
                    }
                }
                var formmodel = controller.getFormModel();
                formmodel.setMasterDataByProperty(masterData, widgetId);
                if (successcallback && (typeof successcallback === "function")) {
                    successcallback.call(scopeObj);
                }
            };
            function onError(err) {
                kony.sdk.mvvm.log.error("Error while fetching master data for : " + widgetId + " and error message is :" + err);
                if (errorcallback && (typeof errorcallback === "function")) {
                    errorcallback.call(scopeObj, err);
                }
            };
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA_FOR_WIDGET, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA_FOR_WIDGET, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA_FOR_WIDGET, error);
        }
    },
	/**
		'saveRecord' will save a record in to device database
		recordObject - a record(row) object to be saved 
	*/
    saveRecord: function(recordObject, onSuccess, onError) {
        try {        	
            var scopeObj = this;
            var ormController = scopeObj.getBaseFormControllerExtensionObj().getORMController();
            ormController.saveRecord(recordObject, successcallback, errorcallback);
            function successcallback(response) {
				// kony.sdk.mvvm.log.info("entity successfully saved for : " + entityName);
                onSuccess.call(scopeObj, response);
            };
            function errorcallback(error) {
				// kony.sdk.mvvm.log.error("error in entity save for : " + entityName + " and error is : " + JSON.stringify(error));
				onError.call(scopeObj, error);
            };
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_RECORD, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_SAVE_RECORD, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_RECORD, error);
        }
    },
	/**
		'saveRecords' will save multiple records in to device database
		recordsArray - array of record(row) objects to be saved 
	*/
    saveRecords: function(recordsArray, successcallback, errorcallback) {
        try {
            var indx = 0;
            var scopeObj = this;
			var res = [ ];
            saveRecord(indx);
            function saveRecord(indx) {
                if (indx >= recordsArray.length) {
                    successcallback.call(scopeObj, res);
                    return;
                }
                var recordObject = recordsArray[indx];
                scopeObj.saveRecord(recordObject, sucCallback, errCallback);
                function sucCallback(response) {
					res.push(response);
                    saveRecord(++indx);
                };
                function errCallback(err) {
                    errorcallback.call(scopeObj, err);
                };
            };
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_RECORDS, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_SAVE_RECORDS, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_RECORDS, error);
        }
    },
	/**
		'getEntitiesDataMap' will get all the details of a particular entity
	*/
    getEntitiesDataMap: function() {
        try {
            var scopeObj = this;
			var controller = scopeObj.getController();
            function isValueChanged(newVal, oldVal) {
                if (newVal === oldVal) {
                    return false;
                }
                return true;
            };
            function prepareEntityDataMap(entityDef) {
                var formmodel = controller.getFormModel();
                var ORMController = scopeObj.ORMController;
                var contextData = controller.getContextData();
                var widgets, entityName, entityContrlr, fieldName, len, fieldNameArray, aliasName, fieldValue, oldFieldValue, dataModel;
                var fieldType, refFld, parentTableName;
                var recordObject, refRecordObj, objHandler;
                var primaryKeyName, primaryFieldValue, contextDataDataMap, picklistVals;
                var childarray, child;
                var dataMapDefArray = [];
                var childDataMapDef;
                var ArrayConstructor = [].constructor;
                var widgetcount;
                var computedwidgetcount
                for (var containerName in entityDef) {
                    widgets = entityDef[containerName]["widgets"];
                    if (!widgets) {
                        continue;
                    }
                    computedwidgetcount = 0;
                    for (var computedwidget in widgets) {
                        if (widgets[computedwidget].isComputedField()) {
                            oldFieldValue = ORMController.getPropertyVal(computedwidget);
                            if (oldFieldValue && (ArrayConstructor === oldFieldValue.constructor)) {
                                for (var index in oldFieldValue) {
                                    dataMapDefArray.push(oldFieldValue[index]);
                                }
                            }
                            computedwidgetcount++;
                        }
                    }
                    widgetcount = Object.keys(widgets).length;
                    if ((computedwidgetcount === widgetcount) && (Object.keys(entityDef[containerName]["child"]).length === 0)) {
                        continue;
                    }
                    entityName = entityDef[containerName]["entityName"];
                    objHandler = kony.sdk.mvvm.persistent.Record;
                    recordObject = new objHandler(entityName);
                    entityContrlr = controller.getModel(entityName);
                    //Edit Flow populate primary key..
                    dataModel = contextData.getDataModel(containerName);
                    primaryKeyName = entityContrlr.getValueForProperty("primaryKeyName");
                    primaryFieldValue = dataModel && dataModel.getPrimaryFieldValue();
                    if (primaryFieldValue && primaryKeyName) {
                        recordObject.set(primaryKeyName, primaryFieldValue);
                    }
                    //Data Map from context Data..
                    contextDataDataMap = dataModel && dataModel.getEntityDataMap(entityName);
                    if (contextDataDataMap) {
                        for (var column in contextDataDataMap) {
                            recordObject.set(column, contextDataDataMap[column]);
                        }
                    }
                    for (var widget in widgets) {
                        if (widgets[widget].isComputedField()) {
                            continue;
                        }
                        fieldValue = formmodel.getWidgetData(widget); //TODO: Formatter
						if(fieldValue instanceof kony.sdk.mvvm.Data){
							fieldValue = fieldValue.getData();
						}
                        oldFieldValue = ORMController.getPropertyVal(widget);
                        if ((fieldValue !== null) && (fieldValue !== undefined) && (fieldValue !== "")) {
                            fieldName = widgets[widget].getField();
                            fieldNameArray = fieldName.split(".");
                            aliasName = fieldNameArray[0];
                            fieldType = entityContrlr.getValueForColumnProperty(aliasName, "type");
                            len = fieldNameArray.length;
                            for (var i = 1; i < len; i++) {
                                if (oldFieldValue) {
                                    oldFieldValue = oldFieldValue[fieldNameArray[i]];
                                } else {
                                    oldFieldValue = null;
                                    break;
                                }
                            }
                            if (!isValueChanged(fieldValue, oldFieldValue)) {
                                continue;
                            }
                            if (fieldType === "reference") {
                                parentTableName = entityContrlr.getValueForColumnProperty(aliasName, "parentTableName");
                                refFld = entityContrlr.getValueForColumnProperty(aliasName, "parentPrimaryKeyName");
                                refRecordObj = new objHandler(parentTableName);
                                refRecordObj.set(refFld, fieldValue);
                                recordObject.set(aliasName, refRecordObj);
                            } else if (fieldType === "picklist") {
                                picklistVals = entityContrlr.getFieldPickListValues(aliasName);
                                for (var val in picklistVals) {
                                    if (picklistVals[val].getValue().toString() === fieldValue.toString()) {
                                        recordObject.set(aliasName, picklistVals[val]);
                                        break;
                                    }
                                }
                            } else {
                                recordObject.set(aliasName, fieldValue);
                            }
                        }
                    }
                    childDataMapDef = prepareEntityDataMap(entityDef[containerName]["child"]);
                    for (var indx in childDataMapDef) {
                        child = childDataMapDef[indx].getInfo("entity");
                        if (recordObject.hasOwnProperty(child)) {
                            childarray = recordObject.get(child);
                            childarray.push(childDataMapDef[indx]);
                            recordObject.set(child, childarray);
                        } else {
                            childarray = [];
                            childarray.push(childDataMapDef[indx]);
                            recordObject.set(child, childarray);
                        }
                    }
                    dataMapDefArray.push(recordObject);
                }
                return dataMapDefArray;
            };
            var formEntityDefinition = controller.getConfig().getFormEntityDefinitionMap();
            //kony.sdk.mvvm.log.info("Prepared formEntityDefinition is : ", formEntityDefinition);
            var dataMapDefinition = prepareEntityDataMap(formEntityDefinition);
            //kony.sdk.mvvm.log.info("Prepared dataMapDefinition is : ", dataMapDefinition);
            return dataMapDefinition;
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GET_ENTITIES_DEFINITION, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_GET_ENTITIES_DEFINITION, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GET_ENTITIES_DEFINITION, error);
        }
    },
	/**
		'saveData' will save the data of a form
	*/
    saveData: function(successCallback, errorCallback) {
        try {
          	this.getBaseFormControllerExtensionObj().saveData(successCallback, errorCallback);
            /*var scopeObj = this;
            var config = scopeObj.getController().getConfig();
            var formEntities = config.getFormEntitiesName();
            scopeObj.getBaseFormControllerExtensionObj().getORMController().loadChildRelationships(formEntities, loadChildRelSuccess, loadChildRelError);
            function loadChildRelSuccess() {
                var entityDataMapTreeArray = scopeObj.getEntitiesDataMap();
                var dataMaplen = entityDataMapTreeArray.length;
                if (dataMaplen > 1) {
                    scopeObj.saveRecords(entityDataMapTreeArray, sucCallback, errCallback);
                } else if (dataMaplen === 1) {
                    scopeObj.saveRecord(entityDataMapTreeArray[0], sucCallback, errCallback);
                } else {
                    return;
                }
                function sucCallback(response) {
                    if (successCallback && typeof successCallback === "function") {
                        successCallback.call(scopeObj, response);
                    } else {
                        scopeObj.showPreviousForm();
                    }
                };
                function errCallback(err) {
                    if (errorCallback && typeof errorCallback === "function") {
                        errorCallback.call(scopeObj, err);
                    } else {
                        kony.sdk.mvvm.log.error("Error in Blogic save data.", err);
                    }
                };
            };
            function loadChildRelError(error) {
                kony.sdk.mvvm.log.error("Error in load child rel data.", error);
            };*/
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_DATA, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_SAVE_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_DATA, error);
        }
    },
	/**
		'deleteData' will delete a particular record from an entity
	*/
    deleteData: function() {
        try {
		    var scopeObj = this;
            var ormController = scopeObj.getBaseFormControllerExtensionObj().getORMController();
            ormController.saveRecord(recordObject, successcallback, errorcallback);
            function successcallback(response) {
				// kony.sdk.mvvm.log.info("entity successfully saved for : " + entityName);
                onSuccess.call(scopeObj, response);
            };

            function errorcallback(error) {
				// kony.sdk.mvvm.log.error("error in entity save for : " + entityName + " and error is : " + JSON.stringify(error));
                onError.call(scopeObj, error);
            };
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_DELETE_DATA, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_DELETE_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_DELETE_DATA, error);
        }
    },
	/**
		'removeRecord' will delete a particular record from an entity
		recordObject - object to be deleted
	*/
	removeRecord: function(recordObject, successcallback, errorcallback) {
        try {
		    var scopeObj = this;
            var ormController = scopeObj.getBaseFormControllerExtensionObj().getORMController();
            ormController.removeRecord(recordObject, Successcallback, Errorcallback);
            function Successcallback(response) {
				// kony.sdk.mvvm.log.info("entity successfully saved for : " + entityName);
                successcallback(response);
            };
            function Errorcallback(error) {
				// kony.sdk.mvvm.log.error("error in entity save for : " + entityName + " and error is : " + JSON.stringify(error));
                errorcallback( error);
            };
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_DELETE_DATA, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_DELETE_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_DELETE_DATA, error);
        }
    },
	/**
		'showPreviousForm' will show previous form
		doReload - true - will reload the form / false will not reload the form
		formName - name of the form
	*/
    showPreviousForm: function(doReload, formName) {
		try {
			var utilitiesObj = utilities.getUtilityObj();
			kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
			var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			var navigateTo = formName ? formName : kony.application.getPreviousForm().id;
			var prevController = INSTANCE.getFormController(navigateTo);
			if (doReload) {			
				prevController.loadDataAndShowForm(prevController.getContextData());		
			} else {
				var konyform = prevController.getFormModel().getView().getKonyForm();
                TAG.NC.applyFormTransitions(konyform);
				prevController.getFormModel().showView();
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			}
		} catch (error) {
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, error);
        }
    },
	/**
		'navigateTo' will navigate to specific form
		formId - form id
		navObject - contains query and its parameters to navigate to a particular form
	*/
    navigateTo: function(formId, navObject) {
		try {
			var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			var formController = INSTANCE.getFormController(formId);
			if (!navObject || !(navObject instanceof kony.sdk.mvvm.NavigationObject)) {
				navObject = new kony.sdk.mvvm.NavigationObject();
			}
			formController.loadDataAndShowForm(navObject);
		} catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_NAVIGATE_TO, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
        }
    },
	/**
		'refreshSegData' is used to refresh the data of particular segment without effecting any other widgets in a form
		navObject - contains query and its parameters to navigate to a particular segment
	*/
	refreshSegData : function(navObject){
		try{
			var scopeObj = this;
			scopeObj.getController().setContextData(navObject);
			scopeObj.fetchData();
		}catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_NAVIGATE_TO, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
        }		
	},
	/**
		'doSearch' is used to filter the data of a segment based on specified condition  
		segmentName - name of the segment
		textBoxName - name of the text box from which the value to be searched
	*/
	doSearch : function(segmentName, textBoxName){
		try{
			var scopeObj = this;
			var controller = scopeObj.getController();
			//var contextData = this.getController().getContextData();
			var searchText = controller.getFormModel().getViewAttributeByProperty(textBoxName, "text");
			scopeObj.setFormModelInfo("searchData",{"text":searchText,"isSearch":true});
			if(searchText.length < 1){
				alert("Search text should be greater than or equal to 1");
				return;
			}
			var navObject = controller.getContextData();
			var queryParams = navObject.getQueryParams(segmentName);
			if(!queryParams){
			  queryParams={};
			}
			queryParams["searchText"] = "'%"+searchText+"%'";
			navObject.setQueryParams(segmentName, queryParams);
			scopeObj.refreshSegData(navObject);
		}catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_NAVIGATE_TO, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
        }		
	},
	/**
		'fetchDataByWidgetId' is used to fetch the data of a perticular widget in a form 
		widgetId - name of the widget
	*/
	fetchDataByWidgetId: function(widgetId, successCallback, errorCallback) {
		try {
			var scopeObj = this;
			var appFactoryInstance = scopeObj.getController().getApplicationContext().getFactorySharedInstance();
			if (typeof successCallback !== "function" || typeof errorCallback !== "function") throw appFactoryInstance.createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_CALLBACK_NOT_A_FUNCTION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_CALLBACK_NOT_A_FUNCTION);
			var groupContext = scopeObj.getBaseFormControllerExtensionObj().createGroupWidgetsContext();
			scopeObj.setGroupWidgetsContext(groupContext);
			groupContext.fetchDataForGroupWidget(widgetId, sucCallback, errCallback);
			function sucCallback(response) {
				scopeObj.setContainerRecord(widgetId, response);
				successCallback.call(scopeObj, response);
			}
			function errCallback(error) {
				errorCallback(error);
			}
		} catch (err) {
			var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_BASE_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_BASE_CONTROLLER_EXTENSION, err);
			errorCallback(exception)
		}
	},
	/**
		'performAction' is used call a method with arguments as an array
		actionName - method name
		argsArray - method parameters
	*/
	performAction: function(actionName, argsArray) {
        try {
			if(this.getControllerExtensionObject()[actionName]){ 
				return this.$class.$superp.performAction.call(this, actionName, argsArray);
			}
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic performAction : " + err);
        }
    },
});