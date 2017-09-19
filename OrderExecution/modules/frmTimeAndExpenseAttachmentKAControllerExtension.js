/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmTimeAndExpenseAttachmentKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmTimeAndExpenseAttachmentKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {

    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },
    
    fetchData: function() {
        try {
       		var formmodel = this.getController().getFormModel();
            var scopeObj = this;
          	var groupWidgetsList=[];
            var contextData = scopeObj.getController().getContextData();
          	if(contextData.getCustomInfo("formValue") == "WorkOrderTimeExpense" || contextData.getCustomInfo("formValue") == "CompleteOrder"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmTimeAndExpenseAttachmentKAConfig,"form","TimeExpenseAttachment","select TimeExpenseAttachment.BINARY_NAME FROM TimeExpenseAttachment LEFT JOIN media ON TimeExpenseAttachment.BINARY_NAME = media.name  WHERE  LOWER(TimeExpenseAttachment.DOC_TYPE) != 'signature' AND TimeExpenseAttachment.ORDER_NUM = '{x}'  and  (LOWER(TimeExpenseAttachment.EXTENSION) = 'png'  OR LOWER(TimeExpenseAttachment.EXTENSION) = 'jpeg' OR LOWER(TimeExpenseAttachment.EXTENSION) = 'jpg')");
                groupWidgetsList=scopeObj.refreshEntityOfWidgets("TimeExpenseAttachment");
            }
            else if(contextData.getCustomInfo("formValue") == "Task"){
                scopeObj.$class.$superp.refreshFormConfig.call(scopeObj, frmTimeAndExpenseAttachmentKAConfig,"form","TaskTimeExpenseAttachments","select TaskTimeExpenseAttachments.BINARY_NAME FROM TaskTimeExpenseAttachments LEFT JOIN media ON TaskTimeExpenseAttachments.BINARY_NAME = media.name  WHERE  LOWER(TaskTimeExpenseAttachments.DOC_TYPE) != 'signature' AND TaskTimeExpenseAttachments.ORDER_NUM = '{x}'  and  (LOWER(TaskTimeExpenseAttachments.EXTENSION) = 'png'  OR LOWER(TaskTimeExpenseAttachments.EXTENSION) = 'jpeg' OR LOWER(TaskTimeExpenseAttachments.EXTENSION) = 'jpg')");
                groupWidgetsList=scopeObj.refreshEntityOfWidgets("TaskTimeExpenseAttachments");
            }

          	function getImageFromCamera(camID){
				scopeObj.addImageToFlex(camID.rawBytes);
				//camID.releaseRawBytes(camID.rawBytes);
			}
			frmTimeAndExpenseAttachmentKA.cameraTakePictureKA.compressionLevel = kony.servicesapp.COMPRESSION_VAL;
            frmTimeAndExpenseAttachmentKA.cameraTakePictureKA.onCapture = getImageFromCamera;
          	kony.sync.currentLogLevel = kony.sync.log.TRACE;
            this.setFormModelInfo("TimeExpenseID", contextData.getCustomInfo("TimeExpenseID"));
            this.setFormModelInfo("recordID", contextData.getCustomInfo("recordID"));
			kony.print("bbb11@"+contextData.getCustomInfo("TimeExpenseID"))	;
           if(groupWidgetsList && groupWidgetsList.length)
                this.$class.$superp.fetchData.call(this, success, error);
            else
                scopeObj.fetchData();                            
           
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension"+err.toString());
            //var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
           // kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("in successCallback of the attachment fetch");
            var obj = {};
            var sdkInstance = kony.sdk.getCurrentInstance();
          	var syncClient = sdkInstance.getSyncService(); 
            var binaryNameList = response["form"];
            var res = [];
            fetchStatusForEachBinary(0);

            function fetchStatusForEachBinary(indx){
                if(indx >= binaryNameList.length){
                  	scopeObj.setFormModelInfo("attachmentCount", binaryNameList.length);
                    scopeObj.fetchBinaryImageData(res,binaryNameList);
                    return;
                }
                var obj = {};
                obj["name"] = binaryNameList[indx]["BINARY_NAME"];
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
            //var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            //kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },

    refreshEntityOfWidgets:function(entity)
    {
        var scopeObj=this;
        var widgetList=scopeObj.getController().getConfig().getWidgets();
        for (eachWidget in widgetList)
        {
            frmTimeAndExpenseAttachmentKAConfig[eachWidget]["fieldprops"]["entity"]=entity
        }
        var groupContext = scopeObj.getBaseFormControllerExtensionObj().createGroupWidgetsContext();
        var groupWidgets = groupContext.getFetchWidgetList() || [];
       	return groupWidgets;
    },
    
    fetchBinaryImageData: function(statusList,binaryNameList) {
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
	},

    bindData: function(attachmentData) {
        var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
		var scopeObj = this;
     	scopeObj.clearData();
      	var formmodel = this.getController().getFormModel();
      	if(attachmentData === null || attachmentData === undefined){
            var konyform = formmodel.getView().getKonyForm();
            TAG.NC.applyFormTransitions(konyform);
			formmodel.showView();
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
          	return;
		}
        var attachmentCount = attachmentData.length;
        var flexRowContainer = null;
      	for(var indx = 0;indx < attachmentCount; indx += 1){
      		var attachmentObj = attachmentData[indx];
      		if (indx % 3 == 0) {
                flexRowContainer = new kony.ui.FlexContainer({
                    "id": "flexRowContainer" + Math.floor(indx/3),
                    "top": "2%",
                    "left": "0%",
                    "width": "100%",
                    "height": "17%",
                    "layoutType": kony.flex.FLOW_HORIZONTAL
                }, {}, {});
                formmodel.performActionOnView("flxScrollOuterKA", "add",[flexRowContainer]);
            }

            var childFlexContainer = new kony.ui.FlexContainer({
                "id": "flexContainer" + indx,
                "top": "0%",
                "left": "3%",
                "width": "30%",
                "height": "100%",
                "layoutType": kony.flex.FLOW_VERTICAL,
                "skin": "sknFlx8799ABTrans70KA"
            }, {}, {});       
            
			var imageIdTest = null;

			if(attachmentObj.isDownloaded){
				imageIdTest = new kony.ui.Image2({
					"id": "binaryImage" + indx,
					"width": "100%",
					"height": "100%"
				}, {}, {});	
                var imageobject = kony.image.createImage(attachmentObj.rawBytes);
                imageobject.scale(attachmentObj.scale);
                imageIdTest.image = imageobject;
                childFlexContainer.skin = "sknFlexDefaultKA";
			}else{
				imageIdTest = new kony.ui.Image2({
					"id": "binaryImage" + indx,
					"top": "8.1%",
					"width": "22dp",
					"left": "35%",
					"height": "22dp",
					"src": attachmentObj.src
				}, {}, {});	
			}
			var hidnLabel = new kony.ui.Label({
                "id": "lblBinaryName" + indx,
                "top": "32.4%",
                "width": "38.29%",
                "height": "15%",
                "centerX": "50%",
                "centerY": "36%",
                "isVisible": false,
                "skin": "sknLbl5E5050ClanProBook16KA",
                "text": attachmentObj.name            
            }, {}, {});
          
            formmodel.performActionOnView(flexRowContainer.id, "add",[childFlexContainer]);
            
            if(attachmentObj.status){
                var lblStatus = new kony.ui.Label({
                    "id": "lblStatus" + indx,
                    "top": "20%",
                    "width": "65%",
                    "height": "32.5%",
                    "left": "20%",
                    "skin": "sknLbl5E5050ClanProBook16KA",
                    "text": attachmentObj.status             
                }, {}, {});
			    formmodel.performActionOnView(childFlexContainer.id, "add",[lblStatus]);
            }else{
				var lblStatus = new kony.ui.Label({
                    "id": "lblStatus" + indx,
                    "top": "20%",
                    "width": "65%",
                    "height": "32.5%",
                    "left": "20%",
                    "isVisible": false,
                    "skin": "sknLbl5E5050ClanProBook16KA",
                    "text": attachmentObj.status             
                }, {}, {});
			    formmodel.performActionOnView(childFlexContainer.id, "add",[lblStatus]);
            }
			formmodel.performActionOnView(childFlexContainer.id, "add",[hidnLabel]);
            formmodel.performActionOnView(childFlexContainer.id, "add",[imageIdTest]);
			var gestureConfig = {
                fingers: 1,
                taps: 1
            };
            formmodel.performActionOnView(childFlexContainer.id, "addGestureRecognizer", [1, gestureConfig, gestureCallBack]);
      	}
      	formmodel.performActionOnView("flxScrollOuterKA", "forceLayout");
        var konyform = formmodel.getView().getKonyForm();
        TAG.NC.applyFormTransitions(konyform);
        formmodel.showView();
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

        function gestureCallBack(myWidget, gestureInfo) {
            var flexId = myWidget.id;
            var index = flexId.replace("flexContainer", '');
            var lblStatus = "lblStatus" + index;
            var lblBinaryName = "lblBinaryName" + index;
            var binaryName = formmodel.getViewAttributeByProperty(lblBinaryName, "text");
            var binaryImageName = "binaryImage" + index;
            var status = formmodel.getViewAttributeByProperty(lblStatus, "text");
            if (status !== null && status !== undefined && status.length !== 0) {             
                var img = "cancel_with_downloading.png";
                formmodel.setViewAttributeByProperty(binaryImageName, "src", img);
                formmodel.setViewAttributeByProperty(lblStatus, "text", "Downloading...");
                formmodel.setViewAttributeByProperty(lblStatus, "left", "20%");
				formmodel.performActionOnView(flexId, "forceLayout");
				scopeObj.fetchBinaryContent(binaryName,success,error);               

                function success(binaryData) {
                  	if (binaryData == null || binaryData == undefined || !binaryData || binaryData.length == 0){
                     	error();
                      	var utilitiesObj = utilities.getUtilityObj();
                		var msg = utilitiesObj.geti18nValueKA("i18n.common.imageNotAvailable");
                      	alert(msg);                     	
                      	return;
                    }
                    kony.sdk.mvvm.log.info("in successCallback of the image fetch");
                    var fileobject = new kony.io.File(binaryData);
                    var rawbytes = fileobject.read();
                    var imageObject = kony.image.createImage(rawbytes);
                  	var reqHeight = 227;
                    var reqWidth = 230;
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
                  	var scale = 1/inSampleSize;
                    imageObject.scale(scale);
                    formmodel.setViewAttributeByProperty(flexId, "skin", sknFlexDefaultKA);
                    formmodel.setViewAttributeByProperty(binaryImageName, "image", imageObject);
                    formmodel.setViewAttributeByProperty(binaryImageName, "width", "100%");
					formmodel.setViewAttributeByProperty(binaryImageName, "height", "100%");
					formmodel.setViewAttributeByProperty(binaryImageName, "left", "0%");
					formmodel.setViewAttributeByProperty(binaryImageName, "top", "0%");
                    formmodel.setViewAttributeByProperty(lblStatus, "text", null);					
                    formmodel.setViewAttributeByProperty(lblStatus, "isVisible", false);
					formmodel.performActionOnView(flexId, "forceLayout");
                }

                function error(err) {
                    kony.sdk.mvvm.log.info("in errorcallback of the image fetch");
                    var img = "try_again.png";
                    var lblStatus = "lblStatus" + index;
                    formmodel.setViewAttributeByProperty(binaryImageName, "src", img);
                    formmodel.setViewAttributeByProperty(lblStatus, "text", "Downloading failed");
					formmodel.performActionOnView(flexId, "forceLayout");
                    kony.sdk.mvvm.log.error("error while downloading image from media entity");
                }
            } else{
                var navigationObject = new kony.sdk.mvvm.NavigationObject();
                var url = formmodel.getViewAttributeByProperty(binaryImageName, "src");
                navigationObject.setQueryParams({"x":binaryName});                
                scopeObj.navigateTo("frmTimeAndExpenseAttachmentImageKA", navigationObject);
            }
        }
    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmExpenseDetailsKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
    
    clearData: function() {
		var formmodel = this.getController().getFormModel();
        formmodel.performActionOnView("flxScrollOuterKA", "removeAll");
        formmodel.performActionOnView("flxScrollOuterKA", "forceLayout");
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
            kony.sdk.mvvm.log.error("error while downloading image from media entity");
        }
    },
  
  	updateBinaryContent: function(base64Image,successCallback,errorCallback){
		try{
			//var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			//var scopeObj = INSTANCE.getFormController("frmCompleteImagesKA").getControllerExtensionObject();
			var utilitiesObj  = utilities.getUtilityObj();
			var scopeObj = this;
			var configOptions = scopeObj.getController().getConfig().getObjectServiceOptions();
			var serviceName = scopeObj.getController().getConfig().getObjectServiceName();
			var objSvc = scopeObj.getController().getApplicationContext().getObjectService(configOptions, serviceName);
			var dataObject = new kony.sdk.dto.DataObject("media");
			var headers = {};
			dataObject.addField("type", "GRAPHICS");
			dataObject.addField("extension", "JPG");
			dataObject.addField("ondemand","true");
			dataObject.addField("description", "Image Preview");
			dataObject.addField("url",base64Image);
			
			var options = {"dataObject":dataObject, "headers":headers};
			objSvc.create(options,function(response){   
              var media_name = response["name"];
              var objHandler = kony.sdk.mvvm.persistent.Record;
			  var recordObject = "";
              var contextData = scopeObj.getController().getContextData();
              if(contextData.getCustomInfo("formValue") == "WorkOrderTimeExpense" || contextData.getCustomInfo("formValue") == "CompleteOrder"){
                recordObject = new objHandler("TimeExpenseAttachment");
                recordObject.set("WorkOrder_id",scopeObj.getFormModelInfo("recordID"));
              }
              else if(contextData.getCustomInfo("formValue") == "Task"){
                var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                var frmOrderExecutionControllerExecution = appContext.getFormController(kony.servicesapp.FRMORDEREXECUTIONKA).getControllerExtensionObject();
                recordObject = new objHandler("TaskTimeExpenseAttachments");
                recordObject.set("OPERATION",scopeObj.getFormModelInfo("recordID"));
                recordObject.set("WorkOrder_id",frmOrderExecutionControllerExecution.getFormModelInfo("WorkOrderId"));
              }        			  
              var seq = Math.floor((Math.random() * 1000));
              recordObject.set("SEQUENCE", seq + "");
              recordObject.set("DOC_TYPE", "");
              recordObject.set("BINARY_NAME", media_name);
              recordObject.set("EXTENSION", "JPG");
              recordObject.set("ATTACH_DESC", "Image Preview");             
              recordObject.set("ORDER_NUM", scopeObj.getFormModelInfo("TimeExpenseID"));
              var configObj = scopeObj.getController().getConfig();
              recordObject.setInfo("serviceName", configObj.getObjectServiceName());
              recordObject.setInfo("options", configObj.getObjectServiceOptions());
              recordObject.setInfo("operation", kony.sdk.mvvm.OperationType.ADD);

              var onSuccess = function(response1){
                	successCallback(response)
              }
              var onError = function(error){
                kony.print("****yyy"+JSON.stringify(error))
                	errorCallback(error)
              }

              scopeObj.saveRecord(recordObject, onSuccess, onError);


            },function(error){
                errorCallback(error);
            });
		}catch(err){
			kony.sdk.mvvm.log.error("error in Blogic updateBinaryContent action : " + err);
		}
    },
	
	getImageFromGallery :function(){
		try{
			var scopeObj = this;
			var asingImageFromGalery = 	function(rawbytes){
              scopeObj.addImageToFlex(rawbytes);                  
			};
			var querycontext = {mimetype:"image/*"};
			kony.phone.openMediaGallery(asingImageFromGalery,querycontext);
		}catch(err){
			kony.sdk.mvvm.log.error("error in Blogic getImageFromGallery action : " + err);
		}
   },
  	addImageToFlex: function(rawBytes){   
      	if ((rawBytes) == null || rawBytes == undefined || !rawBytes)
          return;
  		try{  	
	      	var scopeObj = this;
	      	var indx = scopeObj.getFormModelInfo("attachmentCount");
	      	var formmodel = this.getController().getFormModel();
	        var flexRowContainer = null;
	      	var flexRowContainerId = "flexRowContainer" +  Math.floor(indx/3);

	        if (indx % 3 == 0) {
	            flexRowContainer = new kony.ui.FlexContainer({
	              "id": flexRowContainerId,
	              "top": "2%",
	              "left": "0%",
	              "width": "100%",
	              "height": "17%",
	              "layoutType": kony.flex.FLOW_HORIZONTAL
	            }, {}, {});
	            formmodel.performActionOnView("flxScrollOuterKA", "add",[flexRowContainer]);
	        }

	        var childFlexContainer = new kony.ui.FlexContainer({
	            "id": "flexContainer" + indx,
	            "top": "0%",
	            "left": "3%",
	            "width": "30%",
	            "height": "100%",
	            "layoutType": kony.flex.FREE_FORM,
	            "skin": "sknFlexDefaultKA"
	        }, {}, {});  
		    
	    	var hidnLabel = new kony.ui.Label({
	            "id": "lblBinaryName"+indx,
	            "top": "32.4%",
	            "width": "38.29%",
	            "height": "15%",
	            "centerX": "50%",
	            "centerY": "36%",
	            "isVisible": false,
	            "skin": "sknLbl5E5050ClanProBook16KA"          
	        }, {}, {});
				
	        var imageId = new kony.ui.Image2({
	          	"id": "binaryImage" + indx,
				"width": "100%",
				"height": "100%"
	        }, {}, {});	

	        var tempImage = new kony.ui.Image2({
	          	"id": "binaryTempImage" + indx,
				"top": "60%",
                "width": "22dp",
                "left": "35%",
                "height": "22dp",
             	"zIndex":5,
				"src": "cancel_with_downloading.png"
	        }, {}, {});	

	        var lblStatus = new kony.ui.Label({
                "id": "lblStatus" + indx,
                "top": "20%",
                "width": "65%",
                "height": "32.5%",
                "left": "20%",
              	"zIndex":5,
                "skin": "sknLbl5E5050ClanProBook16KA",
                "text": "Uploading ..."             
            }, {}, {});
          
          	
          	
            formmodel.performActionOnView(flexRowContainerId, "add",[childFlexContainer]); 
		    formmodel.performActionOnView(childFlexContainer.id, "add",[lblStatus]);
	        var imageobject = kony.image.createImage(rawBytes);	               
			formmodel.performActionOnView(childFlexContainer.id, "add",[hidnLabel]);
	        formmodel.performActionOnView(childFlexContainer.id, "add",[imageId]);
	        formmodel.performActionOnView(childFlexContainer.id, "add",[tempImage]);
	      	formmodel.performActionOnView("flxScrollOuterKA", "forceLayout");
	      	scopeObj.setFormModelInfo("attachmentCount",indx+1);

	        scopeObj.updateBinaryContent(kony.convertToBase64(rawBytes),success,error); 
                 
            function success(response){
            	var gestureConfig = {
		            fingers: 1,
		            taps: 1
		        };
		        var binaryName = "lblBinaryName"+indx;
		        formmodel.setViewAttributeByProperty(binaryName,"text",response["name"]);
		        formmodel.performActionOnView(childFlexContainer.id, "addGestureRecognizer", [1, gestureConfig, gestureCallBack]);
                formmodel.setViewAttributeByProperty(lblStatus.id, "text", null);
                formmodel.setViewAttributeByProperty(tempImage.id, "isVisible", false);					
                formmodel.setViewAttributeByProperty(lblStatus.id, "isVisible", false);
				imageId.image = imageobject;
              	formmodel.performActionOnView(childFlexContainer.id, "forceLayout");
            }

            function error(errObj){
            	kony.sdk.mvvm.log.error("error in update binaryContent : " + JSON.stringify(errObj));
            }          	
         
          	function gestureCallBack(myWidget, gestureInfo) {
       			var flexId = myWidget.id;
	            var index = flexId.replace("flexContainer", '');
	            var lblStatus = "lblStatus" + index;
	            var lblBinaryName = "lblBinaryName" + index;
	            var status = formmodel.getViewAttributeByProperty(lblStatus, "text");
	            if (status == undefined || status == null || status.length == 0) {
	            	var binaryName = formmodel.getViewAttributeByProperty(lblBinaryName, "text");
	              	var navigationObject = new kony.sdk.mvvm.NavigationObject();
	                navigationObject.setQueryParams({"x":binaryName});
	                scopeObj.navigateTo("frmTimeAndExpenseAttachmentImageKA", navigationObject);
	         	}
       		}
		}catch(err){
			kony.sdk.mvvm.log.error("error in Blogic addImageToFlex function : " + err.toString());
		}
    }
  
});