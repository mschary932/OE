/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmCompleteImagesKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmCompleteImagesKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },    
    fetchData: function() {
        try {
            kony.sync.currentLogLevel = kony.sync.log.TRACE;
            var scopeObj = this;
            var contextData = scopeObj.getController().getContextData();
            scopeObj.setFormModelInfo("WorkOrderId", contextData.getCustomInfo("WorkOrderId"));			
			function getImageFromCamera(camID){
				try{						
					scopeObj.updateBinaryContent(kony.convertToBase64(camID.rawBytes));
					camID.releaseRawBytes(camID.rawBytes);					
				}catch(err){
					kony.sdk.mvvm.log.error("error in Blogic getImageFromCamera action : " + err);
				}
			}			
			frmCompleteImagesKA.cameraTakePictureKA.onCapture = getImageFromCamera;
            scopeObj.$class.$superp.fetchData.call(scopeObj, success, error);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension"+err.toString());
        }
        function success(response) {
            kony.sdk.mvvm.log.info("in successCallback of the attachment fetch");
            var obj = {};
            var sdkInstance = kony.sdk.getCurrentInstance();
          	var syncClient = sdkInstance.getSyncService(); 
            var binaryNameList = response["segImagesListKA"];
            var res = [];
			var desc = [];
            fetchStatusForEachBinary(0);
            function fetchStatusForEachBinary(indx){
                if(indx >= binaryNameList.length){
                    scopeObj.fetchBinaryImageData(res, desc);
                    return;
                }
                var obj = {};
                obj["name"] = binaryNameList[indx]["BINARY_NAME"];
				var objDesc = binaryNameList[indx]["Description"];
				if(objDesc){
					desc.push(objDesc);
				}else{
					desc.push("");
				}				
                syncClient.getStatusForBinary("media", "url", obj, statusSuccCallback, statusErrorCallback);
                function statusSuccCallback(statusResponse){
                    kony.sdk.mvvm.log.info("in succCallback of the status fetch"+binaryNameList[indx]["BINARY_NAME"]);
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
            kony.sdk.mvvm.log.info("In fetchData errorcallback in controller extension "+JSON.stringify(err));
        }
    },    
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },    
    fetchBinaryImageData: function(statusList, desc) {
		try {
            var attachmentData = [];
			var scopeObj = this;
			if(statusList === null || statusList === undefined){
				scopeObj.bindData(attachmentData);
				return;
			}
			var attachmentCount = statusList.length;
			fetchImageData(0);
			function fetchImageData(indx){
				if(indx === statusList.length){
					scopeObj.bindData(attachmentData);
					return;
				}
				var StatusText = null;
				if (statusList[indx]["statusCode"] === 0) {
					StatusText = "Tap to Download";
				}
				var attachmentObj = {};
				attachmentObj.name = statusList[indx]["primaryKeys"]["name"];
				attachmentObj.desc = desc[indx];
				if(StatusText){				
					attachmentObj.src = "tap_to_download.png";
					attachmentObj.status = StatusText;
					attachmentObj.isDownloaded = false;				
					attachmentData.push(attachmentObj);
					fetchImageData(++indx);
				} else{
					kony.sdk.mvvm.log.info("before calling fetchBinaryContent function");
					scopeObj.fetchBinaryContent(statusList[indx]["primaryKeys"]["name"],success,error);
					function success(binaryData) {
						kony.sdk.mvvm.log.info("in successCallback of the fetchBinaryContent function");
						var fileobject = new kony.io.File(binaryData);
						var rawbytes = fileobject.read();
						var reqHeight = 227;
						var reqWidth = 230;
						var imageObject = kony.image.createImage(rawbytes);
						var width = imageObject.getImageWidth();
						var height = imageObject.getImageHeight();
						var inSampleSize = 1;
						if (height > reqHeight || width > reqWidth) {
							var halfHeight = height / 2;
							var halfWidth = width / 2;
							// Calculate the largest inSampleSize value that is a power of 2 and keeps both
							// height and width larger than the requested height and width.
							while ((halfHeight / inSampleSize) > reqHeight && (halfWidth / inSampleSize) > reqWidth) {
								inSampleSize *= 2;
							}
						}
						attachmentObj.rawBytes = rawbytes;
						attachmentObj.status = "";
						var finalSample = 1/inSampleSize;
						attachmentObj.scale = finalSample;
						attachmentObj.isDownloaded = true;
						attachmentData.push(attachmentObj);
						fetchImageData(++indx);
					}
					function error(err) {
						kony.sdk.mvvm.log.info("in errorcallback of the fetchBinaryContent function");
						attachmentObj.src = "try_again.png";
						attachmentObj.status = "Downloading failed";
						attachmentObj.isDownloaded = false;
						attachmentData.push(attachmentObj);
						fetchImageData(++indx);
					}				
				}                   
			}
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }      	
	},
    bindData: function(attachmentData) {		
		try {
            var scopeObj = this;     	
			var formmodel = scopeObj.getController().getFormModel();		
			if(attachmentData === null || attachmentData === undefined || attachmentData.length == 0){
				var konyform = formmodel.getView().getKonyForm();
				TAG.NC.applyFormTransitions(konyform);			
				formmodel.setViewAttributeByProperty("flxBodyKA", "isVisible", true);
				formmodel.setViewAttributeByProperty("flxListKA", "isVisible", false);
				formmodel.showView();
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				return;
			}
			formmodel.setViewAttributeByProperty("flxBodyKA", "isVisible", false);
			formmodel.setViewAttributeByProperty("flxListKA", "isVisible", true);
			var attachmentCount = attachmentData.length;
			var flexContainer = null;
			var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segImagesListKA", "widgetDataMap");
			lclWidgetDataMap["lblCompleteOrderKA"] = "lblCompleteOrderKA";
			lclWidgetDataMap["ImgCompleteOrderKA"] = "ImgCompleteOrderKA";
			formmodel.setViewAttributeByProperty("segImagesListKA", "widgetDataMap", lclWidgetDataMap);
			var segData = [];
			formmodel.setViewAttributeByProperty("segImagesListKA", "data", segData);
			for(var indx = 0;indx < attachmentCount; indx += 1){
				var attachmentObj = attachmentData[indx];
				var imgObj = {};				
				if(attachmentObj.isDownloaded){
					var imageobject = kony.image.createImage(attachmentObj.rawBytes);
					imageobject.scale(attachmentObj.scale);               
					imgObj = {"rawBytes" : attachmentObj.rawBytes };
				}else{
					imgObj = {"src" : attachmentObj.src};
				}
				segData.push({"lblCompleteOrderKA" : "Name : "  + attachmentObj.desc, "ImgCompleteOrderKA" : imgObj});			 
			}		
			formmodel.setViewAttributeByProperty("segImagesListKA", "data", segData);
			formmodel.showView();
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, false, "frmCompleteOrderKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
    fetchBinaryContent: function(binaryName,succCallBack,errorCallBack){
    	var scopeObj = this;
    	var configOptions = scopeObj.getController().getConfig().getObjectServiceOptions();
        var serviceName = scopeObj.getController().getConfig().getObjectServiceName();
        var objSvc = scopeObj.getController().getApplicationContext().getObjectService(configOptions, serviceName);
        var dataObject = new kony.sdk.dto.DataObject("media");
        dataObject.addField("name", binaryName);
        objSvc.getBinaryContent({
            "dataObject": dataObject,
            "binaryAttrName": "url"
        }, success, error);
        function success(binaryData) {
            succCallBack(binaryData);
        }
        function error(err) {
            errorCallBack(err);
            kony.sdk.mvvm.log.error("error fetchBinaryContent while downloading image from media entity");
        }
    },	
	updateBinaryContent: function(base64Image){
		try{
			var utilitiesObj  = utilities.getUtilityObj();
			showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
			var scopeObj = this;
			var configOptions = scopeObj.getController().getConfig().getObjectServiceOptions();
			var serviceName = scopeObj.getController().getConfig().getObjectServiceName();
			var objSvc = scopeObj.getController().getApplicationContext().getObjectService(configOptions, serviceName);
			var dataObject = new kony.sdk.dto.DataObject("media");
			var headers = {};
			dataObject.addField("type", "GRAPHICS");
			dataObject.addField("extension", "JPG");
			dataObject.addField("ondemand","true");
			dataObject.addField("description", "Complete Order Images");
			dataObject.addField("url",base64Image);			
			var options = {"dataObject":dataObject, "headers":headers};
			objSvc.create(options,function(response){   
				var media_name = response["name"];
				var objHandler = kony.sdk.mvvm.persistent.Record;
				var recordObject = new objHandler("EAM_WO_ATTACHMENT");
				var seq = Math.floor((Math.random() * 1000));
				recordObject.set("SEQUENCE", seq + "");
				recordObject.set("BINARY_NAME", media_name);
				recordObject.set("EXTENSION", "JPG");
				recordObject.set("ATTACH_DESC", "Complete Order Images");
				recordObject.set("ORDER_NUM", scopeObj.getFormModelInfo("WorkOrderId"));
				var configObj = scopeObj.getController().getConfig();
				recordObject.setInfo("serviceName", configObj.getObjectServiceName());
				recordObject.setInfo("options", configObj.getObjectServiceOptions());
				recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);			
				var onSuccess = function(){
					scopeObj.fetchData();
					kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				}
				var onError = function(error){
					 alert("Failed to create record : " +JSON.stringify(error));
					 kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				}				
				scopeObj.saveRecord(recordObject, onSuccess, onError);
			},function(error){
				alert("Failed to update binary metadata : " +JSON.stringify(error));
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			});
		}catch(err){
			kony.sdk.mvvm.log.error("error in Blogic updateBinaryContent action : " + err);
		}
    },	
	getImageFromGallery :function(){
		try{
			var scopeObj = this;
			var asingImageFromGalery = 	function(rawbytes){
				if(rawbytes) {
					scopeObj.updateBinaryContent(kony.convertToBase64(rawbytes));				 
				}
			};
			var querycontext = {mimetype:"image/*"};
			kony.phone.openMediaGallery(asingImageFromGalery,querycontext);
		}catch(err){
			kony.sdk.mvvm.log.error("error in Blogic getImageFromGallery action : " + err);
		}
   }
});