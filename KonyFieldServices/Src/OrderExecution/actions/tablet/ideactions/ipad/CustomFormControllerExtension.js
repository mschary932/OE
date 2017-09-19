/**
 * common business logic implementaion class, Would be app specific.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.CustomFormControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.BaseFormControllerExtension = new kony.sdk.mvvm.BaseFormControllerExtension(controllerObj);
        var formmodelInfoMap = {};
        this.getFormModelInfo = function(prop) {
            return formmodelInfoMap[prop];
        };
        this.setFormModelInfo = function(prop, data) {
            formmodelInfoMap[prop] = data;
        };
        this.getController = function() {
            return this.BaseFormControllerExtension.getController();
        };
        this.getContainerRecord = function(prop) {
            return this.BaseFormControllerExtension.getContainerRecord(prop);
        };
        this.setContainerRecord = function(prop, data) {
            this.BaseFormControllerExtension.setContainerRecord(prop, data);
        };
        this.getWidgetData = function(prop) {
            return this.BaseFormControllerExtension.getWidgetData(prop);
        };
        this.setWidgetData = function(prop, data) {
            this.BaseFormControllerExtension.setWidgetData(prop, data);
        };
        this.getORMController = function() {
            return this.BaseFormControllerExtension.getORMController();
        };
        this.setGroupWidgetsContext = function(groupContext) {
            this.BaseFormControllerExtension.setGroupWidgetsContext(groupContext);
        };
        this.getGroupWidgetsContext = function() {
            return this.BaseFormControllerExtension.getGroupWidgetsContext();
        };
    },
    fetchData: function() {
        try {
            var scopeObj = this;
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
            this.BaseFormControllerExtension.fetchData(successcallback, errorcallback);
            //if (this.fetchMasterData && (typeof this.fetchMasterData === "function")) {
            //                this.fetchMasterData(onSuccess, onError);
            //            } else {
            //                onSuccess(null);
            //            }
            //
            //            function onSuccess(response) {
            //                scopeObj.performFetchAndBindFormData(successcallback, errorcallback);
            function successcallback(responseDataMap) {
                var konyform = formmodel.getView().getKonyForm();
                TAG.NC.applyFormTransitions(konyform);
                scopeObj.bindData(responseDataMap);
                formmodel.showView();
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            };

            function errorcallback(error) {
                var konyform = formmodel.getView().getKonyForm();
                TAG.NC.applyFormTransitions(konyform);
                //  kony.appfoundation.log.error("Error in Blogic perform fetch and bind form data. ", error);
                formmodel.showView();
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            };
            // };
            function onError(error) {
                kony.appfoundation.log.error("Error in Blogic master data fetch. ", error);
                kony.appfoundation.v2.KonyApplicationContext.dismissLoadingScreen();
                return;
            };
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_DATA, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_DATA, error);
        }
    },
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
                        if (successcallback && typeof successcallback === 'function') successcallback.call(scopeObj);
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
            this.prepareFetchAndBindDataStrategy();
            var transactions = [];
            for (var prop in this.bLogicContextObj) {
                if ((typeof this.bLogicContextObj[prop] !== "function") && !this.bLogicContextObj[prop]["constrained"]) {
                    transactions.push(prop);
                }
            }
            fetchAndBindFormData(transactions, successcallback, errorcallback);
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA, error);
        }
    },
    prepareFetchAndBindDataStrategy: function() {
        try {
            var scopeObj = this;
            var queryWidgetsMapping = scopeObj.getController().getConfig().getQueryEnabledWidgetsMap();
            var contextData = scopeObj.getController().getContextData();
            var entityName, queryType, query, queryParams, strategyobj;
            var dataModel, operationType;
            scopeObj.bLogicContextObj = new kony.appfoundation.v2.persistent.BLogicContext();
            var widgetContext;
            for (var widgetMapping in queryWidgetsMapping) {
                if (!queryWidgetsMapping[widgetMapping]) {
                    continue;
                }
                operationType = contextData.getOperationType(widgetMapping);
                if (operationType && (operationType === kony.appfoundation.v2.OperationType.ADD)) {
                    continue;
                }
                dataModel = contextData.getDataModel(widgetMapping);
                widgetContext = {};
                widgetContext["widgetGroupId"] = widgetMapping;
                widgetContext["widgets"] = queryWidgetsMapping[widgetMapping]["widgets"];
                if ((dataModel && dataModel.getPrimaryFieldValue()) && (operationType === kony.appfoundation.v2.OperationType.FILTER_BY_PRIMARY_KEY)) {
                    if (widgetMapping === "form") {
                        entityName = scopeObj.getController().getConfig().getEntity();
                        queryType = scopeObj.getController().getConfig().getQueryType();
                        query = scopeObj.getController().getConfig().getQuery();
                        queryParams = scopeObj.getController().getConfig().getQueryParams() || {};
                    } else {
                        entityName = queryWidgetsMapping[widgetMapping]["config"].getWidgetEntity();
                        queryType = queryWidgetsMapping[widgetMapping]["config"].getQueryType();
                        query = queryWidgetsMapping[widgetMapping]["config"].getQuery();
                        queryParams = queryWidgetsMapping[widgetMapping]["config"].getQueryParams() || {};
                        widgetContext["constrained"] = queryWidgetsMapping[widgetMapping]["config"].isConstrained();
                    }
                    strategyobj = kony.appfoundation.v2.persistent.FetchAndBindDataByPKStrategy;
                } else if (!operationType || (operationType === kony.appfoundation.v2.OperationType.NO_FILTER)) {
                    entityName = queryWidgetsMapping[widgetMapping]["config"].getWidgetEntity();
                    queryType = queryWidgetsMapping[widgetMapping]["config"].getQueryType();
                    query = queryWidgetsMapping[widgetMapping]["config"].getQuery();
                    queryParams = queryWidgetsMapping[widgetMapping]["config"].getQueryParams() || {};
                    widgetContext["constrained"] = queryWidgetsMapping[widgetMapping]["config"].isConstrained();
                    strategyobj = kony.appfoundation.v2.persistent.FetchAndBindListDataStrategy;
                } else {
                    kony.appfoundation.log.error("Error in Blogic prepare Blogic context, Wrong config");
                    continue;
                }
                if ((queryType === "sql") && query && (query.toLowerCase().indexOf("select") >= 0)) {
                    strategyobj = kony.appfoundation.v2.persistent.FetchAndBindDataWithNativeQueryStrategy;
                } //TODO
                widgetContext["entityName"] = entityName;
                widgetContext["entityCtrlr"] = scopeObj.getController().getModel(entityName);
                widgetContext["ORMController"] = scopeObj.ORMController;
                widgetContext["queryType"] = queryType || "sql";
                widgetContext["query"] = query;
                widgetContext["queryParams"] = queryParams;
                scopeObj.bLogicContextObj.setContext(widgetMapping, widgetContext);
                scopeObj.bLogicContextObj.setFetchDataStrategy(widgetMapping, new strategyobj());
                scopeObj.updateBLogicContextData(widgetMapping);
            }
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA_STRATEGY, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA_STRATEGY, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_AND_BIND_DATA_STRATEGY, error);
        }
    },
    updateBLogicContextData: function(widgetMapping) {
        try {
            var navContextData = this.getController().getContextData();
            if (navContextData) {
                var queryType, query, queryParams, dataModel, operationType;
                var navQueryType, navQuery, navQueryParams;
                var widgetContext = this.bLogicContextObj.getContext(widgetMapping);
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
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_UPDATE_CONTEXT_DATA, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_UPDATE_CONTEXT_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_UPDATE_CONTEXT_DATA, error);
        }
    },
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
                    kony.appfoundation.log.error("Error in Blogic fetch data for widget : ", error);
                    return;
                };
            }
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_BIND_DATA, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_BIND_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_BIND_DATA, error);
        }
    },
    bindData: function(dataMap) {
        this.BaseFormControllerExtension.bindData(dataMap);
        /* try {
            var scopeObj = this;
            var formModelJSON = kony.appfoundation.v2.persistent.util.unmarshallToFormModelJSON;
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
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_BIND_DATA, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_BIND_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_BIND_DATA, error);
        }*/
    },
    fetchMasterData: function(successcallback, errorcallback) {
        try {
            var mDataEnabledWidgetsArray = this.getController().getConfig().getMasterDataEnabledWidgets();
            var indx = 0;
            var scopeObj = this;
            loadMasterData();

            function loadMasterData() {
                if (indx >= mDataEnabledWidgetsArray.length) {
                    successcallback.call(scopeObj);
                    return;
                }
                var widgetConfig = scopeObj.getController().getConfig().getWidget(mDataEnabledWidgetsArray[indx]);
                if (widgetConfig.isConstrained()) {
                    var masterData = [];
                    var masterDataElement = [];
                    masterDataElement.push(-1);
                    masterDataElement.push("Select..."); //TODO: i18n
                    masterData.push(masterDataElement);
                    var formmodel = scopeObj.getController().getFormModel();
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
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA, error);
        }
    },
    fetchMasterDataForWidget: function(widgetId, successcallback, errorcallback) {
        try {
            var scopeObj = this;
            var contextData = this.getController().getContextData();
            kony.print("alekhya" + widgetId);
            var widgetConfig = this.getController().getConfig().getWidget(widgetId);
            var widgetField = widgetConfig.getField().split(".")[0];
            var widgetEntity = widgetConfig.getWidgetEntity();
            var entityContrl = this.getController().getModel(widgetEntity);
            var widgetFieldType = entityContrl.getValueForColumnProperty(widgetField, "type");
            if (widgetFieldType === "reference") {
                var fieldQuery = widgetConfig.getFieldQuery();
                var fieldQueryType = widgetConfig.getQueryType() || "sql";
                var refEntityName = entityContrl.getValueForColumnProperty(widgetField, "parentTableName");
                var refFld = entityContrl.getValueForColumnProperty(widgetField, "parentPrimaryKeyName");
                var refDisplayFld = entityContrl.getValueForColumnProperty(widgetField, "parentFieldName");
                var refEntityContrlr = this.getController().getModel(refEntityName);
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
                kony.appfoundation.log.info("meta data fetch response : " + JSON.stringify(response));
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
                var formmodel = scopeObj.getController().getFormModel();
                formmodel.setMasterDataByProperty(masterData, widgetId);
                if (successcallback && (typeof successcallback === "function")) {
                    successcallback.call(scopeObj);
                }
            };

            function onError(err) {
                kony.appfoundation.log.error("Error while fetching master data for : " + widgetId + " and error message is :" + err);
                if (errorcallback && (typeof errorcallback === "function")) {
                    errorcallback.call(scopeObj, err);
                }
            };
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA_FOR_WIDGET, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA_FOR_WIDGET, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_FETCH_MASTER_DATA_FOR_WIDGET, error);
        }
    },
    saveRecord: function(recordObject, onSuccess, onError) {
        try {
            var scopeObj = this;
            var ormController = scopeObj.BaseFormControllerExtension.getORMController();
            ormController.saveRecord(recordObject, successcallback, errorcallback);

            function successcallback(response) {
                // kony.appfoundation.log.info("entity successfully saved for : " + entityName);
                onSuccess.call(scopeObj, response);
            };

            function errorcallback(error) {
                // kony.appfoundation.log.error("error in entity save for : " + entityName + " and error is : " + JSON.stringify(error));
                onError.call(scopeObj, error);
            };
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_RECORD, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_SAVE_RECORD, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_RECORD, error);
        }
    },
    saveRecords: function(recordsArray, successcallback, errorcallback) {
        try {
            var indx = 0;
            var scopeObj = this;
            var res = [];
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
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_RECORDS, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_SAVE_RECORDS, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_RECORDS, error);
        }
    },
    getEntitiesDataMap: function() {
        try {
            var scopeObj = this;

            function isValueChanged(newVal, oldVal) {
                if (newVal === oldVal) {
                    return false;
                }
                return true;
            };

            function prepareEntityDataMap(entityDef) {
                var formmodel = scopeObj.getController().getFormModel();
                var ORMController = scopeObj.ORMController;
                var contextData = scopeObj.getController().getContextData();
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
                    objHandler = kony.appfoundation.v2.persistent.Record;
                    recordObject = new objHandler(entityName);
                    entityContrlr = scopeObj.getController().getModel(entityName);
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
                        if (fieldValue instanceof kony.appfoundation.v2.Data) {
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
            var config = this.getController().getConfig();
            var formEntityDefinition = config.getFormEntityDefinitionMap();
            //kony.appfoundation.log.info("Prepared formEntityDefinition is : ", formEntityDefinition);
            var dataMapDefinition = prepareEntityDataMap(formEntityDefinition);
            kony.appfoundation.log.info("Prepared dataMapDefinition is : ", dataMapDefinition);
            return dataMapDefinition;
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GET_ENTITIES_DEFINITION, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_GET_ENTITIES_DEFINITION, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GET_ENTITIES_DEFINITION, error);
        }
    },
    saveData: function(successCallback, errorCallback) {
        try {
            var scopeObj = this;
            var config = scopeObj.getController().getConfig();
            var formEntities = config.getFormEntitiesName();
            scopeObj.ORMController.loadChildRelationships(formEntities, loadChildRelSuccess, loadChildRelError);

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
                        kony.appfoundation.log.error("Error in Blogic save data.", err);
                    }
                };
            };

            function loadChildRelError(error) {
                kony.appfoundation.log.error("Error in load child rel data.", error);
            };
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_DATA, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_SAVE_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_SAVE_DATA, error);
        }
    },
    deleteData: function() {
        try {
            //
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_DELETE_DATA, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_DELETE_DATA, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_DELETE_DATA, error);
        }
    },
    showPreviousForm: function(doReload, formName) {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var navigateTo = formName ? formName : kony.application.getPreviousForm().id;
            var prevController = INSTANCE.getFormController(navigateTo);
            if (doReload) {
                prevController.loadDataAndShowForm(prevController.getContextData());
                //kony.appfoundation.v2.KonyApplicationContext.dismissLoadingScreen();
            } else {
                var konyform = prevController.getFormModel().getView().getKonyForm();
                TAG.NC.applyFormTransitions(konyform);
                prevController.getFormModel().showView();
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            }
        } catch (error) {
            kony.appfoundation.v2.KonyApplicationContext.dismissLoadingScreen();
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, error);
        }
    },
    navigateTo: function(formId, navObject) {
        try {
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var formController = INSTANCE.getFormController(formId);
            if (!navObject || !(navObject instanceof kony.sdk.mvvm.NavigationObject)) {
                navObject = new kony.sdk.mvvm.NavigationObject();
            }
            formController.loadDataAndShowForm(navObject);
        } catch (error) {
            kony.appfoundation.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
            throw new kony.appfoundation.AppFoundationException(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_NAVIGATE_TO, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
        }
    }
});