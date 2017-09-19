/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmInvoicePdfBrowserKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmInvoicePdfBrowserKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
    },
    fetchData: function() {
    	//no need to fetch data,image url and attachment name is stored in navigationObject
		try {
			this.bindData();
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
          	var contextData = scopeObj.getController().getContextData();
          	if (kony.sdk.mvvm.Utils.getPlatformName() === kony.sdk.mvvm.Platforms["IPHONE"]){
			         formModel.setViewAttributeByProperty("tbxEmailKA", "text",contextData.getCustomInfo("email")) ;
            }
			//formModel.setViewAttributeByProperty("lblHeaderKA", "text", controller.getContextData().getCustomInfo(kony.servicesapp.ORDER_ATTACHMENT_FILE_NAME));
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
			controller.getFormModel().performActionOnView("browserPdfKA","loadData",[kony.convertToRawBytes(base64string),config]);
		}catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic loadBrowserData : " + err);
        }
    },
	emailInvoice: function() {
      	try {
          	var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            var emailId = [formModel.getViewAttributeByProperty("tbxEmailKA","text")];
          	var email = emailId[0];
          	if(kony.string.isValidEmail(email)) {
               	var contextData = scopeObj.getController().getContextData();
                var fileName = contextData.getCustomInfo(kony.servicesapp.ORDER_ATTACHMENT_FILE_NAME);
                var base64string = contextData.getCustomInfo(kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE);
                kony.phone.openEmail(emailId, [], [], "", "",false, [{
                    mimetype : kony.servicesapp.CONFIG_MIME_TYPE_PDF,
                    attachment : kony.convertToRawBytes(base64string),
                    filename : fileName
                   }]);
                formModel.setViewAttributeByProperty("flxEmailKA","isVisible",false);
                } 
      		else {
              	alertText = utilities.getUtilityObj().geti18nValueKA("i18n.common.EnterValidEmailKA");
              	alert(alertText);
            }
        }
      	catch(err) {
          	if(err.errorCode == 2102) {
              	alertText = utilities.getUtilityObj().geti18nValueKA("i18n.common.PleaseConfigureYouEmailKA");
              	alert(alertText);
            }
          	else{
				kony.sdk.mvvm.log.error(err.toString());
			}
        }
    },
    navigateBack: function(){ 
	     try{ 
			this.$class.$superp.showPreviousForm.call(this,false,"frmInvoicePdfKA");	    
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
    }
});