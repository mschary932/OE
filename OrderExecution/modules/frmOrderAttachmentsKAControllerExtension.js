/** 
 *  In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmOrderAttachmentsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrderAttachmentsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },    
    fetchData: function() {
        try {
            var scopeObj = this;
            scopeObj.setFormModelInfo("WorkOrderId", scopeObj.getController().getContextData().getCustomInfo("WorkOrderId"));
            scopeObj.$class.$superp.fetchData.call(scopeObj, success, error);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        function success(response) {
            kony.sdk.mvvm.log.info("in successCallback of the attachment fetch");
            var obj = {};
            var binaryNameList = response["segOrderAttachmentKA"];
            var res = [];
            fetchStatusForEachBinary(0);
            function fetchStatusForEachBinary(indx){
				var binaryNameListLength = binaryNameList.length;
                if(indx >= binaryNameListLength){
                    var obj1 = {};
                  	scopeObj.recordsLength = binaryNameList.length;
                    obj1.attachmentInfo = response;
                    obj1.attachmentbinaryStatusInfo = res;
                    scopeObj.fetchBinaryImageData(obj1);
                    return;
                }
                var obj = {};
                obj["name"] = binaryNameList[indx][kony.servicesapp.BINARY_NAME];
                kony.sdk.getCurrentInstance().getSyncService().getStatusForBinary(kony.servicesapp.ENTITY_MEDIA, kony.servicesapp.BINARY_CONTENT_ATTRIBUTE_NAME, obj, statusSuccCallback, statusErrorCallback);
                function statusSuccCallback(statusResponse){
                    kony.sdk.mvvm.log.info("in succCallback of the status fetch"+binaryNameList[indx][kony.servicesapp.BINARY_NAME]);
                    res.push(statusResponse);
                    fetchStatusForEachBinary(++indx);
                }
                function statusErrorCallback(error){
                    kony.sdk.mvvm.log.info("in errorCallback of the status fetch"+JSON.stringify(error));
                    fetchStatusForEachBinary(++indx);
                }
            }
        }
        function error(err) {
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },    
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },    
    fetchBinaryImageData: function(obj) {
		try{
			var statusList = obj.attachmentbinaryStatusInfo;
			var attachmentData = [];
			var scopeObj = this;
			var attachmentCount = statusList.length;
			fetchImageData(0);
			function fetchImageData(indx){
				if(indx === attachmentCount){
					scopeObj.bindData(attachmentData,obj.attachmentInfo);
					return;
				}
				var StatusText = null;
				if (statusList[indx][kony.servicesapp.TASK_STATUS_CODE] === 0  || statusList[indx][kony.servicesapp.TASK_STATUS_CODE] === 63)
					StatusText = kony.servicesapp.TAP_TO_DOWNLOAD;

				var attachmentObj = {};
				attachmentObj.name = statusList[indx]["primaryKeys"]["name"];
				if(StatusText){             
					attachmentObj.statusImage = kony.servicesapp.ORDER_ATTACHMENT_AVAILABLE_IMAGE;
					attachmentObj.status = kony.servicesapp.ORDER_ATTACHMENT_STATUS_AVAILABLE_TEXT;
					attachmentObj.isDownloaded = false;
				} else{
					attachmentObj.statusImage = kony.servicesapp.ORDER_ATTACHMENT_ON_DEVICE_IMAGE;
					attachmentObj.status = kony.servicesapp.ORDER_ATTACHMENT_STATUS_DOWNLOADED;
					attachmentObj.isDownloaded = true;     
				}
				attachmentData.push(attachmentObj);
				fetchImageData(++indx);                   
			}
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic fetchBinaryImageData action : " + err);
        }        
    },
    bindData: function(attachmentData,attachmentInfo) {
        var scopeObj = this;
        try {
			var formmodel = scopeObj.getController().getFormModel();
			if(!attachmentInfo){
				TAG.NC.applyFormTransitions(formmodel.getView().getKonyForm());
				formmodel.showView();
				return;
			}
			var segData = attachmentInfo["segOrderAttachmentKA"];
			if(attachmentData){
				var attachmentCount = attachmentData.length;
				var processedSegData = [];
				var obj;
				for(var indx = 0;indx < attachmentCount; indx += 1){
					obj = {};
					obj[kony.servicesapp.BINARY_NAME] = attachmentData[indx]["name"];
					obj["primaryKeyVal"] = obj[kony.servicesapp.BINARY_NAME];
					obj["imgCloudKA"] = attachmentData[indx]["statusImage"];
					obj["imgDocpdfKA"] = kony.servicesapp.ORDER_ATTACHMENT_DOC_IMAGE;
					obj["lblStatusKA"] = attachmentData[indx]["status"];
					if(obj["lblStatusKA"] === kony.servicesapp.ORDER_ATTACHMENT_STATUS_DOWNLOADED)
						obj["btnDownloadKA"] =  {isVisible : false };
					else
						obj["btnDownloadKA"] =  {isVisible : true };
					obj["statusText"] = obj["lblStatusKA"];
					if(segData[indx]["createdts"])
						obj["createdts"] = convertTimeZone(moment(segData[indx]["createdts"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE"));
					processedSegData.push(obj);
				}
				var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segOrderAttachmentKA", "widgetDataMap");
				lclWidgetDataMap["imgCloudKA"] = "imgCloudKA";
				lclWidgetDataMap["imgDocpdfKA"] = "imgDocpdfKA";
				lclWidgetDataMap["lblStatusKA"] = "lblStatusKA";
				lclWidgetDataMap["btnDownloadKA"] = "btnDownloadKA";
				formmodel.setViewAttributeByProperty("segOrderAttachmentKA", "widgetDataMap", lclWidgetDataMap);
				var dataMap = {};
				dataMap["segOrderAttachmentKA"] = {};
				dataMap["segOrderAttachmentKA"]["segOrderAttachmentKA"] = processedSegData;           
				scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
			}
			TAG.NC.applyFormTransitions(formmodel.getView().getKonyForm());
			formmodel.showView();
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Bind Data : " + err);
        }      	
    },    
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, false, this.getFormModelInfo("previousForm"));
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },    
    clearData: function() {
        var formmodel = this.getController().getFormModel();
    },    
    openAttachment: function(){
        var scopeObj = this;
		try{
          	var formmodel = scopeObj.getController().getFormModel();
            var selRecord = formmodel.getViewAttributeByProperty("segOrderAttachmentKA", "selectedItems")[0];
            var fileName = selRecord.primaryKeyVal;
          	var date = selRecord["createdts"]; 
          	if(typeof date === "object")
             	date = date.text;
            var selectedRecords = formmodel.getViewAttributeByProperty("segOrderAttachmentKA", "selectedRowIndex");
            var status = selRecord["statusText"];
            if(status !== kony.servicesapp.ORDER_ATTACHMENT_STATUS_DOWNLOADED){
                var obj = {};
                obj[kony.servicesapp.BINARY_NAME] = fileName;
                obj["primaryKeyVal"] = fileName;
                obj["imgCloudKA"] = kony.servicesapp.ORDER_ATTACHMENT_DOWNLOADING_IMAGE;
                obj["imgDocpdfKA"] = kony.servicesapp.ORDER_ATTACHMENT_DOC_IMAGE;
                obj["lblStatusKA"] = kony.servicesapp.ORDER_ATTACHMENT_DOWNLOADING_TEXT;
                obj["statusText"] = kony.servicesapp.ORDER_ATTACHMENT_STATUS_AVAILABLE_TEXT;
              	obj["createdts"] = date;
              	obj["btnDownloadKA"] =  {isVisible : false };
                if(scopeObj.recordsLength >1)
                  formmodel.performActionOnView("segOrderAttachmentKA", "setDataAt",[obj,selectedRecords[1],0]);
                else 
                   formmodel.performActionOnView("segOrderAttachmentKA", "setData",[[obj]]);
            }
            scopeObj.fetchBinaryContent(fileName,succCallBack,errorCallBack);
            function succCallBack(base64string){
                if(status !== kony.servicesapp.ORDER_ATTACHMENT_STATUS_DOWNLOADED){
                    var obj = {};
                    obj[kony.servicesapp.BINARY_NAME] = fileName;
                    obj["primaryKeyVal"] = fileName;
                    obj["imgCloudKA"] = kony.servicesapp.ORDER_ATTACHMENT_ON_DEVICE_IMAGE;
                    obj["imgDocpdfKA"] = kony.servicesapp.ORDER_ATTACHMENT_DOC_IMAGE;
                    obj["lblStatusKA"] = kony.servicesapp.ORDER_ATTACHMENT_STATUS_DOWNLOADED;
                    obj["statusText"] = kony.servicesapp.ORDER_ATTACHMENT_STATUS_DOWNLOADED;
                  	obj["btnDownloadKA"] =  {isVisible : false };
                  	obj["createdts"] = date
                    if(scopeObj.recordsLength >1)
                    	formmodel.performActionOnView("segOrderAttachmentKA", "setDataAt",[obj,selectedRecords[1],0]);
               		else 
                      	formmodel.performActionOnView("segOrderAttachmentKA", "setData",[[obj]]);
                }
                if (kony.sdk.mvvm.Utils.getPlatformName() === kony.sdk.mvvm.Platforms["IPHONE"]){
                    kony.sdk.mvvm.log.info("in iphone succCallback after attachment fetch");
                    //  ios code
                    var navigationObject = new kony.sdk.mvvm.NavigationObject();
                    navigationObject.addCustomInfo(kony.servicesapp.ORDER_ATTACHMENT_FILE_NAME,fileName);
                    navigationObject.addCustomInfo(kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE,base64string);
                    scopeObj.navigateTo("frmOrderAttachmentBrowserKA", navigationObject);
                }else if(kony.sdk.mvvm.Platforms["ANDROID"]){
                    kony.sdk.mvvm.log.info("in Android succCallback after attachment fetch");
                    ViewFiles.viewfile(base64string,kony.servicesapp.CONFIG_MIME_TYPE_PDF,fileName,FileDatacallback);
					function FileDatacallback(){
                      kony.sdk.mvvm.log.info("created successfully");
                    }
                }
            }
            function errorCallBack(err){
                if(status !== kony.servicesapp.ORDER_ATTACHMENT_STATUS_DOWNLOADED){
                    var obj = {};
                    obj[kony.servicesapp.BINARY_NAME] = fileName;
                    obj["primaryKeyVal"] = fileName;
                    obj["imgCloudKA"] = kony.servicesapp.ORDER_ATTACHMENT_MISSING_IMAGE;
                    obj["imgDocpdfKA"] = kony.servicesapp.ORDER_ATTACHMENT_DOC_IMAGE;
                    obj["lblStatusKA"] = kony.servicesapp.ORDER_ATTACHMENT_STATUS_FAILED;
                    obj["statusText"] = kony.servicesapp.ORDER_ATTACHMENT_STATUS_FAILED;
                  	obj["btnDownloadKA"] =  {isVisible : true };
                  	obj["createdts"] = date;
                    if(scopeObj.recordsLength >1)
                    	formmodel.performActionOnView("segOrderAttachmentKA", "setDataAt",[obj,selectedRecords[1],0]);
               		else 
                      	formmodel.performActionOnView("segOrderAttachmentKA", "setData",[[obj]]);
                }
                kony.sdk.mvvm.log.error("error while opening pdf attachment ");
            }
        }catch(err){
            kony.sdk.mvvm.log.error("error while downloading image from media entity"+err.toString());
        }
    },
    fetchBinaryContent: function(binaryName,succCallBack,errorCallBack){
		try{
			var scopeObj = this;
			var controller = scopeObj.getController();
			var config = controller.getConfig();
			var objSvc = controller.getApplicationContext().getObjectService(config.getObjectServiceOptions(), config.getObjectServiceName());
			var dataObject = new kony.sdk.dto.DataObject(kony.servicesapp.ENTITY_MEDIA);
			dataObject.addField("name", binaryName);
			objSvc.getBinaryContent({
				"dataObject": dataObject,
				"binaryAttrName": kony.servicesapp.BINARY_CONTENT_ATTRIBUTE_NAME,
				"responsetype":kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE
			}, success, error);
			function success(binaryData) {
				succCallBack(binaryData);
			}
			function error(err) {
				errorCallBack(err);
				kony.sdk.mvvm.log.error("error while downloading image from media entity");
			}
		}catch(err){
			kony.sdk.mvvm.log.error("error while fetching binary content"+err.toString());
		}
    }
});
