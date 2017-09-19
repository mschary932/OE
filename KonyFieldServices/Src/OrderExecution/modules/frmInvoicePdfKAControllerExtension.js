/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmInvoicePdfKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmInvoicePdfKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
    },    
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
            this.$class.$superp.fetchData.call(this, success, error);
        } 
		catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
        function success(response) {
            scopeObj.setFormModelInfo("InvoiceId", scopeObj.getController().getContextData().getCustomInfo("invInfo").invID);
			scopeObj.total = response.form[0].TotalAmount;
            scopeObj.getController().processData(response);
        }
		function error(err) {
            //Error fetching data
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },   
  	processData: function(data) {
        try {
            var scopeObj = this;
			var controller = scopeObj.getController();
          	var processedData = scopeObj.$class.$superp.processData.call(scopeObj, data);
            scopeObj.setFormModelInfo("InvoiceId", controller.getContextData().getCustomInfo("invInfo").invID);
			controller.bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
  
  	bindData: function(dataMap) {
        try {
            var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            formModel.clear();
			var date = convertTimeZone(moment(dataMap["form"]["lblInvDateKA"].getData(), kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE"));
			var time = convertTimeZone(moment(dataMap["form"]["lblInvDurationKA"].getData(), kony.servicesapp.DB_DATE_FORMAT).format(), kony.servicesapp.remoteTimeZone, null, kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("TIMEHOURSANDMIN"));
			time = time.substring(0,5) + "hrs";
			dataMap["form"]["lblInvDateKA"].setData(date);
          	dataMap["form"]["lblInvDurationKA"].setData(time);
            var contextData = scopeObj.getController().getContextData();
			var itemCount = contextData.getCustomInfo("itemsCount");
          	var utilitiesObj = utilities.getUtilityObj();
            var items = utilitiesObj.geti18nValueKA("i18n.common.ItemsKA");
            scopeObj.$class.$superp.bindData.call(scopeObj, dataMap);
          	formModel.setViewAttributeByProperty("lblIItemsKA", "text",items +""+itemCount);
			formModel.setViewAttributeByProperty("lblInvoiceTotalKA","text",scopeObj.total +"$");
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            formModel.showView();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
  
  	viewInvoicePdf: function() {
      	try {
          	var scopeObj = this;
          	var contextData = scopeObj.getController().getContextData();
          	var formModel = scopeObj.getController().getFormModel();
			var fileName = contextData.getCustomInfo(kony.servicesapp.ORDER_ATTACHMENT_FILE_NAME);
          	var base64string = contextData.getCustomInfo(kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE);
          	if (kony.sdk.mvvm.Utils.getPlatformName() === kony.sdk.mvvm.Platforms["IPHONE"]){
                kony.sdk.mvvm.log.info("in iphone succCallback after attachment fetch");
                //  ios code
                var navigationObject = new kony.sdk.mvvm.NavigationObject();
                navigationObject.addCustomInfo(kony.servicesapp.ORDER_ATTACHMENT_FILE_NAME,fileName);
                navigationObject.addCustomInfo(kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE,base64string);
              	var Email = formModel.getViewAttributeByProperty("tbxEmailKA", "text");
              	navigationObject.addCustomInfo("email",Email);
                scopeObj.navigateTo("frmInvoicePdfBrowserKA", navigationObject);
            }
            else if(kony.sdk.mvvm.Platforms["ANDROID"]){
                kony.sdk.mvvm.log.info("in Android succCallback after attachment fetch");
                ViewFiles.viewfile(base64string,kony.servicesapp.CONFIG_MIME_TYPE_PDF,fileName,FileDatacallback);
                function FileDatacallback(){
                  kony.sdk.mvvm.log.info("created successfully");
                }
            }
        }
      	catch(err) {
          	kony.sdk.mvvm.log.error(execption.toString());
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
                formModel.setViewAttributeByProperty("FlxEmailKA","isVisible",false);
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
          	else {
				kony.sdk.mvvm.log.error(err.toString());
			}
        }
    },
  
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmSummaryKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
  	navigateToSelectPaymentMethod: function(){
      	try {
          	var orderExecutionScope =kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA").getControllerExtensionObject();
			var workOrderID = orderExecutionScope.getFormModelInfo("WorkOrderId");
            var datamodel = new kony.sdk.mvvm.DataModel();
			datamodel.setPrimaryKeyValueMap({"id":workOrderID});
			var navigationObject = new kony.sdk.mvvm.NavigationObject();
			navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
			navigationObject.setQueryParams("flxTotalKA", {"x": workOrderID});
          	this.navigateTo("frmSelectPaymentMethodKA",navigationObject);
        } catch(err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToSelectPaymentMethod : " + err);
        }
      
    }
  	
});