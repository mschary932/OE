kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.initApplicationForms = function(appContext) {
    try {
		kony.sdk.mvvm.initOrderExecutionTabKAForm(appContext);
		kony.sdk.mvvm.initCompleteOrderTabKAForm(appContext);
		kony.sdk.mvvm.initTaskExecutionTabKAForm(appContext);
		kony.sdk.mvvm.initResourceExecutionTabKAForm(appContext);
		kony.sdk.mvvm.initMyOrderListTabKAForm(appContext);
		kony.sdk.mvvm.initExpenseDetailsTabKAForm(appContext);
		kony.sdk.mvvm.initAvailableOrderListTabKAForm(appContext);
		kony.sdk.mvvm.initMeasurementExecutionKAForm(appContext);
		kony.sdk.mvvm.initMeasurementsReadingKAForm(appContext);
	
		
    } catch (err) {
        var exception = appContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INIT_FORMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INIT_FORMS, err);
        kony.sdk.mvvm.log.error(exception.toString());
        alert("kony.sdk.mvvm.initApplicationForms : " + JSON.stringify(exception));
        throw exception;
      
    }
};
kony.sdk.mvvm.initOrderExecutionTabKAForm = function(appContext) {
	var frmOrderExecutionTabKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderExecutionTabKAConfig);
	var frmOrderExecutionTabKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderExecutionTabKAController", appContext, frmOrderExecutionTabKAModelConfigObj);
	var frmOrderExecutionTabKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderExecutionTabKAControllerExtension",frmOrderExecutionTabKAControllerObj);
	frmOrderExecutionTabKAControllerObj.setControllerExtensionObject(frmOrderExecutionTabKAstrategyObj);
	var frmOrderExecutionTabKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderExecutionTabKAFormModel", frmOrderExecutionTabKAControllerObj);
	var frmOrderExecutionTabKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderExecutionTabKAFormModelExtension", frmOrderExecutionTabKAFormModelObj);
	frmOrderExecutionTabKAFormModelObj.setFormModelExtensionObj(frmOrderExecutionTabKAFormModelExtObj);
	appContext.setFormController("frmOrderExecutionTabKA", frmOrderExecutionTabKAControllerObj);
};
kony.sdk.mvvm.initTaskExecutionTabKAForm = function(appContext) {
	var frmTaskExecutionTabKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTaskExecutionTabKAConfig);
	var frmTaskExecutionTabKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTaskExecutionTabKAController", appContext, frmTaskExecutionTabKAModelConfigObj);
	var frmTaskExecutionTabKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTaskExecutionTabKAControllerExtension",frmTaskExecutionTabKAControllerObj);
	frmTaskExecutionTabKAControllerObj.setControllerExtensionObject(frmTaskExecutionTabKAstrategyObj);
	var frmTaskExecutionTabKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTaskExecutionTabKAFormModel", frmTaskExecutionTabKAControllerObj);
	var frmTaskExecutionTabKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTaskExecutionTabKAFormModelExtension", frmTaskExecutionTabKAFormModelObj);
	frmTaskExecutionTabKAFormModelObj.setFormModelExtensionObj(frmTaskExecutionTabKAFormModelExtObj);
	appContext.setFormController("frmTaskExecutionTabKA", frmTaskExecutionTabKAControllerObj);
};

kony.sdk.mvvm.initResourceExecutionTabKAForm = function(appContext) {
	var frmResourceExecutionTabKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmResourceExecutionTabKAConfig);
	var frmResourceExecutionTabKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmResourceExecutionTabKAController", appContext, frmResourceExecutionTabKAModelConfigObj);
	var frmResourceExecutionTabKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmResourceExecutionTabKAControllerExtension",frmResourceExecutionTabKAControllerObj);
	frmResourceExecutionTabKAControllerObj.setControllerExtensionObject(frmResourceExecutionTabKAstrategyObj);
	var frmResourceExecutionTabKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmResourceExecutionTabKAFormModel", frmResourceExecutionTabKAControllerObj);
	var frmResourceExecutionTabKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmResourceExecutionTabKAFormModelExtension", frmResourceExecutionTabKAFormModelObj);
	frmResourceExecutionTabKAFormModelObj.setFormModelExtensionObj(frmResourceExecutionTabKAFormModelExtObj);
	appContext.setFormController("frmResourceExecutionTabKA", frmResourceExecutionTabKAControllerObj);
};


kony.sdk.mvvm.initMyOrderListTabKAForm = function(appContext) {
	var frmMyOrderListTabKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMyOrderListTabKAConfig);
	var frmMyOrderListTabKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMyOrderListTabKAController", appContext, frmMyOrderListTabKAModelConfigObj);
	var frmMyOrderListTabKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMyOrderListTabKAControllerExtension",frmMyOrderListTabKAControllerObj);
	frmMyOrderListTabKAControllerObj.setControllerExtensionObject(frmMyOrderListTabKAstrategyObj);
	var frmMyOrderListTabKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMyOrderListTabKAFormModel", frmMyOrderListTabKAControllerObj);
	var frmMyOrderListTabKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMyOrderListTabKAFormModelExtension", frmMyOrderListTabKAFormModelObj);
	frmMyOrderListTabKAFormModelObj.setFormModelExtensionObj(frmMyOrderListTabKAFormModelExtObj);
	appContext.setFormController("frmMyOrderListTabKA", frmMyOrderListTabKAControllerObj);
};

