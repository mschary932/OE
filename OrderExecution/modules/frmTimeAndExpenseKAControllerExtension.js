/*
 * Controller Extension class for frmTimeAndExpenseKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmTimeAndExpenseKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmTimeAndExpenseKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        var scopeObj = this;
        this.$class.$super.call(scopeObj, controllerObj);
        scopeObj.WorkOrderTimeExpenseId = null;
        scopeObj.WorkOrderTimeExpenseType = null;
        scopeObj.WorkOrderTimeExpenseCategory_id = null;
        scopeObj.WorkOrderTimeExpenseDesc = null;
        scopeObj.formValue = null;
        scopeObj.Statusid="";
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmTimeAndExpenseKAControllerExtension#
     */

    fetchData: function() {
        try {
           	var scopeObj = this;          	
            if(scopeObj.getController().getContextData().getCustomInfo("WorkOrderTimeExpense")=="WorkOrderTimeExpense"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmTimeAndExpenseKAConfig,"SegTimeExpenseKA","WorkOrderTimeExpense", kony.servicesapp.TAEORDERLISTWO);
                scopeObj.formValue = scopeObj.getController().getContextData().getCustomInfo("WorkOrderTimeExpense");
            }
            else if(scopeObj.getController().getContextData().getCustomInfo("Task")=="Task"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmTimeAndExpenseKAConfig,"SegTimeExpenseKA","TaskTimeExpense", kony.servicesapp.TAEORDERLISTTASK);
                scopeObj.formValue = scopeObj.getController().getContextData().getCustomInfo("Task");
            }                
            else if(scopeObj.getController().getContextData().getCustomInfo("CompleteOrder") =="CompleteOrder"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmTimeAndExpenseKAConfig,"SegTimeExpenseKA","WorkOrderTimeExpense", kony.servicesapp.TAEORDERLISTCO);
                scopeObj.formValue = scopeObj.getController().getContextData().getCustomInfo("CompleteOrder");
            }
               
           // formmodel.clear();
            var formmodel = this.getController().getFormModel();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            if( Object.keys(kony.servicesapp.swipedIndices).length > 0){
                var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-50%","0%",true);
                animObj["callbacks"] = {
                    "animationEnd":function(){ 
                        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
                        kony.servicesapp.rowreset=true;
                        kony.servicesapp.swipedIndices={};
                        kony.servicesapp.coords=[];
                        kony.servicesapp.isAnimationInProgress=false;
                        //return controller.$class.$superp.fetchData.call(controller);
                    }
                }
                frmTimeAndExpenseKA.SegTimeExpenseKA.animateRows({
                    rows: [{
                        sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                        rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
                    }],
                    widgets: ["flxChildKA"],
                    animation: animObj
                });
            }else if(kony.servicesapp.isAnimationInProgress && kony.application.getCurrentForm().id == "frmTimeAndExpenseKA"){
                return;
            }
            this.$class.$superp.fetchData.call(this, success, error);

            function error(err){
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
            }
			
        function success(response) {          	
            kony.sdk.mvvm.log.info("success fetching data ", response);            
            scopeObj.bindData(response);
        }

         
          }catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmTimeAndExpenseKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
            var scopeObj = this;
            var processedData = this.$class.$superp.processData.call(this, data);
            this.getController().bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmTimeAndExpenseKAControllerExtension#
     */
    bindData: function(data) {
        try {
          	
          	kony.sdk.mvvm.log.info("binddata");
            var scopeObj = this;
            var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            frmTimeAndExpenseKA.BtnTimeKA.skin = sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA;
            frmTimeAndExpenseKA.BtnBothKA.skin = sknBtnFFFFFFClanProNews28BackgroundFF5D6EKA;
            frmTimeAndExpenseKA.BtnExpenseKA.skin = sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA;
            if(scopeObj.getController().getContextData().getCustomInfo("WorkOrderTimeExpense") == "WorkOrderTimeExpense" || scopeObj.getController().getContextData().getCustomInfo("CompleteOrder") =="CompleteOrder"){
               if(scopeObj.getController().getContextData().getCustomInfo("WorkOrderStatus").toUpperCase() == "STARTED") 
                    formmodel.setViewAttributeByProperty("BtnTimeAndExpenseAddKA" , "isVisible", true);
               else
                    formmodel.setViewAttributeByProperty("BtnTimeAndExpenseAddKA" , "isVisible", false);

            }else if(scopeObj.getController().getContextData().getCustomInfo("Task")=="Task"){
                if(scopeObj.getController().getContextData().getCustomInfo("TaskStatus").toUpperCase() == "STARTED") 
                    formmodel.setViewAttributeByProperty("BtnTimeAndExpenseAddKA" , "isVisible", true);
                else
                    formmodel.setViewAttributeByProperty("BtnTimeAndExpenseAddKA" , "isVisible", false);                
            }
          	if(scopeObj.getController().getContextData().getCustomInfo("CompleteOrder") =="CompleteOrder")
              {
                	if(kony.servicesapp.paymentDone)
              	{
                formmodel.setViewAttributeByProperty("BtnTimeAndExpenseAddKA" , "isVisible", false);                
              	}
              }
          
            formmodel.setViewAttributeByProperty("tbxSearchKA", "text", "");          	
            var processedSegData = this.convertDataToGroup(data);
            data["SegTimeExpenseKA"] = {};
            data["SegTimeExpenseKA"]["SegTimeExpenseKA"] = processedSegData;
            this.$class.$superp.bindData.call(this, data);
            //this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmTimeAndExpenseKAControllerExtension#
     */
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmTimeAndExpenseKAControllerExtension#
     */
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully deleting record
            kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method shows form.
     * @memberof frmTimeAndExpenseKAControllerExtension#
     */
    showForm: function() {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.showView();
        } catch (e) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    navigateToTimeAndExpenseDetails: function() {
        try {
            var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            var selItems = frmTimeAndExpenseKA.SegTimeExpenseKA.selectedItems;
            this.WorkOrderTimeExpenseType = selItems && selItems[0] && selItems[0]["Type"];
            this.WorkOrderTimeExpenseCategory_id = selItems && selItems[0] && selItems[0]["Category_id"];
            this.WorkOrderTimeExpenseDesc = selItems && selItems[0] && selItems[0]["Description"];
            this.WorkOrderTimeExpenseId = selItems && selItems[0] && selItems[0]["primaryKeyValueMap"] && selItems[0]["primaryKeyValueMap"]["id"];
            var taskid = scopeObj.getController().getContextData().getCustomInfo("TaskId");
            var WorkOrderId = scopeObj.getController().getContextData().getCustomInfo("WorkOrderId");
            var recordID, WorkOrderStatus,TaskStatus,fromForm;
            if(scopeObj.getController().getContextData().getCustomInfo("WorkOrderTimeExpense") == "WorkOrderTimeExpense"){
                recordID = WorkOrderId;
                WorkOrderStatus = scopeObj.getController().getContextData().getCustomInfo("WorkOrderStatus");
				fromForm="WorkOrder";
            }
            else if(scopeObj.getController().getContextData().getCustomInfo("Task") == "Task"){
                recordID = taskid;
                TaskStatus = scopeObj.getController().getContextData().getCustomInfo("TaskStatus");
				fromForm="Task";
            }else if(scopeObj.getController().getContextData().getCustomInfo("CompleteOrder") == "CompleteOrder"){
				fromForm="CompleteOrder";
                if(selItems&&selItems[0]&&selItems[0]["Task_id"])
                    scopeObj.formValue = "Task";
                else
                    scopeObj.formValue = "WorkOrderTimeExpense";
                TaskStatus = scopeObj.getController().getContextData().getCustomInfo("WorkOrderStatus");
                WorkOrderStatus = scopeObj.getController().getContextData().getCustomInfo("WorkOrderStatus");
                recordID = WorkOrderId;
            }   
            datamodel.setPrimaryKeyValueMap({
                "x": this.WorkOrderTimeExpenseId
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", {
                "x": this.WorkOrderTimeExpenseId
            });
            navigationObject.addCustomInfo("woTimeExpnsInfo", {
                "WorkOrderTimeExpenseId": scopeObj.WorkOrderTimeExpenseId,
                "WorkOrderTimeExpenseType": scopeObj.WorkOrderTimeExpenseType,
                "WorkOrderTimeExpenseCategory_id":scopeObj.WorkOrderTimeExpenseCategory_id,
                "WorkOrderTimeExpenseDesc": scopeObj.WorkOrderTimeExpenseDesc,
                "recordID": recordID,
                "formValue": scopeObj.formValue,
                "WorkOrderStatus": WorkOrderStatus,
                "TaskStatus": TaskStatus,
				"fromForm":fromForm
            });
            scopeObj.navigateTo("frmExpenseDetailsKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToTimeAndExpenseDetails : " + err);
        }
    },
    
    convertDurationToHours: function(data) {
        try {
            var min = (data - Math.floor(data)) * 60;
            min = Math.round(min,2);
            if(min < 10) {
                var res = Math.floor(data) + ":0" + min;
            }
            else {
              var res = Math.floor(data) + ":" + min;
            }
            return res;
        }
      catch(err) {
            kony.sdk.mvvm.log.error("Error in converting duration : " + err);
      }
    },
    
    convertDataToGroup: function(data) {
        try {
            var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
            var dataOutput = [];
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var formmodel = scopeObj.getController().getFormModel();
            var time_segData = [],
                expense_segData = [];
            var TimeCount = 0,
                ExpenseCount = 0;
            var Status;
            var amountDecimal,processedAmount;
            for (var i = 0; i < data.SegTimeExpenseKA.length; i++) {
                var lblWidgetDataMap = formmodel.getViewAttributeByProperty("SegTimeExpenseKA", "widgetDataMap");
                amountDecimal = data["SegTimeExpenseKA"][i]["Amount"];
                lblWidgetDataMap["lblDurationKA"] = "lblDurationKA";
                formmodel.setViewAttributeByProperty("SegTimeExpenseKA", "widgetDataMap", lblWidgetDataMap);
                if (data["SegTimeExpenseKA"][i]["Type"] == "TIME" && data["SegTimeExpenseKA"][i]["DELETED"] != "D") {
                    data["SegTimeExpenseKA"][i]["lblDurationKA"] = {
                        "text": "Duration"
                    };
                    var duration = scopeObj.convertDurationToHours(data["SegTimeExpenseKA"][i]["Duration"]);
                    data["SegTimeExpenseKA"][i]["val"] = duration;
                    Status = scopeObj.getController().getContextData().getCustomInfo("Status") || scopeObj.getController().getContextData().getCustomInfo("WorkOrderStatus") || scopeObj.getController().getContextData().getCustomInfo("TaskStatus");
                    if(Status && Status.toUpperCase() == "STARTED"){
                    data["SegTimeExpenseKA"][i]["metainfo"]= {
                                        editMode: constants.SEGUI_EDIT_MODE_DELETE,
                                        editModeCustomConfig: [{
                                                title: utilitiesObj.geti18nValueKA("i18n.common.delete.valueKA"),
                                                backgroundColor: "ff5d6e",
                                                callback: kony.servicesapp.timedeleteCallback
                                            }, {
                                                title: utilitiesObj.geti18nValueKA("i18n.common.deitValueKA"),
                                                backgroundColor: "9b9b9b",
                                                callback: kony.servicesapp.timeeditCallback
                                            }

                                        ]
                    }
                    }
                    time_segData.push(data["SegTimeExpenseKA"][i]);
                    TimeCount += 1;
                } else if (data["SegTimeExpenseKA"][i]["Type"] == "EXPE" && data["SegTimeExpenseKA"][i]["DELETED"] != "D") {
                    processedAmount = parseFloat(amountDecimal).toFixed(2);
                    data["SegTimeExpenseKA"][i]["val"] = processedAmount;
                    data["SegTimeExpenseKA"][i]["lblDurationKA"] = {
                        "text": "Amount"
                    };
                    data["SegTimeExpenseKA"][i]["baseUnit"] = "USD";
                    Status = scopeObj.getController().getContextData().getCustomInfo("Status");
                    if(Status && Status.toUpperCase() == "STARTED"){
                    data["SegTimeExpenseKA"][i]["metainfo"]= {
                                        editMode: constants.SEGUI_EDIT_MODE_DELETE,
                                        editModeCustomConfig: [{
                                                title: utilitiesObj.geti18nValueKA("i18n.common.delete.valueKA"),
                                                backgroundColor: "ff5d6e",
                                                callback: kony.servicesapp.timedeleteCallback
                                            }, {
                                                title: utilitiesObj.geti18nValueKA("i18n.common.deitValueKA"),
                                                backgroundColor: "9b9b9b",
                                                callback: kony.servicesapp.timeeditCallback
                                            }

                                        ]
                    }
                    }
                    expense_segData.push(data["SegTimeExpenseKA"][i]);
                    ExpenseCount += 1;
                }
            }
            var lclWidgetDataMap = formmodel.getViewAttributeByProperty("SegTimeExpenseKA", "widgetDataMap");
            lclWidgetDataMap["lblResourceKA"] = "lblResourceKA";
            formmodel.setViewAttributeByProperty("SegTimeExpenseKA", "widgetDataMap", lclWidgetDataMap);
            if (TimeCount == 1) {
                TimeCount = TimeCount + " " + kony.i18n.getLocalizedString("i18n.common.TimeItemKA");
            } else {
                TimeCount = TimeCount + " " + kony.i18n.getLocalizedString("i18n.common.TimeItemsKA");
            }
            var lclTaskHeader1 = {
                "lblResourceKA": TimeCount
            };
            if (platFormName === kony.sdk.mvvm.Platforms["IPHONE"] || platFormName === kony.sdk.mvvm.Platforms["IPAD"]) {
                lclTaskHeader1["metainfo"] = {
                    'sectionTitle': TimeCount
                };
            }
            this.time_segData = [lclTaskHeader1, time_segData];
            time_segData = [lclTaskHeader1, time_segData];
            if (ExpenseCount == 1) {
                ExpenseCount = ExpenseCount + " " + kony.i18n.getLocalizedString("i18n.common.ExpenseItemKA");
            } else {
                ExpenseCount = ExpenseCount + " " + kony.i18n.getLocalizedString("i18n.common.ExpenseItemsKA");
            }
            var lclTaskHeader = {
                "lblResourceKA": ExpenseCount
            };
            if (platFormName === kony.sdk.mvvm.Platforms["IPHONE"] || platFormName === kony.sdk.mvvm.Platforms["IPAD"]) {
                lclTaskHeader["metainfo"] = {
                    'sectionTitle': ExpenseCount
                };
            }
            this.expense_segData = [lclTaskHeader, expense_segData];
            expense_segData = [lclTaskHeader, expense_segData];
            dataOutput = [time_segData, expense_segData];
            this.dataOutput = dataOutput;
            return dataOutput;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic  convertDataToGroup : " + err);
        }
    },
    navigateToTime: function() {
        frmTimeAndExpenseKA.SegTimeExpenseKA.setData([this.time_segData]);
    },
    navigateToExpense: function() {
        frmTimeAndExpenseKA.SegTimeExpenseKA.setData([this.expense_segData]);
    },
    navigateToBoth: function() {
        frmTimeAndExpenseKA.SegTimeExpenseKA.setData(this.dataOutput);
    },
    doSearch: function() {
        var scopeObj = this;
        var controller = scopeObj.getController();
        var formmodel = controller.getFormModel();
        var utilitiesObj = utilities.getUtilityObj();
        var searchText = formmodel.getViewAttributeByProperty("tbxSearchKA", "text");
        if (searchText.length != 0 && searchText.length <= 2) {
            alert(utilitiesObj.geti18nValueKA("i18n.order.common.searchErrorKA"));
            return;
        }
        scopeObj.setFormModelInfo("searchData", {
            "text": searchText,
            "isSearch": true
        });
        var contextData = controller.getContextData();
        if(scopeObj.getController().getContextData().getCustomInfo("WorkOrderTimeExpense")=="WorkOrderTimeExpense"){
            scopeObj.refreshSegData(kony.servicesapp.TAESEARCHQUERYWO, {
            'x': contextData.getCustomInfo("WorkOrderId"),
            'search': '%' + formmodel.getViewAttributeByProperty("tbxSearchKA", "text") + '%'
        });    
        }
        else if(scopeObj.getController().getContextData().getCustomInfo("Task")=="Task"){
             scopeObj.refreshSegData(kony.servicesapp.TAESEARCHQUERYTASK, {
            'x': contextData.getCustomInfo("TaskId"),
            'search': '%' + formmodel.getViewAttributeByProperty("tbxSearchKA", "text") + '%'
        });
        }
        else if(scopeObj.getController().getContextData().getCustomInfo("CompleteOrder")=="CompleteOrder"){
             scopeObj.refreshSegData(kony.servicesapp.TAESEARCHCO, {
            'x': contextData.getCustomInfo("WorkOrderId"),
            'y': contextData.getCustomInfo("TaskId"),
            'search': '%' + formmodel.getViewAttributeByProperty("tbxSearchKA", "text") + '%'
        });
        }
    },
    refreshSegData: function(query, queryParams) {
        try {
            var scopeObj = this;
            var contextData = scopeObj.getController().getContextData();
            var sucCallback = function(response) {
                scopeObj.processSegDatabasedOnSearch(response);
            }
            var errorcallback = function(err) {
                alert("Unable to fetch data");
            }
            contextData.setQuery("SegTimeExpenseKA", query, "sql");
            if (queryParams) {
                contextData.setQueryParams("SegTimeExpenseKA", queryParams);
            }
            scopeObj.fetchDataByWidgetId("SegTimeExpenseKA", sucCallback, errorcallback);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic refreshSegData : " + err);
        }
    },
    processSegDatabasedOnSearch: function(dataObj) {
        var data = this.convertDataToGroup(dataObj);
        if (frmTimeAndExpenseKA.BtnBothKA.skin == "sknBtnFFFFFFClanProNews28BackgroundFF5D6EKA")
            this.navigateToBoth();
        else if (frmTimeAndExpenseKA.BtnTimeKA.skin == "sknBtnFFFFFFClanProNews28BackgroundFF5D6EKA")
            this.navigateToTime();
        else if (frmTimeAndExpenseKA.BtnExpenseKA.skin == "sknBtnFFFFFFClanProNews28BackgroundFF5D6EKA")
            this.navigateToExpense();
    },
    ClearSearch: function(OnClose) {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var formmodel = controller.getFormModel();
            var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var TimeAndExpenseControllerExtension = appContext.getFormController("frmTimeAndExpenseKA").getControllerExtensionObject();
            formmodel.setViewAttributeByProperty("tbxSearchKA", "text", '');
            scopeObj.setFormModelInfo("searchData", {});
            var contextData = controller.getContextData();
            if(scopeObj.getController().getContextData().getCustomInfo("WorkOrderTimeExpense")=="WorkOrderTimeExpense"){
            scopeObj.refreshSegData(kony.servicesapp.TAESEARCHQUERYWO, {
            'x': contextData.getCustomInfo("WorkOrderId"),
            'search': '%%'
            });    
            }
            else if(scopeObj.getController().getContextData().getCustomInfo("Task")=="Task"){
                 scopeObj.refreshSegData(kony.servicesapp.TAESEARCHQUERYTASK, {
                'x': contextData.getCustomInfo("TaskId"),
                'search': '%%'
            });
            }
            else if(scopeObj.getController().getContextData().getCustomInfo("CompleteOrder")=="CompleteOrder"){
                 scopeObj.refreshSegData(kony.servicesapp.TAESEARCHCO, {
                'x': contextData.getCustomInfo("WorkOrderId"),
                'y': contextData.getCustomInfo("TaskId"),
                'search': '%%'
            });
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic applyView : " + err);
        }
    },
   /* navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmTaskExecutionKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },*/
   navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, false, this.getFormModelInfo("previousForm"));
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
    

    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },

    navigateToFormAddTimeExpenseKA: function() {
        try {

            var scopeObj = this;
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            var taskid = scopeObj.getController().getContextData().getCustomInfo("TaskId");
            var WorkOrderId = scopeObj.getController().getContextData().getCustomInfo("WorkOrderId");
            var recordID, WorkOrderStatus,TaskStatus;
            if(scopeObj.formValue == "WorkOrderTimeExpense" || scopeObj.formValue == "CompleteOrder"){
                recordID = WorkOrderId;
                WorkOrderStatus = scopeObj.getController().getContextData().getCustomInfo("WorkOrderStatus");
            }
            else if(scopeObj.formValue == "Task"){
                recordID = taskid;
                TaskStatus = scopeObj.getController().getContextData().getCustomInfo("TaskStatus");
            }
            navigationObject.addCustomInfo("woTimeExpnsInfo", {
                "WorkOrderTimeExpenseId": scopeObj.WorkOrderTimeExpenseId,
                "WorkOrderTimeExpenseType": scopeObj.WorkOrderTimeExpenseType,
                "recordID": recordID,
                "formValue": scopeObj.formValue,
                "WorkOrderStatus": WorkOrderStatus,
                "TaskStatus": TaskStatus
            });
            scopeObj.navigateTo("frmAddTimeExpenseKA", navigationObject);

        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToFormAddTimeExpenseKA action : " + err);

        }
    },

    navigateToEditScreenKA: function(seguiWidget, section, row) {
        try {
            var scopeObj = this;
            var datamodel = new kony.sdk.mvvm.DataModel();
            var taskId = scopeObj.getController().getContextData().getCustomInfo("TaskId");
            var WorkOrderId = scopeObj.getController().getContextData().getCustomInfo("WorkOrderId");
            var recordID,WorkOrderStatus,TaskStatus;;
            if(scopeObj.formValue == "WorkOrderTimeExpense" || scopeObj.formValue == "CompleteOrder"){
                recordID = WorkOrderId;
                WorkOrderStatus = scopeObj.getController().getContextData().getCustomInfo("WorkOrderStatus");
            }
            else if(scopeObj.formValue == "Task"){
                recordID = taskId;
                TaskStatus = scopeObj.getController().getContextData().getCustomInfo("TaskStatus");
            }
            var formmodel = scopeObj.getController().getFormModel();
            if(kony.sdk.mvvm.Utils.getPlatformName() == kony.sdk.mvvm.Platforms["IPHONE"]){             
                var selectedRecord = formmodel.getViewAttributeByProperty("SegTimeExpenseKA", "data")[section][1][row];
                this.WorkOrderTimeExpenseType = selectedRecord.Type;
                this.WorkOrderTimeExpenseId = selectedRecord.id;
            }else{
                var selItems = frmTimeAndExpenseKA.SegTimeExpenseKA.selectedItems;
                this.WorkOrderTimeExpenseType = selItems && selItems[0] && selItems[0]["Type"];
                this.WorkOrderTimeExpenseId = selItems && selItems[0] && selItems[0]["primaryKeyValueMap"] && selItems[0]["primaryKeyValueMap"]["id"];
            }
            datamodel.setPrimaryKeyValueMap({
                "id": this.WorkOrderTimeExpenseId
            });
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("form", {
                "x": this.WorkOrderTimeExpenseId
            });
            navigationObject.addCustomInfo("recordID", recordID);
            navigationObject.addCustomInfo("Edit", "Edit");
            navigationObject.addCustomInfo("Id", this.WorkOrderTimeExpenseId);
            navigationObject.addCustomInfo("Type", this.WorkOrderTimeExpenseType);
            navigationObject.addCustomInfo("Navigation", "List");
            navigationObject.addCustomInfo("formValue", scopeObj.formValue);
            navigationObject.addCustomInfo("woTimeExpnsInfo", {
                "recordID": recordID,
                "formValue": scopeObj.formValue,
                "WorkOrderStatus": WorkOrderStatus,
                "TaskStatus": TaskStatus
            });
            if (this.WorkOrderTimeExpenseType == "TIME")
                scopeObj.navigateTo("frmAddEditTimeItemKA", navigationObject);
            else if (this.WorkOrderTimeExpenseType == "EXPE")
                scopeObj.navigateTo("frmAddEditExpenseItemKA", navigationObject);

        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToEditScreenKA method : " + err);

        }
    }

});