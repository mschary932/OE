/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmOrderAttachmentBrowserKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrderAttachmentBrowserKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        var scopeObj = this;
        scopeObj.$class.$super.call(scopeObj,controllerObj);
        scopeObj.controllerExtensionGen = undefined;
        scopeObj.taskID = null;
        scopeObj.taskNumber = null;
        scopeObj.tStatusID = null;
        scopeObj.tDuration = 0;
        scopeObj.woID = null;
        scopeObj.woStatusID = null;
        scopeObj.materialIDs = [];
    },
    fetchData: function() {
    	//no need to fetch data,image url and attachment name is stored in navigationObject
		try {
			var scopeObj= this;
			scopeObj.bindData();
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic fetchData : " + err);
        }
    },
    navigateTo: function(formId, navObject) {
		try {
			this.$class.$superp.navigateTo.call(this, formId, navObject);
		}
		catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateTo : " + err);
        }
    },
    bindData: function() {
		try {
			var scopeObj = this;
			var controller = scopeObj.getController();
			var formModel = controller.getFormModel();
			formModel.setViewAttributeByProperty("lblHeaderKA", "text", controller.getContextData().getCustomInfo(kony.servicesapp.ORDER_ATTACHMENT_FILE_NAME));
			TAG.NC.applyFormTransitions(formModel.getView().getKonyForm());
			formModel.showView();
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic bindData : " + err);
        }
    },
    loadBrowserData: function(){
		try {
			var scopeObj = this;
			var controller = scopeObj.getController();
			var base64string = controller.getContextData().getCustomInfo(kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE);
			var config = {
				  "mimeType": kony.servicesapp.CONFIG_MIME_TYPE_PDF,
				  "encoding": kony.servicesapp.CONFIG_ENCODING_FORMAT
			};
			controller.getFormModel().performActionOnView("BrowserPDFKA","loadData",[kony.convertToRawBytes(base64string),config]);
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic loadBrowserData : " + err);
        }
    },
    navigateBack: function(){ 
	     try{ 
			this.$class.$superp.showPreviousForm.call(this,false,"frmOrderAttachmentsKA");	    
         }        
         catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
         }
    },
	/** Need to check for usage*/
    clear: function(){
		try {
			formmodel.performActionOnView("flexDetailsKA", "removeAll");
			formmodel.performActionOnView("flexDetailsKA", "forceLayout");
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic clear : " + err);
        }
    },
	fetchBinaryContent: function(binaryName,succCallBack,errorCallBack){
		try {
			var scopeObj = this;
			var controller = scopeObj.getController();
			var config = controller.getConfig();
			var objSvc = controller.getApplicationContext().getObjectService(config.getObjectServiceOptions(), config.getObjectServiceName());
			var dataObject = new kony.sdk.dto.DataObject(kony.servicesapp.ENTITY_MEDIA);
			dataObject.addField("name", binaryName);
			function success(binaryData) {
				succCallBack(binaryData);
			}
			function error(err) {
				errorCallBack(err);
				kony.sdk.mvvm.log.error("error while downloading image from media entity");
			}
			objSvc.getBinaryContent({
				"dataObject": dataObject,
				"binaryAttrName": kony.servicesapp.BINARY_CONTENT_ATTRIBUTE_NAME
			}, success, error);			
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic fetchBinaryContent : " + err);
        }
    }
});