/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmSummaryKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmSummaryKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
        this.segLength = "";
        this.subTotal = 0;
		this.discountCalculated = false;
    },
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            scopeObj.$class.$superp.fetchData.call(scopeObj, success, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
			var orderLevelTimeExpenseItems = response["SegItemDetailsKA"];
          	var totalOrderItems=[];
          	for (var i = 0, j = 0;i< orderLevelTimeExpenseItems.length;i++)
              {
                if(orderLevelTimeExpenseItems[i]["DELETED"] != "D")
                  {
                    totalOrderItems[j] = orderLevelTimeExpenseItems[i];
                    j++;
                  }
              }
          	response["SegItemDetailsKA"] = totalOrderItems;
          	var taskLevelTimeExpenseItems  = response["flxDataKA"];
        	orderLevelTimeExpenseItems = response["SegItemDetailsKA"];
          	var totalLength = orderLevelTimeExpenseItems.length;
        	for (var i = 0; i < taskLevelTimeExpenseItems.length; i++) {
              if(taskLevelTimeExpenseItems[i]["DELETED"] != "D")
              {
                
            	orderLevelTimeExpenseItems[totalLength] = taskLevelTimeExpenseItems[i];
                totalLength++;
              }
       		}
        	response["SegItemDetailsKA"] = orderLevelTimeExpenseItems;
            var configObj = scopeObj.getController().getConfig();
            var SummaryEntityController = scopeObj.getController().getApplicationContext().getModel("TaskMaterial", configObj.getObjectServiceName(), configObj.getObjectServiceOptions());
            var contextData = scopeObj.getController().getContextData();
            var workOrderId = contextData.getCustomInfo("woInfo").woID;
            var query = "Select Material.Description as ResourceDesc, Unit.Description as ResourceUnit, UnitConversion.Factor as ConversionFactor, TaskMaterial.RequestedQuantity,TaskMaterial.DELETED, Material.BasePrice as ResourceBasePrice from TaskMaterial join Unit on TaskMaterial.RequestedUnit_id = Unit.id join Material on TaskMaterial.Material_id = Material.id join UnitConversion on Material.id = UnitConversion.Material_id where UnitConversion.UnitFrom_Id = TaskMaterial.RequestedUnit_id and UnitConversion.UnitTo_id = Material.Unit_id and TaskMaterial.WorkOrder_Id = '" + workOrderId + "'";
			scopeObj.setFormModelInfo("WorkOrderId", workOrderId);
            SummaryEntityController.executeSelectQuery(query, dataSuccess, dataError);

            function dataSuccess(res) {
                var finalResponse = scopeObj.appendTEResources(response, res);
                scopeObj.getController().processData(finalResponse);
            }

            function dataError(err) {
                scopeObj.getController().processData(response);
            }

        }

        function error(err) {
            //Error fetching data
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },

    appendTEResources: function(TEdata, Resourcedata) {
        var orderLevelTEData = TEdata["SegItemDetailsKA"];
        var totalLength = orderLevelTEData.length;
        for (var i = 0; i < Resourcedata.length; i++, totalLength++) {
            orderLevelTEData[totalLength] = Resourcedata[i];
        }
        TEdata["SegItemDetailsKA"] = orderLevelTEData;
        return TEdata;
    },

    processData: function(data) {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            scopeObj.subTotal = 0;
            var formdata = data["SegItemDetailsKA"];
            scopeObj.segLength = formdata.length;
            for (var i = 0; i < formdata.length; i++) {
                if (formdata[i]["Type"] == 'TIME') {
                    formdata[i]['Amount'] = formdata[i]['Duration'] + " hrs";
                    scopeObj.subTotal = scopeObj.subTotal + ((parseInt(formdata[i]['Duration'])) * (parseInt(formdata[i]['BasePrice'])));
                } else if (formdata[i]["Type"] == 'EXPE') {
                    formdata[i]['Amount'] = parseFloat(formdata[i]['Amount']).toFixed(2) + " $";
                    scopeObj.subTotal = scopeObj.subTotal + (parseInt(formdata[i]['Amount']));
                } else {
                    formdata[i]['Description'] = formdata[i]['ResourceDesc'];
                    formdata[i]['Amount'] = "Qty - " + parseFloat(formdata[i]['RequestedQuantity']).toFixed(0) + " lbs";
                    formdata[i]['Amount'] = "Qty - " + parseFloat(formdata[i]['RequestedQuantity']).toFixed(0) + " " +formdata[i]['ResourceUnit'];
                    scopeObj.subTotal = scopeObj.subTotal + ((parseInt(formdata[i]['RequestedQuantity'])) * (parseInt(formdata[i]['ResourceBasePrice'])) * (parseInt(formdata[i]['ConversionFactor'])));
                }
            }
            data["SegItemDetailsKA"] = formdata;
            var processedData = scopeObj.$class.$superp.processData.call(scopeObj, data);
            scopeObj.setFormModelInfo("WorkOrderId", controller.getContextData().getCustomInfo("woInfo").woID);

            controller.bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },


    formatData: function(dataMap) {
        var timeFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("DAYANDTIME");
        dataMap["form"]["lblStartDateTimeKA"].setData(convertTimeZone(moment(dataMap["form"]["lblStartDateTimeKA"].getData(), kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, timeFormat));
        dataMap["form"]["lblEndDateTimeKA"].setData(convertTimeZone(moment(dataMap["form"]["lblEndDateTimeKA"].getData(), kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, timeFormat));
        return dataMap;
    },

    bindData: function(dataMap) {
        try {
            var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
            formmodel.clear();
            dataMap = scopeObj.formatData(dataMap);
            formmodel.setViewAttributeByProperty("lblItemKA", "text",kony.i18n.getLocalizedString("i18n.common.ItemsKA") +" " +parseInt(scopeObj.segLength).toFixed(0));
            formmodel.setViewAttributeByProperty("lblSubtotalKA", "text",  kony.i18n.getLocalizedString("i18n.common.SubtotalKA") +" " + parseFloat(scopeObj.subTotal).toFixed(2));
			formmodel.setViewAttributeByProperty("lblSubTotalValKA", "text", parseFloat(scopeObj.subTotal).toFixed(2) + "$");
            formmodel.setViewAttributeByProperty("lblEstimatedTotalValKA", "text", parseFloat(scopeObj.subTotal).toFixed(2) + "$");
            formmodel.setViewAttributeByProperty("tbxAmountKA", "text", "");
			formmodel.setViewAttributeByProperty("txtAreaNotesDescKA", "text", "");
            formmodel.setViewAttributeByProperty("lblDiscountValKA", "text", kony.servicesapp.DISCOUNTVALUE);
            scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formmodel.showView();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    generateInvoice: function() {
        try {
          	var scopeObj = this;
			var discount = null;
			scopeObj.discountCalculated = false;
          	if(scopeObj.discountCalculated === false)discount = scopeObj.calculateDiscount();
          	if(discount === false)return;
            if (kony.sdk.mvvm.isNetworkAvailabile()) {
                kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.common.GeneratingInvoiceKA"));
                scopeObj.updateWorkorder();
            } else {
                var utilitiesObj = utilities.getUtilityObj();
                var alertText = utilitiesObj.geti18nValueKA("i18n.common.Payment.NoNetworkAvailable");
                alert(alertText);
            }
        } catch (err) {
            var utilitiesObj = utilities.getUtilityObj();
            var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
            alert(alertText);
            kony.sdk.mvvm.log.error("==setSegData==>", err);
        }
    },

    createInvoice: function() {
        try {
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var formModel = scopeObj.getController().getFormModel();
            var configObj = scopeObj.getController().getConfig();
            var invEntityController = this.getController().getApplicationContext().getModel("Invoice", configObj.getObjectServiceName(), configObj.getObjectServiceOptions());
            var contextData = scopeObj.getController().getContextData();
            var workOrderId = contextData.getCustomInfo("woInfo").woID;
            var notes = formModel.getViewAttributeByProperty("txtAreaNotesDescKA", "text");
            var query = "select inv.id from Invoice inv WHERE inv.WorkOrder_id='" + workOrderId + "'";

            function dataSuccess(response) {
                var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                var InvoiceModelObject = INSTANCE.getModel("Invoice", kony.servicesapp.OE_OBJECT_SERVICE_NAME, kony.servicesapp.APP_OPTIONS);
                var invoiceDataObject = new kony.sdk.dto.DataObject("Invoice");
                var formModel = scopeObj.getController().getFormModel();
                var contextData = scopeObj.getController().getContextData();
                var invoiceRecord = {};
                invoiceRecord.WorkOrder_id = contextData.getCustomInfo("woInfo").woID;
                invoiceRecord.Notes = notes;
                if (response.length != 0) {
                    invoiceRecord.id = response[0]["id"];
                    invoiceDataObject.setRecord(invoiceRecord);
//                     InvoiceModelObject.update(invoiceDataObject, OnSuccess, OnError);
                    scopeObj.startSync(true, true, false, false);
                } else {
                    invoiceDataObject.setRecord(invoiceRecord);
                    InvoiceModelObject.create(invoiceDataObject, OnSuccess, OnError);
                }
            }

            function dataError(err) {
                var utilitiesObj = utilities.getUtilityObj();
                var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
                alert(alertText);

            }
            invEntityController.executeSelectQuery(query, dataSuccess, dataError);

            function OnSuccess(res) {
                scopeObj.startSync(true, false, false, true);
            }

            function OnError(err) {
                var utilitiesObj = utilities.getUtilityObj();
                var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
                alert(alertText);

            }
        } catch (err) {
            var utilitiesObj = utilities.getUtilityObj();
            var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
            alert(alertText);
            kony.sdk.mvvm.log.error("error in creating invoice", err);
        }
    },

    updateWorkorder: function() {
        try {
            var scopeObj = this;
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var WorkOrderModelObject = INSTANCE.getModel("WorkOrder", kony.servicesapp.OE_OBJECT_SERVICE_NAME, kony.servicesapp.APP_OPTIONS);;
            var workOrderDataObject = new kony.sdk.dto.DataObject("WorkOrder");
            var formModel = scopeObj.getController().getFormModel();
            var contextData = scopeObj.getController().getContextData();
            var workOrderRecord = {};
            var imageSelected = formModel.getViewAttributeByProperty("imgPercentSelectKA", "src");
            var discount = parseFloat(formModel.getViewAttributeByProperty("tbxAmountKA", "text"));
            if (imageSelected == "radiobuttonblank.png") {
                workOrderRecord.DiscountPercentage = "";
                workOrderRecord.DiscountAmount = discount;
            } else {
                workOrderRecord.DiscountAmount = "";
                workOrderRecord.DiscountPercentage = discount;
            }
            workOrderRecord.id = contextData.getCustomInfo("woInfo").woID;
            workOrderDataObject.setRecord(workOrderRecord);
            WorkOrderModelObject.update(workOrderDataObject, OnSuccess, OnError);

            function OnSuccess(res) {
                scopeObj.startSync(true, false, true, false);
            }

            function OnError(err) {
                var utilitiesObj = utilities.getUtilityObj();
                var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
                alert(alertText);

            }
        } catch (err) {
            var utilitiesObj = utilities.getUtilityObj();
            var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
            alert(alertText);
            kony.sdk.mvvm.log.error("error in updating workorder", err);
        }
    },

    startSync: function(uploadFlag, downloadFlag, invoiceFlag, syncFlag) {
        try {

            if (kony.servicesapp.IS_SYNC_IN_PROGRESS) {
                return;
            }
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.common.GeneratingInvoiceKA"));
			var scopeObj = this;
            kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
            kony.sdk.mvvm.log.info("==syncWorkOrderKA==>");
            kony.servicesapp.setSyncInProgressSkin();
            kony.servicesapp.SYNCENDPOINT = kony.servicesapp.SYNCSTARTPOINT + kony.servicesapp.SYNC_INCREMENT;
            kony.servicesapp.startSyncAnimation(kony.servicesapp.SYNCSTARTPOINT, kony.servicesapp.SYNCENDPOINT, 1);
            kony.servicesapp.IS_SYNC_IN_PROGRESS = true;
            var syncConfig = {
                "onsyncstart": function(outputparams) {
                    kony.servicesapp.onSyncStartCall(outputparams);
                },
                "onbatchprocessingsuccess": function(outputparams) {
                    kony.servicesapp.batchProcessSuccessCallBack(outputparams);
                },
                "onuploadsuccess": function(outputparams) {
                    kony.servicesapp.uploadSuccessCallBack(outputparams);
                },
                "sessiontasks": {
                    OESyncConfig: {
                        doupload: uploadFlag,
                        dodownload: downloadFlag,
                        uploaderrorpolicy: "continueonerror"
                    },
                    AvailableOrderSyncScope: {
                        doupload: false,
                        dodownload: false,
                        uploaderrorpolicy: "continueonerror"
                    },
                    GPSTrackingSyncScope: {
                        doupload: false,
                        dodownload: false,
                        uploaderrorpolicy: "continueonerror"
                    }
                },
                "batchsize": kony.servicesapp.LOGIN_BATCH_SIZE,
                "ondownloadstart": function(outputparams) {
                    var req = outputparams.downloadRequest;
                    if (req.clientcontext === undefined) {
                        req.clientcontext = {};
                    }
                    req.clientcontext.BATCH_TIMEOUT = kony.servicesapp.SYNC_BATCH_TIMEOUT;
                    outputparams.downloadRequest = req;
                }
            };
            var syncOptions = {
                "syncMetadata": false,
                "syncData": true,
                "syncConfig": syncConfig
            };
            var syncSuccCallBackKA = function(response) {
                //kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                kony.servicesapp.syncSuccessCallBackKA();

                if (invoiceFlag == true) {
                    scopeObj.createInvoice();
                } else if (syncFlag == true) {
                    scopeObj.startSync(true, true, false, false);
                } else {
                    scopeObj.checkForAttachment();
                }
            }
            var syncFailCallBackKA = function(response) {
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                var utilitiesObj = utilities.getUtilityObj();
                var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
                alert(alertText);
                kony.servicesapp.syncFailureCallBackKA();
            }
            kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getSyncManager().manualSync(syncOptions, syncSuccCallBackKA, syncFailCallBackKA);
        } catch (error) {
            var utilitiesObj = utilities.getUtilityObj();
            var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
            alert(alertText);
            kony.sdk.mvvm.log.error("==kony.servicesapp.syncWorkOrderKAOrdersKA==>" + error);
        }
    },

    checkForAttachment: function() {
        try {
            var scopeObj = this;
            var configObj = scopeObj.getController().getConfig();
            var invEntityController = scopeObj.getController().getApplicationContext().getModel("Invoice", configObj.getObjectServiceName(), configObj.getObjectServiceOptions());
            var contextData = scopeObj.getController().getContextData();
            var workOrderId = contextData.getCustomInfo("woInfo").woID;
            var query = "select inv.id from Invoice inv WHERE inv.WorkOrder_id='" + workOrderId + "'";
            var invoiceId = "";
            var Media_id = "";
            var successCallBack = function(response) {
                if (response.length != 0) {
                    invoiceId = response[0]["id"];
                    invEntityController = scopeObj.getController().getApplicationContext().getModel("InvoiceAttachment", configObj.getObjectServiceName(), configObj.getObjectServiceOptions());
                    var queryOfInv = "select Invoice_id, Media_id from InvoiceAttachment where Invoice_id = '" + invoiceId + "'";
                    var succCallBack = function(sucresponse) {
                        if (sucresponse.length != 0) {
                            Media_id = sucresponse[0]["Media_id"];
                            scopeObj.downloadAttachment(Media_id, invoiceId);
                        } else {
                            var utilitiesObj = utilities.getUtilityObj();
                            var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
                            alert(alertText);

                        }
                    }

                    function dataErr(err) {
                        alert("" + JSON.stringify(err));
                    }
                    invEntityController.executeSelectQuery(queryOfInv, succCallBack, dataErr);
                }
            }

            function dataError(err) {
                var utilitiesObj = utilities.getUtilityObj();
                var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
                alert(alertText);

            }
            invEntityController.executeSelectQuery(query, successCallBack, dataError);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in checking for attachment: " + err);
        }
    },

    downloadAttachment: function(fileName, invoiceId) {
        try {
            var scopeObj = this;
            scopeObj.fetchBinaryContent(fileName, succCallBack, errorCallBack);
          	scopeObj.setFormModelInfo("invID",invoiceId);

            function succCallBack(base64string) {
                var formModel = scopeObj.getController().getFormModel();
				var contextData = scopeObj.getController().getContextData();
                var workOrderId = contextData.getCustomInfo("woInfo").woID;
                scopeObj.setFormModelInfo("itemCount",scopeObj.segLength);
                var navigationObject = new kony.sdk.mvvm.NavigationObject();
                navigationObject.addCustomInfo("invInfo", {
                    "invID": invoiceId
                });
                navigationObject.addCustomInfo("itemsCount", scopeObj.segLength);
                navigationObject.setQueryParams("form", {
                    "x": invoiceId
                });
				navigationObject.setQueryParams("FlxEmailKA", {
                        "x": workOrderId
                });
              	scopeObj.setFormModelInfo(kony.servicesapp.ORDER_ATTACHMENT_FILE_NAME,fileName);
              	scopeObj.setFormModelInfo(kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE,base64string);
                navigationObject.addCustomInfo(kony.servicesapp.ORDER_ATTACHMENT_FILE_NAME, fileName);
                navigationObject.addCustomInfo(kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE, base64string);
                scopeObj.navigateTo("frmInvoicePdfKA", navigationObject);
            }

            function errorCallBack(err) {
                var utilitiesObj = utilities.getUtilityObj();
                var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
                alert(alertText);

            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in checking for attachment: " + err);
        }
    },

    fetchBinaryContent: function(binaryName, succCallBack, errorCallBack) {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var config = controller.getConfig();
            var objSvc = controller.getApplicationContext().getObjectService(config.getObjectServiceOptions(), config.getObjectServiceName());
            var dataObject = new kony.sdk.dto.DataObject(kony.servicesapp.ENTITY_MEDIA);
            dataObject.addField("name", binaryName);
            objSvc.getBinaryContent({
                "dataObject": dataObject,
                "binaryAttrName": kony.servicesapp.BINARY_CONTENT_ATTRIBUTE_NAME,
                "responsetype": kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE
            }, success, error);

            function success(binaryData) {
                succCallBack(binaryData);
            }

            function error(err) {
                errorCallBack(err);
                var utilitiesObj = utilities.getUtilityObj();
                var alertText = utilitiesObj.geti18nValueKA("i18n.common.InvoiceGenerationFailedKA");
                alert(alertText);
                kony.sdk.mvvm.log.error("error while downloading pdf from media entity");
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error while fetching binary content" + err.toString());
        }
    },

    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmCompleteOrderKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
    calculateDiscount: function() {
        try {
          	var scopeObj = this;
            var formModel = this.getController().getFormModel();
            var imageSelected = formModel.getViewAttributeByProperty("imgPercentSelectKA", "src");
            var temp = formModel.getViewAttributeByProperty("lblSubTotalValKA", "text");
            var subTotal = parseFloat(temp.slice(0, temp.indexOf('$')));
            var discount = parseFloat(formModel.getViewAttributeByProperty("tbxAmountKA", "text"));
            if (!discount) {
                discount = 0;
            }
            if (imageSelected == "radiobuttonblank.png") {
                //Calculating amount
                if (discount > subTotal) {
                  	formModel.setViewAttributeByProperty("tbxAmountKA", "text", "");
                    var utilitiesObj = utilities.getUtilityObj();
                    var alertText = utilitiesObj.geti18nValueKA("i18n.common.DiscountAmountAlertKA");
                    alert(alertText);
					scopeObj.calculateDiscount();
                    return false;
                }
              	
                var newTotal = (subTotal - discount);
                formModel.setViewAttributeByProperty("lblDiscountValKA", "text", parseFloat(discount).toFixed(2) + "$");
                formModel.setViewAttributeByProperty("lblSubtotalKA", "text",  kony.i18n.getLocalizedString("i18n.common.SubtotalKA") +" " + parseFloat(newTotal).toFixed(2));
                formModel.setViewAttributeByProperty("lblEstimatedTotalValKA", "text", parseFloat(newTotal).toFixed(2) + "$");
                scopeObj.discountCalculated = true;
                return true;
            } else {
                //Calculating Percentage
                if (discount > 100) {
                  	formModel.setViewAttributeByProperty("tbxAmountKA", "text", "");
                    var utilitiesObj = utilities.getUtilityObj();
                    var alertText = utilitiesObj.geti18nValueKA("i18n.common.DiscountPercentageAlertKA");
                    alert(alertText);
					scopeObj.calculateDiscount();
                    return false;
                }
                var discountVal = (discount * subTotal) / 100;
                var newTotal = subTotal - discountVal;
                formModel.setViewAttributeByProperty("lblDiscountValKA", "text", parseFloat(discountVal).toFixed(2) + "$");
                formModel.setViewAttributeByProperty("lblSubtotalKA", "text",  kony.i18n.getLocalizedString("i18n.common.SubtotalKA") +" " + parseFloat(newTotal).toFixed(2));
                formModel.setViewAttributeByProperty("lblEstimatedTotalValKA", "text", parseFloat(newTotal).toFixed(2) + "$");
              	scopeObj.discountCalculated = true;
				return true;
            }
        } catch (err) {
            alert("Error!!!!!!");
            kony.sdk.mvvm.log.error("error in Blogic calculateDiscount method : " + err);
        }

    }

});