kony.sdk.mvvm.initExpenseDetailsTabKAForm = function(appContext) {
	var frmExpenseDetailsTabKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmExpenseDetailsTabKAConfig);
	var frmExpenseDetailsTabKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmExpenseDetailsTabKAController", appContext, frmExpenseDetailsTabKAModelConfigObj);
	var frmExpenseDetailsTabKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmExpenseDetailsTabKAControllerExtension",frmExpenseDetailsTabKAControllerObj);
	frmExpenseDetailsTabKAControllerObj.setControllerExtensionObject(frmExpenseDetailsTabKAstrategyObj);
	var frmExpenseDetailsTabKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmExpenseDetailsTabKAFormModel", frmExpenseDetailsTabKAControllerObj);
	var frmExpenseDetailsTabKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmExpenseDetailsTabKAFormModelExtension", frmExpenseDetailsTabKAFormModelObj);
	frmExpenseDetailsTabKAFormModelObj.setFormModelExtensionObj(frmExpenseDetailsTabKAFormModelExtObj);
	appContext.setFormController("frmExpenseDetailsTabKA", frmExpenseDetailsTabKAControllerObj);
};


kony.sdk.mvvm.initAvailableOrderListTabKAForm = function(appContext){
	var frmAvailableOrderListTabKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAvailableOrderListTabKAConfig);
	var frmAvailableOrderListTabKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAvailableOrderListTabKAController", appContext, frmAvailableOrderListTabKAModelConfigObj);
	var frmAvailableOrderListTabKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAvailableOrderListTabKAControllerExtension",frmAvailableOrderListTabKAControllerObj);
	frmAvailableOrderListTabKAControllerObj.setControllerExtensionObject(frmAvailableOrderListTabKAstrategyObj);
	var frmAvailableOrderListTabKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAvailableOrderListTabKAFormModel", frmAvailableOrderListTabKAControllerObj);
	var frmAvailableOrderListTabKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAvailableOrderListTabKAFormModelExtension", frmAvailableOrderListTabKAFormModelObj);
	frmAvailableOrderListTabKAFormModelObj.setFormModelExtensionObj(frmAvailableOrderListTabKAFormModelExtObj);
	appContext.setFormController("frmAvailableOrderListTabKA", frmAvailableOrderListTabKAControllerObj);
};

kony.sdk.mvvm.initCompleteOrderTabKAForm = function(appContext) {
	var frmCompleteOrderTabKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCompleteOrderTabKAConfig);
	var frmCompleteOrderTabKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCompleteOrderTabKAController", appContext, frmCompleteOrderTabKAModelConfigObj);
	var frmCompleteOrderTabKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCompleteOrderTabKAControllerExtension",frmCompleteOrderTabKAControllerObj);
	frmCompleteOrderTabKAControllerObj.setControllerExtensionObject(frmCompleteOrderTabKAstrategyObj);
	var frmCompleteOrderTabKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCompleteOrderTabKAFormModel", frmCompleteOrderTabKAControllerObj);
	var frmCompleteOrderTabKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCompleteOrderTabKAFormModelExtension", frmCompleteOrderTabKAFormModelObj);
	frmCompleteOrderTabKAFormModelObj.setFormModelExtensionObj(frmCompleteOrderTabKAFormModelExtObj);
	appContext.setFormController("frmCompleteOrderTabKA", frmCompleteOrderTabKAControllerObj);
};

kony.sdk.mvvm.initMeasurementExecutionKAForm = function(appContext) {
	var frmMeasurementExecutionKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMeasurementExecutionKAConfig);
	var frmMeasurementExecutionKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMeasurementExecutionKAController", appContext, frmMeasurementExecutionKAModelConfigObj);
	var frmMeasurementExecutionKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMeasurementExecutionKAControllerExtension",frmMeasurementExecutionKAControllerObj);
	frmMeasurementExecutionKAControllerObj.setControllerExtensionObject(frmMeasurementExecutionKAstrategyObj);
	var frmMeasurementExecutionKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMeasurementExecutionKAFormModel", frmMeasurementExecutionKAControllerObj);
	var frmMeasurementExecutionKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMeasurementExecutionKAFormModelExtension", frmMeasurementExecutionKAFormModelObj);
	frmMeasurementExecutionKAFormModelObj.setFormModelExtensionObj(frmMeasurementExecutionKAFormModelExtObj);
	appContext.setFormController("frmMeasurementExecutionKA", frmMeasurementExecutionKAControllerObj);
};

kony.sdk.mvvm.initMeasurementsReadingKAForm = function(appContext) {
	var frmMeasurementsReadingKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMeasurementsReadingKAConfig);
	var frmMeasurementsReadingKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMeasurementsReadingKAController", appContext, frmMeasurementsReadingKAModelConfigObj);
	var frmMeasurementsReadingKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMeasurementsReadingKAControllerExtension",frmMeasurementsReadingKAControllerObj);
	frmMeasurementsReadingKAControllerObj.setControllerExtensionObject(frmMeasurementsReadingKAstrategyObj);
	var frmMeasurementsReadingKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMeasurementsReadingKAFormModel", frmMeasurementsReadingKAControllerObj);
	var frmMeasurementsReadingKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMeasurementsReadingKAFormModelExtension", frmMeasurementsReadingKAFormModelObj);
	frmMeasurementsReadingKAFormModelObj.setFormModelExtensionObj(frmMeasurementsReadingKAFormModelExtObj);
	appContext.setFormController("frmMeasurementsReadingKA", frmMeasurementsReadingKAControllerObj);
};