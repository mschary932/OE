kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.initApplicationForms = function(appContext) {
    try {
		kony.sdk.mvvm.initOrderListKAForm(appContext);
		kony.sdk.mvvm.initPendingOrderListKAForm(appContext);
		kony.sdk.mvvm.initOrdersViewsKAForm(appContext);
		kony.sdk.mvvm.initStatusFilterKAForm(appContext);
		kony.sdk.mvvm.initDateFilterKAForm(appContext);
		kony.sdk.mvvm.initOrderExecutionKAForm(appContext);
		kony.sdk.mvvm.initNewTaskKAForm(appContext);
		kony.sdk.mvvm.initOrderDetailsKAForm(appContext);
		kony.sdk.mvvm.initOrderHistoryKAForm(appContext);
		kony.sdk.mvvm.initContactDetailsKAForm(appContext);
		kony.sdk.mvvm.initDescriptionDetailsKAForm(appContext);
		kony.sdk.mvvm.initDirectionsKAForm(appContext);
		kony.sdk.mvvm.initDirectionStepsKAForm(appContext);
		kony.sdk.mvvm.initOrderResourcesListKAForm(appContext);
		kony.sdk.mvvm.initOrderResourceDetailsKAForm(appContext);
		kony.sdk.mvvm.initTaskExecutionKAForm(appContext);
		kony.sdk.mvvm.initTaskDetailsKAForm(appContext);		
		kony.sdk.mvvm.initTaskResourcesListKAForm(appContext);
		kony.sdk.mvvm.initNotesListKAForm(appContext);
		kony.sdk.mvvm.initNotesDetailsKAForm(appContext);
		kony.sdk.mvvm.initCreateNotesKAForm(appContext);
		kony.sdk.mvvm.initCompleteOrderKAForm(appContext);
		kony.sdk.mvvm.initCompleteOrderSummaryKAForm(appContext);
		kony.sdk.mvvm.initCompleteOrderImagesKAForm(appContext);
		kony.sdk.mvvm.initWorkConfirmationKAForm(appContext);
		kony.sdk.mvvm.initCustomerSignOffKAForm(appContext);
		kony.sdk.mvvm.initOrderAttachmentsKAForm(appContext);
		kony.sdk.mvvm.initOrderAttachmentBrowserKAForm(appContext);
		kony.sdk.mvvm.initTaskAttachmentKAForm(appContext);
		kony.sdk.mvvm.initTaskAttachmentImageKAForm(appContext);
		kony.sdk.mvvm.initResourceExecutionKAForm(appContext); 
		kony.sdk.mvvm.initExtendedAttributesKAForm(appContext);
		kony.sdk.mvvm.initSurveyKAForm(appContext);
		kony.sdk.mvvm.initExpenseDetailsKAForm(appContext);
		kony.sdk.mvvm.initTimeAndExpenseKAForm(appContext);
		kony.sdk.mvvm.initHistoryForm(appContext);
		kony.sdk.mvvm.initReadingExecutionForm(appContext);
		kony.sdk.mvvm.initMeasurementsKAForm(appContext);
		kony.sdk.mvvm.initMeasurementReadingsForm(appContext);
		kony.sdk.mvvm.initMeasurementExecutionKAForm(appContext);
		kony.sdk.mvvm.initCreateMeasurementDescriptionKAForm(appContext);
		kony.sdk.mvvm.initCreateMeasurementKAForm(appContext);
		kony.sdk.mvvm.initOrderAssetKAForm(appContext);
      	kony.sdk.mvvm.initBillOfMaterialKAForm(appContext);
		kony.sdk.mvvm.initAddTimeExpenseKAForm(appContext);
      	kony.sdk.mvvm.initAddEditExpenseItemKAForm(appContext);
		kony.sdk.mvvm.initAddEditTimeItemKAForm(appContext);
		kony.sdk.mvvm.initTimeAndExpenseAttachmentKAForm(appContext);
		kony.sdk.mvvm.initTimeAndExpenseAttachmentImageKAForm(appContext);
		kony.sdk.mvvm.initStockLocationListKAForm(appContext);
		kony.sdk.mvvm.initStockLocationDetailsKAForm(appContext);
		kony.sdk.mvvm.initSummaryKAForm(appContext);
		kony.sdk.mvvm.initCashPaymentKAForm(appContext);
		kony.sdk.mvvm.initInvoicePdfKAForm(appContext);
		kony.sdk.mvvm.initSelectPaymentMethodKAForm(appContext);
		kony.sdk.mvvm.initCardPaymentKAForm(appContext);
		kony.sdk.mvvm.initInvoicePdfBrowserKAForm(appContext);
    } catch (err) {
        var exception = appContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INIT_FORMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INIT_FORMS, err);
        kony.sdk.mvvm.log.error(exception.toString());
        throw exception;
    }
};
kony.sdk.mvvm.initOrderListKAForm = function(appContext) {
	var frmOrderListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderListKAConfig);
	var frmOrderListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderListKAController", appContext, frmOrderListKAModelConfigObj);
	var frmOrderListKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderListKAControllerExtension",frmOrderListKAControllerObj);
	frmOrderListKAControllerObj.setControllerExtensionObject(frmOrderListKAstrategyObj);
	var frmOrderListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderListKAFormModel", frmOrderListKAControllerObj);
	var frmOrderListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderListKAFormModelExtension", frmOrderListKAFormModelObj);
	frmOrderListKAFormModelObj.setFormModelExtensionObj(frmOrderListKAFormModelExtObj);
	appContext.setFormController("frmOrderListKA", frmOrderListKAControllerObj);
};
kony.sdk.mvvm.initPendingOrderListKAForm = function(appContext) {
	var frmPendingOrderListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmPendingOrderListKAConfig);
	var frmPendingOrderListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmPendingOrderListKAController", appContext, frmPendingOrderListKAModelConfigObj);
	var frmPendingOrderListKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmPendingOrderListKAControllerExtension",frmPendingOrderListKAControllerObj);
	frmPendingOrderListKAControllerObj.setControllerExtensionObject(frmPendingOrderListKAstrategyObj);
	var frmPendingOrderListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmPendingOrderListKAFormModel", frmPendingOrderListKAControllerObj);
	var frmPendingOrderListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmPendingOrderListKAFormModelExtension", frmPendingOrderListKAFormModelObj);
	frmPendingOrderListKAFormModelObj.setFormModelExtensionObj(frmPendingOrderListKAFormModelExtObj);
	appContext.setFormController("frmPendingOrderListKA", frmPendingOrderListKAControllerObj);
};
kony.sdk.mvvm.initContactDetailsKAForm = function(appContext) {
	var frmContactDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmContactDetailsKAConfig);
	var frmContactDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmContactDetailsKAController", appContext, frmContactDetailsKAModelConfigObj);
	var frmContactDetailsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmContactDetailsKAControllerExtension",frmContactDetailsKAControllerObj);
	frmContactDetailsKAControllerObj.setControllerExtensionObject(frmContactDetailsKAstrategyObj);
	var frmContactDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmContactDetailsKAFormModel", frmContactDetailsKAControllerObj);
	var frmContactDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmContactDetailsKAFormModelExtension", frmContactDetailsKAFormModelObj);
	frmContactDetailsKAFormModelObj.setFormModelExtensionObj(frmContactDetailsKAFormModelExtObj);
	appContext.setFormController("frmContactDetailsKA", frmContactDetailsKAControllerObj);
};
kony.sdk.mvvm.initDescriptionDetailsKAForm = function(appContext) {
	var frmDescriptionDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDescriptionDetailsKAConfig);
	var frmDescriptionDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDescriptionDetailsKAController", appContext, frmDescriptionDetailsKAModelConfigObj);
	var frmDescriptionDetailsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDescriptionDetailsKAControllerExtension",frmDescriptionDetailsKAControllerObj);
	frmDescriptionDetailsKAControllerObj.setControllerExtensionObject(frmDescriptionDetailsKAstrategyObj);
	var frmDescriptionDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDescriptionDetailsKAFormModel", frmDescriptionDetailsKAControllerObj);
	var frmDescriptionDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDescriptionDetailsKAFormModelExtension", frmDescriptionDetailsKAFormModelObj);
	frmDescriptionDetailsKAFormModelObj.setFormModelExtensionObj(frmDescriptionDetailsKAFormModelExtObj);
	appContext.setFormController("frmDescriptionDetailsKA", frmDescriptionDetailsKAControllerObj);
};
kony.sdk.mvvm.initDirectionsKAForm = function(appContext) {
	var frmDirectionsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDirectionsKAConfig);
	var frmDirectionsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDirectionsKAController", appContext, frmDirectionsKAModelConfigObj);
	var frmDirectionsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDirectionsKAControllerExtension",frmDirectionsKAControllerObj);
	frmDirectionsKAControllerObj.setControllerExtensionObject(frmDirectionsKAstrategyObj);
	var frmDirectionsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDirectionsKAFormModel", frmDirectionsKAControllerObj);
	var frmDirectionsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDirectionsKAFormModelExtension", frmDirectionsKAFormModelObj);
	frmDirectionsKAFormModelObj.setFormModelExtensionObj(frmDirectionsKAFormModelExtObj);
	appContext.setFormController("frmDirectionsKA", frmDirectionsKAControllerObj);
};
kony.sdk.mvvm.initDirectionStepsKAForm = function(appContext) {
	var frmDirectionStepsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDirectionStepsKAConfig);
	var frmDirectionStepsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDirectionStepsKAController", appContext, frmDirectionStepsKAModelConfigObj);
	var frmDirectionStepsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDirectionStepsKAControllerExtension",frmDirectionStepsKAControllerObj);
	frmDirectionStepsKAControllerObj.setControllerExtensionObject(frmDirectionStepsKAstrategyObj);
	var frmDirectionStepsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDirectionStepsKAFormModel", frmDirectionStepsKAControllerObj);
	var frmDirectionStepsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDirectionStepsKAFormModelExtension", frmDirectionStepsKAFormModelObj);
	frmDirectionStepsKAFormModelObj.setFormModelExtensionObj(frmDirectionStepsKAFormModelExtObj);
	appContext.setFormController("frmDirectionStepsKA", frmDirectionStepsKAControllerObj);
};
kony.sdk.mvvm.initOrderDetailsKAForm = function(appContext) {
	var frmOrderDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderDetailsKAConfig);
	var frmOrderDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderDetailsKAController", appContext, frmOrderDetailsKAModelConfigObj);
	var frmOrderDetailsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderDetailsKAControllerExtension",frmOrderDetailsKAControllerObj);
	frmOrderDetailsKAControllerObj.setControllerExtensionObject(frmOrderDetailsKAstrategyObj);
	var frmOrderDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderDetailsKAFormModel", frmOrderDetailsKAControllerObj);
	var frmOrderDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderDetailsKAFormModelExtension", frmOrderDetailsKAFormModelObj);
	frmOrderDetailsKAFormModelObj.setFormModelExtensionObj(frmOrderDetailsKAFormModelExtObj);
	appContext.setFormController("frmOrderDetailsKA", frmOrderDetailsKAControllerObj);
};
kony.sdk.mvvm.initOrderHistoryKAForm = function(appContext) {
	var frmOrderHistoryKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderHistoryKAConfig);
	var frmOrderHistoryKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderHistoryKAController", appContext, frmOrderHistoryKAModelConfigObj);
	var frmOrderHistoryKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderHistoryKAControllerExtension",frmOrderHistoryKAControllerObj);
	frmOrderHistoryKAControllerObj.setControllerExtensionObject(frmOrderHistoryKAstrategyObj);
	var frmOrderHistoryKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderHistoryKAFormModel", frmOrderHistoryKAControllerObj);
	var frmOrderHistoryKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderHistoryKAFormModelExtension", frmOrderHistoryKAFormModelObj);
	frmOrderHistoryKAFormModelObj.setFormModelExtensionObj(frmOrderHistoryKAFormModelExtObj);
	appContext.setFormController("frmOrderHistoryKA", frmOrderHistoryKAControllerObj);
};
kony.sdk.mvvm.initOrderExecutionKAForm = function(appContext) {
	var frmOrderExecutionKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderExecutionKAConfig);
	var frmOrderExecutionKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderExecutionKAController", appContext, frmOrderExecutionKAModelConfigObj);
	var frmOrderExecutionKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderExecutionKAControllerExtension",frmOrderExecutionKAControllerObj);
	frmOrderExecutionKAControllerObj.setControllerExtensionObject(frmOrderExecutionKAstrategyObj);
	var frmOrderExecutionKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderExecutionKAFormModel", frmOrderExecutionKAControllerObj);
	var frmOrderExecutionKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderExecutionKAFormModelExtension", frmOrderExecutionKAFormModelObj);
	frmOrderExecutionKAFormModelObj.setFormModelExtensionObj(frmOrderExecutionKAFormModelExtObj);
	appContext.setFormController("frmOrderExecutionKA", frmOrderExecutionKAControllerObj);
};
kony.sdk.mvvm.initOrderResourceDetailsKAForm = function(appContext) {
	var frmOrderResourceDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderResourceDetailsKAConfig);
	var frmOrderResourceDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderResourceDetailsKAController", appContext, frmOrderResourceDetailsKAModelConfigObj);
	var frmOrderResourceDetailsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderResourceDetailsKAControllerExtension",frmOrderResourceDetailsKAControllerObj);
	frmOrderResourceDetailsKAControllerObj.setControllerExtensionObject(frmOrderResourceDetailsKAstrategyObj);
	var frmOrderResourceDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderResourceDetailsKAFormModel", frmOrderResourceDetailsKAControllerObj);
	var frmOrderResourceDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderResourceDetailsKAFormModelExtension", frmOrderResourceDetailsKAFormModelObj);
	frmOrderResourceDetailsKAFormModelObj.setFormModelExtensionObj(frmOrderResourceDetailsKAFormModelExtObj);
	appContext.setFormController("frmOrderResourceDetailsKA", frmOrderResourceDetailsKAControllerObj);
};
kony.sdk.mvvm.initOrderResourcesListKAForm = function(appContext) {
	var frmOrderResourcesListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderResourcesListKAConfig);
	var frmOrderResourcesListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderResourcesListKAController", appContext, frmOrderResourcesListKAModelConfigObj);
	var frmOrderResourcesListKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderResourcesListKAControllerExtension",frmOrderResourcesListKAControllerObj);
	frmOrderResourcesListKAControllerObj.setControllerExtensionObject(frmOrderResourcesListKAstrategyObj);
	var frmOrderResourcesListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderResourcesListKAFormModel", frmOrderResourcesListKAControllerObj);
	var frmOrderResourcesListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderResourcesListKAFormModelExtension", frmOrderResourcesListKAFormModelObj);
	frmOrderResourcesListKAFormModelObj.setFormModelExtensionObj(frmOrderResourcesListKAFormModelExtObj);
	appContext.setFormController("frmOrderResourcesListKA", frmOrderResourcesListKAControllerObj);
};
kony.sdk.mvvm.initOrdersViewsKAForm = function(appContext) {
	var frmOrdersViewsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrdersViewsKAConfig);
	var frmOrdersViewsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrdersViewsKAController", appContext, frmOrdersViewsKAModelConfigObj);
	var frmOrdersViewsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrdersViewsKAControllerExtension",frmOrdersViewsKAControllerObj);
	frmOrdersViewsKAControllerObj.setControllerExtensionObject(frmOrdersViewsKAstrategyObj);
	var frmOrdersViewsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrdersViewsKAFormModel", frmOrdersViewsKAControllerObj);
	var frmOrdersViewsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrdersViewsKAFormModelExtension", frmOrdersViewsKAFormModelObj);
	frmOrdersViewsKAFormModelObj.setFormModelExtensionObj(frmOrdersViewsKAFormModelExtObj);
	appContext.setFormController("frmOrdersViewsKA", frmOrdersViewsKAControllerObj);
};
kony.sdk.mvvm.initResourceExecutionKAForm = function(appContext) {
	var frmResourceExecutionKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmResourceExecutionKAConfig);
	var frmResourceExecutionKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmResourceExecutionKAController", appContext, frmResourceExecutionKAModelConfigObj);
	var frmResourceExecutionKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmResourceExecutionKAControllerExtension",frmResourceExecutionKAControllerObj);
	frmResourceExecutionKAControllerObj.setControllerExtensionObject(frmResourceExecutionKAstrategyObj);
	var frmResourceExecutionKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmResourceExecutionKAFormModel", frmResourceExecutionKAControllerObj);
	var frmResourceExecutionKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmResourceExecutionKAFormModelExtension", frmResourceExecutionKAFormModelObj);
	frmResourceExecutionKAFormModelObj.setFormModelExtensionObj(frmResourceExecutionKAFormModelExtObj);
	appContext.setFormController("frmResourceExecutionKA", frmResourceExecutionKAControllerObj);
};
kony.sdk.mvvm.initTaskDetailsKAForm = function(appContext) {
	var frmTaskDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTaskDetailsKAConfig);
	var frmTaskDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTaskDetailsKAController", appContext, frmTaskDetailsKAModelConfigObj);
	var frmTaskDetailsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTaskDetailsKAControllerExtension",frmTaskDetailsKAControllerObj);
	frmTaskDetailsKAControllerObj.setControllerExtensionObject(frmTaskDetailsKAstrategyObj);
	var frmTaskDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTaskDetailsKAFormModel", frmTaskDetailsKAControllerObj);
	var frmTaskDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTaskDetailsKAFormModelExtension", frmTaskDetailsKAFormModelObj);
	frmTaskDetailsKAFormModelObj.setFormModelExtensionObj(frmTaskDetailsKAFormModelExtObj);
	appContext.setFormController("frmTaskDetailsKA", frmTaskDetailsKAControllerObj);
};
kony.sdk.mvvm.initTaskExecutionKAForm = function(appContext) {
	var frmTaskExecutionKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTaskExecutionKAConfig);
        var frmTaskExecutionKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTaskExecutionKAController", appContext, frmTaskExecutionKAModelConfigObj);
        var frmTaskExecutionKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTaskExecutionKAControllerExtension",frmTaskExecutionKAControllerObj);
        frmTaskExecutionKAControllerObj.setControllerExtensionObject(frmTaskExecutionKAstrategyObj);
        var frmTaskExecutionKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTaskExecutionKAFormModel", frmTaskExecutionKAControllerObj);
        var frmTaskExecutionKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTaskExecutionKAFormModelExtension", frmTaskExecutionKAFormModelObj);
        frmTaskExecutionKAFormModelObj.setFormModelExtensionObj(frmTaskExecutionKAFormModelExtObj);
        appContext.setFormController("frmTaskExecutionKA", frmTaskExecutionKAControllerObj);
};
kony.sdk.mvvm.initTaskResourcesListKAForm = function(appContext) {
	var frmTaskResourcesListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTaskResourcesListKAConfig);
	var frmTaskResourcesListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTaskResourcesListKAController", appContext, frmTaskResourcesListKAModelConfigObj);
	var frmTaskResourcesListKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTaskResourcesListKAControllerExtension",frmTaskResourcesListKAControllerObj);
	frmTaskResourcesListKAControllerObj.setControllerExtensionObject(frmTaskResourcesListKAstrategyObj);
	var frmTaskResourcesListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTaskResourcesListKAFormModel", frmTaskResourcesListKAControllerObj);
	var frmTaskResourcesListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTaskResourcesListKAFormModelExtension", frmTaskResourcesListKAFormModelObj);
	frmTaskResourcesListKAFormModelObj.setFormModelExtensionObj(frmTaskResourcesListKAFormModelExtObj);
	appContext.setFormController("frmTaskResourcesListKA", frmTaskResourcesListKAControllerObj);
};
kony.sdk.mvvm.initStatusFilterKAForm = function(appContext) {
	var frmStatusFilterKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmStatusFilterKAConfig);
	var frmStatusFilterKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmStatusFilterKAController", appContext, frmStatusFilterKAModelConfigObj);
	var frmStatusFilterKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmStatusFilterKAControllerExtension",frmStatusFilterKAControllerObj);
	frmStatusFilterKAControllerObj.setControllerExtensionObject(frmStatusFilterKAstrategyObj);
	var frmStatusFilterKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmStatusFilterKAFormModel", frmStatusFilterKAControllerObj);
	var frmStatusFilterKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmStatusFilterKAFormModelExtension", frmStatusFilterKAFormModelObj);
	frmStatusFilterKAFormModelObj.setFormModelExtensionObj(frmStatusFilterKAFormModelExtObj);
	appContext.setFormController("frmStatusFilterKA", frmStatusFilterKAControllerObj);
};
kony.sdk.mvvm.initDateFilterKAForm = function(appContext) {
	var frmDateFilterKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDateFilterKAConfig);
	var frmDateFilterKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDateFilterKAController", appContext, frmDateFilterKAModelConfigObj);
	var frmDateFilterKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDateFilterKAControllerExtension",frmDateFilterKAControllerObj);
	frmDateFilterKAControllerObj.setControllerExtensionObject(frmDateFilterKAstrategyObj);
	var frmDateFilterKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDateFilterKAFormModel", frmDateFilterKAControllerObj);
	var frmDateFilterKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDateFilterKAFormModelExtension", frmDateFilterKAFormModelObj);
	frmDateFilterKAFormModelObj.setFormModelExtensionObj(frmDateFilterKAFormModelExtObj);
	appContext.setFormController("frmDateFilterKA", frmDateFilterKAControllerObj);
};
kony.sdk.mvvm.initNotesListKAForm = function(appContext) {
	var frmNotesListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNotesListKAConfig);
	var frmNotesListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNotesListKAController", appContext, frmNotesListKAModelConfigObj);
	var frmNotesListKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNotesListKAControllerExtension",frmNotesListKAControllerObj);
	frmNotesListKAControllerObj.setControllerExtensionObject(frmNotesListKAstrategyObj);
	var frmNotesListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNotesListKAFormModel", frmNotesListKAControllerObj);
	var frmNotesListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNotesListKAFormModelExtension", frmNotesListKAFormModelObj);
	frmNotesListKAFormModelObj.setFormModelExtensionObj(frmNotesListKAFormModelExtObj);
	appContext.setFormController("frmNotesListKA", frmNotesListKAControllerObj);
};
kony.sdk.mvvm.initNotesDetailsKAForm = function(appContext) {
	var frmNotesDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNotesDetailsKAConfig);
	var frmNotesDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNotesDetailsKAController", appContext, frmNotesDetailsKAModelConfigObj);
	var frmNotesDetailsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNotesDetailsKAControllerExtension",frmNotesDetailsKAControllerObj);
	frmNotesDetailsKAControllerObj.setControllerExtensionObject(frmNotesDetailsKAstrategyObj);
	var frmNotesDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNotesDetailsKAFormModel", frmNotesDetailsKAControllerObj);
	var frmNotesDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNotesDetailsKAFormModelExtension", frmNotesDetailsKAFormModelObj);
	frmNotesDetailsKAFormModelObj.setFormModelExtensionObj(frmNotesDetailsKAFormModelExtObj);
	appContext.setFormController("frmNotesDetailsKA", frmNotesDetailsKAControllerObj);
};
kony.sdk.mvvm.initCreateNotesKAForm = function(appContext) {
	var frmCreateNotesKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCreateNotesKAConfig);
	var frmCreateNotesKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCreateNotesKAController", appContext, frmCreateNotesKAModelConfigObj);
	var frmCreateNotesKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCreateNotesKAControllerExtension",frmCreateNotesKAControllerObj);
	frmCreateNotesKAControllerObj.setControllerExtensionObject(frmCreateNotesKAstrategyObj);
	var frmCreateNotesKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCreateNotesKAFormModel", frmCreateNotesKAControllerObj);
	var frmCreateNotesKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCreateNotesKAFormModelExtension", frmCreateNotesKAFormModelObj);
	frmCreateNotesKAFormModelObj.setFormModelExtensionObj(frmCreateNotesKAFormModelExtObj);
	appContext.setFormController("frmCreateNotesKA", frmCreateNotesKAControllerObj);
};
kony.sdk.mvvm.initCompleteOrderKAForm = function(appContext) {
	var frmCompleteOrderKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCompleteOrderKAConfig);
	var frmCompleteOrderKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCompleteOrderKAController", appContext, frmCompleteOrderKAModelConfigObj);
	var frmCompleteOrderKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCompleteOrderKAControllerExtension", frmCompleteOrderKAControllerObj);
	frmCompleteOrderKAControllerObj.setControllerExtensionObject(frmCompleteOrderKAControllerExtObj);
	var frmCompleteOrderKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCompleteOrderKAFormModel", frmCompleteOrderKAControllerObj);
	var frmCompleteOrderKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCompleteOrderKAFormModelExtension", frmCompleteOrderKAFormModelObj);
	frmCompleteOrderKAFormModelObj.setFormModelExtensionObj(frmCompleteOrderKAFormModelExtObj);
	appContext.setFormController("frmCompleteOrderKA", frmCompleteOrderKAControllerObj);
};
kony.sdk.mvvm.initCompleteOrderSummaryKAForm = function(appContext) {
	var frmCompleteOrderSummaryKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCompleteOrderSummaryKAConfig);
	var frmCompleteOrderSummaryKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCompleteOrderSummaryKAController", appContext, frmCompleteOrderSummaryKAModelConfigObj);
	var frmCompleteOrderSummaryKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCompleteOrderSummaryKAControllerExtension", frmCompleteOrderSummaryKAControllerObj);
	frmCompleteOrderSummaryKAControllerObj.setControllerExtensionObject(frmCompleteOrderSummaryKAControllerExtObj);
	var frmCompleteOrderSummaryKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCompleteOrderSummaryKAFormModel", frmCompleteOrderSummaryKAControllerObj);
	var frmCompleteOrderSummaryKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCompleteOrderSummaryKAFormModelExtension", frmCompleteOrderSummaryKAFormModelObj);
	frmCompleteOrderSummaryKAFormModelObj.setFormModelExtensionObj(frmCompleteOrderSummaryKAFormModelExtObj);
	appContext.setFormController("frmCompleteOrderSummaryKA", frmCompleteOrderSummaryKAControllerObj);
};
kony.sdk.mvvm.initWorkConfirmationKAForm = function(appContext) {
	var frmWorkConfirmationKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmWorkConfirmationKAConfig);
	var frmWorkConfirmationKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmWorkConfirmationKAController", appContext, frmWorkConfirmationKAModelConfigObj);
	var frmWorkConfirmationKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmWorkConfirmationKAControllerExtension", frmWorkConfirmationKAControllerObj);
	frmWorkConfirmationKAControllerObj.setControllerExtensionObject(frmWorkConfirmationKAControllerExtObj);
	var frmWorkConfirmationKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmWorkConfirmationKAFormModel", frmWorkConfirmationKAControllerObj);
	var frmWorkConfirmationKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmWorkConfirmationKAFormModelExtension", frmWorkConfirmationKAFormModelObj);
	frmWorkConfirmationKAFormModelObj.setFormModelExtensionObj(frmWorkConfirmationKAFormModelExtObj);
	appContext.setFormController("frmWorkConfirmationKA", frmWorkConfirmationKAControllerObj);
};
kony.sdk.mvvm.initCustomerSignOffKAForm = function(appContext) {
	var frmCustomerSignOffKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCustomerSignOffKAConfig);
	var frmCustomerSignOffKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCustomerSignOffKAController", appContext, frmCustomerSignOffKAModelConfigObj);
	var frmCustomerSignOffKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCustomerSignOffKAControllerExtension", frmCustomerSignOffKAControllerObj);
	frmCustomerSignOffKAControllerObj.setControllerExtensionObject(frmCustomerSignOffKAControllerExtObj);
	var frmCustomerSignOffKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCustomerSignOffKAFormModel", frmCustomerSignOffKAControllerObj);
	var frmCustomerSignOffKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCustomerSignOffKAFormModelExtension", frmCustomerSignOffKAFormModelObj);
	frmCustomerSignOffKAFormModelObj.setFormModelExtensionObj(frmCustomerSignOffKAFormModelExtObj);
	appContext.setFormController("frmCustomerSignOffKA", frmCustomerSignOffKAControllerObj);
};
kony.sdk.mvvm.initTaskAttachmentKAForm = function(appContext) {
	var frmTaskAttachmentKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTaskAttachmentKAConfig);
	var frmTaskAttachmentKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTaskAttachmentKAController", appContext, frmTaskAttachmentKAModelConfigObj);
	var frmTaskAttachmentKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTaskAttachmentKAControllerExtension",frmTaskAttachmentKAControllerObj);
	frmTaskAttachmentKAControllerObj.setControllerExtensionObject(frmTaskAttachmentKAstrategyObj);
	var frmTaskAttachmentKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTaskAttachmentKAFormModel", frmTaskAttachmentKAControllerObj);
	var frmTaskAttachmentKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTaskAttachmentKAFormModelExtension", frmTaskAttachmentKAFormModelObj);
	frmTaskAttachmentKAFormModelObj.setFormModelExtensionObj(frmTaskAttachmentKAFormModelExtObj);
	appContext.setFormController("frmTaskAttachmentKA", frmTaskAttachmentKAControllerObj);
};
kony.sdk.mvvm.initTaskAttachmentImageKAForm = function(appContext) {
	var frmTaskAttachmentImageKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTaskAttachmentImageKAConfig);
	var frmTaskAttachmentImageKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTaskAttachmentImageKAController", appContext, frmTaskAttachmentImageKAModelConfigObj);
	var frmTaskAttachmentImageKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTaskAttachmentImageKAControllerExtension",frmTaskAttachmentImageKAControllerObj);
	frmTaskAttachmentImageKAControllerObj.setControllerExtensionObject(frmTaskAttachmentImageKAstrategyObj);
	var frmTaskAttachmentImageKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTaskAttachmentImageKAFormModel", frmTaskAttachmentImageKAControllerObj);
	var frmTaskAttachmentImageKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTaskAttachmentImageKAFormModelExtension", frmTaskAttachmentImageKAFormModelObj);
	frmTaskAttachmentImageKAFormModelObj.setFormModelExtensionObj(frmTaskAttachmentImageKAFormModelExtObj);
	appContext.setFormController("frmTaskAttachmentImageKA", frmTaskAttachmentImageKAControllerObj);
};
kony.sdk.mvvm.initOrderAttachmentsKAForm = function(appContext) {
	var frmOrderAttachmentsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderAttachmentsKAConfig);
	var frmOrderAttachmentsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderAttachmentsKAController", appContext, frmOrderAttachmentsKAModelConfigObj);
	var frmOrderAttachmentsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderAttachmentsKAControllerExtension",frmOrderAttachmentsKAControllerObj);
	frmOrderAttachmentsKAControllerObj.setControllerExtensionObject(frmOrderAttachmentsKAstrategyObj);
	var frmOrderAttachmentsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderAttachmentsKAFormModel", frmOrderAttachmentsKAControllerObj);
	var frmOrderAttachmentsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderAttachmentsKAFormModelExtension", frmOrderAttachmentsKAFormModelObj);
	frmOrderAttachmentsKAFormModelObj.setFormModelExtensionObj(frmOrderAttachmentsKAFormModelExtObj);
	appContext.setFormController("frmOrderAttachmentsKA", frmOrderAttachmentsKAControllerObj);
};
kony.sdk.mvvm.initOrderAttachmentBrowserKAForm = function(appContext) {
	var frmOrderAttachmentBrowserKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderAttachmentBrowserKAConfig);
	var frmOrderAttachmentBrowserKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderAttachmentBrowserKAController", appContext, frmOrderAttachmentBrowserKAModelConfigObj);
	var frmOrderAttachmentBrowserKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderAttachmentBrowserKAControllerExtension",frmOrderAttachmentBrowserKAControllerObj);
	frmOrderAttachmentBrowserKAControllerObj.setControllerExtensionObject(frmOrderAttachmentBrowserKAstrategyObj);
	var frmOrderAttachmentBrowserKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderAttachmentBrowserKAFormModel", frmOrderAttachmentBrowserKAControllerObj);
	var frmOrderAttachmentBrowserKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderAttachmentBrowserKAFormModelExtension", frmOrderAttachmentBrowserKAFormModelObj);
	frmOrderAttachmentBrowserKAFormModelObj.setFormModelExtensionObj(frmOrderAttachmentBrowserKAFormModelExtObj);
	appContext.setFormController("frmOrderAttachmentBrowserKA", frmOrderAttachmentBrowserKAControllerObj);
};
kony.sdk.mvvm.initExtendedAttributesKAForm = function(appContext) {
	var frmExtendedAttributesKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmExtendedAttributesKAConfig);
	var frmExtendedAttributesKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmExtendedAttributesKAController", appContext, frmExtendedAttributesKAModelConfigObj);
	var frmExtendedAttributesKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmExtendedAttributesKAControllerExtension",frmExtendedAttributesKAControllerObj);
	frmExtendedAttributesKAControllerObj.setControllerExtensionObject(frmExtendedAttributesKAstrategyObj);
	var frmExtendedAttributesKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmExtendedAttributesKAFormModel", frmExtendedAttributesKAControllerObj);
	var frmExtendedAttributesKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmExtendedAttributesKAFormModelExtension", frmExtendedAttributesKAFormModelObj);
	frmExtendedAttributesKAFormModelObj.setFormModelExtensionObj(frmExtendedAttributesKAFormModelExtObj);
	appContext.setFormController("frmExtendedAttributesKA", frmExtendedAttributesKAControllerObj);
};		
kony.sdk.mvvm.initCompleteOrderImagesKAForm = function(appContext) {
	var frmCompleteImagesKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCompleteImagesKAConfig);
	var frmCompleteImagesKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCompleteImagesKAController", appContext, frmCompleteImagesKAModelConfigObj);
	var frmCompleteImagesKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCompleteImagesKAControllerExtension",frmCompleteImagesKAControllerObj);
	frmCompleteImagesKAControllerObj.setControllerExtensionObject(frmCompleteImagesKAstrategyObj);
	var frmCompleteImagesKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCompleteImagesKAFormModel", frmCompleteImagesKAControllerObj);
	var frmCompleteImagesKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCompleteImagesKAFormModelExtension", frmCompleteImagesKAFormModelObj);
	frmCompleteImagesKAFormModelObj.setFormModelExtensionObj(frmCompleteImagesKAFormModelExtObj);
	appContext.setFormController("frmCompleteImagesKA", frmCompleteImagesKAControllerObj);
};
kony.sdk.mvvm.initNewTaskKAForm = function(appContext) {
	var frmNewTaskKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmNewTaskKAConfig);
	var frmNewTaskKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmNewTaskKAController", appContext, frmNewTaskKAModelConfigObj);
	var frmNewTaskKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmNewTaskKAControllerExtension",frmNewTaskKAControllerObj);
	frmNewTaskKAControllerObj.setControllerExtensionObject(frmNewTaskKAstrategyObj);
	var frmNewTaskKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmNewTaskKAFormModel", frmNewTaskKAControllerObj);
	var frmNewTaskKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmNewTaskKAFormModelExtension", frmNewTaskKAFormModelObj);
	frmNewTaskKAFormModelObj.setFormModelExtensionObj(frmNewTaskKAFormModelExtObj);
	appContext.setFormController("frmNewTaskKA", frmNewTaskKAControllerObj);
};
kony.sdk.mvvm.initSurveyKAForm = function(appContext) {
	var frmSurveyKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSurveyKAConfig);
	var frmSurveyKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSurveyKAController", appContext, frmSurveyKAModelConfigObj);
	var frmSurveyKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSurveyKAControllerExtension",frmSurveyKAControllerObj);
	frmSurveyKAControllerObj.setControllerExtensionObject(frmSurveyKAstrategyObj);
	var frmSurveyKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSurveyKAFormModel", frmSurveyKAControllerObj);
	var frmSurveyKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSurveyKAFormModelExtension", frmSurveyKAFormModelObj);
	frmSurveyKAFormModelObj.setFormModelExtensionObj(frmSurveyKAFormModelExtObj);
	appContext.setFormController("frmSurveyKA", frmSurveyKAControllerObj);
};
kony.sdk.mvvm.initTimeAndExpenseKAForm = function(appContext) {
	var frmTimeAndExpenseKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTimeAndExpenseKAConfig);
	var frmTimeAndExpenseKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTimeAndExpenseKAController", appContext, frmTimeAndExpenseKAModelConfigObj);
	var frmTimeAndExpenseKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTimeAndExpenseKAControllerExtension",frmTimeAndExpenseKAControllerObj);
	frmTimeAndExpenseKAControllerObj.setControllerExtensionObject(frmTimeAndExpenseKAstrategyObj);
	var frmTimeAndExpenseKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTimeAndExpenseKAFormModel", frmTimeAndExpenseKAControllerObj);
	var frmTimeAndExpenseKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTimeAndExpenseKAFormModelExtension", frmTimeAndExpenseKAFormModelObj);
	frmTimeAndExpenseKAFormModelObj.setFormModelExtensionObj(frmTimeAndExpenseKAFormModelExtObj);
	appContext.setFormController("frmTimeAndExpenseKA", frmTimeAndExpenseKAControllerObj);
};
kony.sdk.mvvm.initExpenseDetailsKAForm = function(appContext) {
	var frmExpenseDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmExpenseDetailsKAConfig);
	var frmExpenseDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmExpenseDetailsKAController", appContext, frmExpenseDetailsKAModelConfigObj);
	var frmExpenseDetailsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmExpenseDetailsKAControllerExtension",frmExpenseDetailsKAControllerObj);
	frmExpenseDetailsKAControllerObj.setControllerExtensionObject(frmExpenseDetailsKAstrategyObj);
	var frmExpenseDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmExpenseDetailsKAFormModel", frmExpenseDetailsKAControllerObj);
	var frmExpenseDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmExpenseDetailsKAFormModelExtension", frmExpenseDetailsKAFormModelObj);
	frmExpenseDetailsKAFormModelObj.setFormModelExtensionObj(frmExpenseDetailsKAFormModelExtObj);
	appContext.setFormController("frmExpenseDetailsKA", frmExpenseDetailsKAControllerObj);
};
kony.sdk.mvvm.initCreateMeasurementKAForm = function(appContext) {
	var frmCreateMeasurementKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCreateMeasurementKAConfig);
	var frmCreateMeasurementKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCreateMeasurementKAController", appContext,frmCreateMeasurementKAModelConfigObj);
	var frmCreateMeasurementKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCreateMeasurementKAControllerExtension",frmCreateMeasurementKAControllerObj);
	frmCreateMeasurementKAControllerObj.setControllerExtensionObject(frmCreateMeasurementKAstrategyObj);
	var frmCreateMeasurementKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCreateMeasurementKAFormModel", frmCreateMeasurementKAControllerObj);
	var frmCreateMeasurementKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCreateMeasurementKAFormModelExtension", frmCreateMeasurementKAFormModelObj);
	frmCreateMeasurementKAFormModelObj.setFormModelExtensionObj(frmCreateMeasurementKAFormModelExtObj);
	appContext.setFormController("frmCreateMeasurementKA", frmCreateMeasurementKAControllerObj);
};
kony.sdk.mvvm.initCreateMeasurementDescriptionKAForm = function(appContext) {
	var frmCreateMeasurementDescriptionKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCreateMeasurementDescriptionKAConfig);
	var frmCreateMeasurementDescriptionKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCreateMeasurementDescriptionKAController", appContext, frmCreateMeasurementDescriptionKAModelConfigObj);
	var frmCreateMeasurementDescriptionKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCreateMeasurementDescriptionKAControllerExtension",frmCreateMeasurementDescriptionKAControllerObj);
	frmCreateMeasurementDescriptionKAControllerObj.setControllerExtensionObject(frmCreateMeasurementDescriptionKAstrategyObj);
	var frmCreateMeasurementDescriptionKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCreateMeasurementDescriptionKAFormModel", frmCreateMeasurementDescriptionKAControllerObj);
	var frmCreateMeasurementDescriptionKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCreateMeasurementDescriptionKAFormModelExtension", frmCreateMeasurementDescriptionKAFormModelObj);
	frmCreateMeasurementDescriptionKAFormModelObj.setFormModelExtensionObj(frmCreateMeasurementDescriptionKAFormModelExtObj);
	appContext.setFormController("frmCreateMeasurementDescriptionKA", frmCreateMeasurementDescriptionKAControllerObj);
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
kony.sdk.mvvm.initMeasurementReadingsForm = function(appContext) {
	var frmMeasurementReadingsModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMeasurementReadingsConfig);
	var frmMeasurementReadingsControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMeasurementReadingsController", appContext, frmMeasurementReadingsModelConfigObj);
	var frmMeasurementReadingsstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMeasurementReadingsControllerExtension",frmMeasurementReadingsControllerObj);
	frmMeasurementReadingsControllerObj.setControllerExtensionObject(frmMeasurementReadingsstrategyObj);
	var frmMeasurementReadingsFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMeasurementReadingsFormModel", frmMeasurementReadingsControllerObj);
	var frmMeasurementReadingsFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMeasurementReadingsFormModelExtension", frmMeasurementReadingsFormModelObj);
	frmMeasurementReadingsFormModelObj.setFormModelExtensionObj(frmMeasurementReadingsFormModelExtObj);
	appContext.setFormController("frmMeasurementReadings", frmMeasurementReadingsControllerObj);
};
kony.sdk.mvvm.initMeasurementsKAForm = function(appContext) {
	var frmMeasurementsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmMeasurementsKAConfig);
	var frmMeasurementsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmMeasurementsKAController", appContext, frmMeasurementsKAModelConfigObj);
	var frmMeasurementsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmMeasurementsKAControllerExtension",frmMeasurementsKAControllerObj);
	frmMeasurementsKAControllerObj.setControllerExtensionObject(frmMeasurementsKAstrategyObj);
	var frmMeasurementsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmMeasurementsKAFormModel", frmMeasurementsKAControllerObj);
	var frmMeasurementsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmMeasurementsKAFormModelExtension", frmMeasurementsKAFormModelObj);
	frmMeasurementsKAFormModelObj.setFormModelExtensionObj(frmMeasurementsKAFormModelExtObj);
	appContext.setFormController("frmMeasurementsKA", frmMeasurementsKAControllerObj);
};
kony.sdk.mvvm.initReadingExecutionForm = function(appContext) {
	var frmReadingExecutionModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmReadingExecutionConfig);
	var frmReadingExecutionControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmReadingExecutionController", appContext, frmReadingExecutionModelConfigObj);
	var frmReadingExecutionstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmReadingExecutionControllerExtension",frmReadingExecutionControllerObj);
	frmReadingExecutionControllerObj.setControllerExtensionObject(frmReadingExecutionstrategyObj);
	var frmReadingExecutionFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmReadingExecutionFormModel", frmReadingExecutionControllerObj);
	var frmReadingExecutionFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmReadingExecutionFormModelExtension", frmReadingExecutionFormModelObj);
	frmReadingExecutionFormModelObj.setFormModelExtensionObj(frmReadingExecutionFormModelExtObj);
	appContext.setFormController("frmReadingExecution", frmReadingExecutionControllerObj);
};
kony.sdk.mvvm.initHistoryForm = function(appContext) {
	var frmHistoryModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmHistoryConfig);
	var frmHistoryControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmHistoryController", appContext, frmHistoryModelConfigObj);
	var frmHistorystrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmHistoryControllerExtension",frmHistoryControllerObj);
	frmHistoryControllerObj.setControllerExtensionObject(frmHistorystrategyObj);
	var frmHistoryFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmHistoryFormModel", frmHistoryControllerObj);
	var frmHistoryFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmHistoryFormModelExtension", frmHistoryFormModelObj);
	frmHistoryFormModelObj.setFormModelExtensionObj(frmHistoryFormModelExtObj);
	appContext.setFormController("frmHistory", frmHistoryControllerObj);
};
kony.sdk.mvvm.initOrderAssetKAForm = function(appContext){
  	var frmOrderAssetKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmOrderAssetKAConfig);
    var frmOrderAssetKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmOrderAssetKAController", appContext, frmOrderAssetKAModelConfigObj);
  	var frmOrderAssetKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmOrderAssetKAControllerExtension", frmOrderAssetKAControllerObj);
  	frmOrderAssetKAControllerObj.setControllerExtensionObject(frmOrderAssetKAControllerExtObj);
  	var frmOrderAssetKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmOrderAssetKAFormModel", frmOrderAssetKAControllerObj);
  	var frmOrderAssetKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmOrderAssetKAFormModelExtension", frmOrderAssetKAFormModelObj);
  	frmOrderAssetKAFormModelObj.setFormModelExtensionObj(frmOrderAssetKAFormModelExtObj);
    appContext.setFormController("frmOrderAssetKA", frmOrderAssetKAControllerObj);
};
kony.sdk.mvvm.initBillOfMaterialKAForm = function(appContext){
  	var frmBillOfMaterialKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmBillOfMaterialKAConfig);
    var frmBillOfMaterialKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmBillOfMaterialKAController", appContext, frmBillOfMaterialKAModelConfigObj);
  	var frmBillOfMaterialKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmBillOfMaterialKAControllerExtension", frmBillOfMaterialKAControllerObj);
  	frmBillOfMaterialKAControllerObj.setControllerExtensionObject(frmBillOfMaterialKAControllerExtObj);
  	var frmBillOfMaterialKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmBillOfMaterialKAFormModel", frmBillOfMaterialKAControllerObj);
  	var frmBillOfMaterialKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmBillOfMaterialKAFormModelExtension", frmBillOfMaterialKAFormModelObj);
  	frmBillOfMaterialKAFormModelObj.setFormModelExtensionObj(frmBillOfMaterialKAFormModelExtObj);
    appContext.setFormController("frmBillOfMaterialKA", frmBillOfMaterialKAControllerObj);
};
kony.sdk.mvvm.initAddTimeExpenseKAForm = function(appContext) {
	var frmAddTimeExpenseKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAddTimeExpenseKAConfig);
	var frmAddTimeExpenseKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAddTimeExpenseKAController", appContext, frmAddTimeExpenseKAModelConfigObj);
	var frmAddTimeExpenseKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAddTimeExpenseKAControllerExtension",frmAddTimeExpenseKAControllerObj);
	frmAddTimeExpenseKAControllerObj.setControllerExtensionObject(frmAddTimeExpenseKAstrategyObj);
	var frmAddTimeExpenseKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAddTimeExpenseKAFormModel", frmAddTimeExpenseKAControllerObj);
	var frmAddTimeExpenseKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAddTimeExpenseKAFormModelExtension", frmAddTimeExpenseKAFormModelObj);
	frmAddTimeExpenseKAFormModelObj.setFormModelExtensionObj(frmAddTimeExpenseKAFormModelExtObj);
	appContext.setFormController("frmAddTimeExpenseKA", frmAddTimeExpenseKAControllerObj);
};
kony.sdk.mvvm.initAddEditExpenseItemKAForm = function(appContext) {
	var frmAddEditExpenseItemKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAddEditExpenseItemKAConfig);
	var frmAddEditExpenseItemKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAddEditExpenseItemKAController", appContext, frmAddEditExpenseItemKAModelConfigObj);
	var frmAddEditExpenseItemKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAddEditExpenseItemKAControllerExtension",frmAddEditExpenseItemKAControllerObj);
	frmAddEditExpenseItemKAControllerObj.setControllerExtensionObject(frmAddEditExpenseItemKAstrategyObj);
	var frmAddEditExpenseItemKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAddEditExpenseItemKAFormModel", frmAddEditExpenseItemKAControllerObj);
	var frmAddEditExpenseItemKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAddEditExpenseItemKAFormModelExtension", frmAddEditExpenseItemKAFormModelObj);
	frmAddEditExpenseItemKAFormModelObj.setFormModelExtensionObj(frmAddEditExpenseItemKAFormModelExtObj);
	appContext.setFormController("frmAddEditExpenseItemKA", frmAddEditExpenseItemKAControllerObj);
};
kony.sdk.mvvm.initAddEditTimeItemKAForm = function(appContext) {
	var frmAddEditTimeItemKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmAddEditTimeItemKAConfig);
	var frmAddEditTimeItemKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmAddEditTimeItemKAController", appContext, frmAddEditTimeItemKAModelConfigObj);
	var frmAddEditTimeItemKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmAddEditTimeItemKAControllerExtension",frmAddEditTimeItemKAControllerObj);
	frmAddEditTimeItemKAControllerObj.setControllerExtensionObject(frmAddEditTimeItemKAstrategyObj);
	var frmAddEditTimeItemKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmAddEditTimeItemKAFormModel", frmAddEditTimeItemKAControllerObj);
	var frmAddEditTimeItemKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmAddEditTimeItemKAFormModelExtension", frmAddEditTimeItemKAFormModelObj);
	frmAddEditTimeItemKAFormModelObj.setFormModelExtensionObj(frmAddEditTimeItemKAFormModelExtObj);
	appContext.setFormController("frmAddEditTimeItemKA", frmAddEditTimeItemKAControllerObj);
};
kony.sdk.mvvm.initTimeAndExpenseAttachmentKAForm = function(appContext) {
	var frmTimeAndExpenseAttachmentKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTimeAndExpenseAttachmentKAConfig);
	var frmTimeAndExpenseAttachmentKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTimeAndExpenseAttachmentKAController", appContext, frmTimeAndExpenseAttachmentKAModelConfigObj);
	var frmTimeAndExpenseAttachmentKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTimeAndExpenseAttachmentKAControllerExtension",frmTimeAndExpenseAttachmentKAControllerObj);
	frmTimeAndExpenseAttachmentKAControllerObj.setControllerExtensionObject(frmTimeAndExpenseAttachmentKAstrategyObj);
	var frmTimeAndExpenseAttachmentKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTimeAndExpenseAttachmentKAFormModel", frmTimeAndExpenseAttachmentKAControllerObj);
	var frmTimeAndExpenseAttachmentKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTimeAndExpenseAttachmentKAFormModelExtension", frmTimeAndExpenseAttachmentKAFormModelObj);
	frmTimeAndExpenseAttachmentKAFormModelObj.setFormModelExtensionObj(frmTimeAndExpenseAttachmentKAFormModelExtObj);
	appContext.setFormController("frmTimeAndExpenseAttachmentKA", frmTimeAndExpenseAttachmentKAControllerObj);
};
kony.sdk.mvvm.initTimeAndExpenseAttachmentImageKAForm = function(appContext) {
	var frmTimeAndExpenseAttachmentImageKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmTimeAndExpenseAttachmentImageKAConfig);
	var frmTimeAndExpenseAttachmentImageKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmTimeAndExpenseAttachmentImageKAController", appContext, frmTimeAndExpenseAttachmentImageKAModelConfigObj);
	var frmTimeAndExpenseAttachmentImageKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmTimeAndExpenseAttachmentImageKAControllerExtension",frmTimeAndExpenseAttachmentImageKAControllerObj);
	frmTimeAndExpenseAttachmentImageKAControllerObj.setControllerExtensionObject(frmTimeAndExpenseAttachmentImageKAstrategyObj);
	var frmTimeAndExpenseAttachmentImageKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmTimeAndExpenseAttachmentImageKAFormModel", frmTimeAndExpenseAttachmentImageKAControllerObj);
	var frmTimeAndExpenseAttachmentImageKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmTimeAndExpenseAttachmentImageKAFormModelExtension", frmTimeAndExpenseAttachmentImageKAFormModelObj);
	frmTimeAndExpenseAttachmentImageKAFormModelObj.setFormModelExtensionObj(frmTimeAndExpenseAttachmentImageKAFormModelExtObj);
	appContext.setFormController("frmTimeAndExpenseAttachmentImageKA", frmTimeAndExpenseAttachmentImageKAControllerObj);
};
kony.sdk.mvvm.initStockLocationListKAForm = function(appContext) {
	var frmStockLocationListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmStockLocationListKAConfig);
	var frmStockLocationListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmStockLocationListKAController", appContext, frmStockLocationListKAModelConfigObj);
	var frmStockLocationListKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmStockLocationListKAControllerExtension",frmStockLocationListKAControllerObj);
	frmStockLocationListKAControllerObj.setControllerExtensionObject(frmStockLocationListKAstrategyObj);
	var frmStockLocationListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmStockLocationListKAFormModel", frmStockLocationListKAControllerObj);
	var frmStockLocationListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmStockLocationListKAFormModelExtension", frmStockLocationListKAFormModelObj);
	frmStockLocationListKAFormModelObj.setFormModelExtensionObj(frmStockLocationListKAFormModelExtObj);
	appContext.setFormController("frmStockLocationListKA", frmStockLocationListKAControllerObj);
};
kony.sdk.mvvm.initStockLocationDetailsKAForm = function(appContext) {
	var frmStockLocationDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmStockLocationDetailsKAConfig);
	var frmStockLocationDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmStockLocationDetailsKAController", appContext, frmStockLocationDetailsKAModelConfigObj);
	var frmStockLocationDetailsKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmStockLocationDetailsKAControllerExtension",frmStockLocationDetailsKAControllerObj);
	frmStockLocationDetailsKAControllerObj.setControllerExtensionObject(frmStockLocationDetailsKAstrategyObj);
	var frmStockLocationDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmStockLocationDetailsKAFormModel", frmStockLocationDetailsKAControllerObj);
	var frmStockLocationDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmStockLocationDetailsKAFormModelExtension", frmStockLocationDetailsKAFormModelObj);
	frmStockLocationDetailsKAFormModelObj.setFormModelExtensionObj(frmStockLocationDetailsKAFormModelExtObj);
	appContext.setFormController("frmStockLocationDetailsKA", frmStockLocationDetailsKAControllerObj);
};
kony.sdk.mvvm.initSummaryKAForm = function(appContext) {
	var frmSummaryKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSummaryKAConfig);
	var frmSummaryKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSummaryKAController", appContext, frmSummaryKAModelConfigObj);
	var frmSummaryKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSummaryKAControllerExtension",frmSummaryKAControllerObj);
	frmSummaryKAControllerObj.setControllerExtensionObject(frmSummaryKAstrategyObj);
	var frmSummaryKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSummaryKAFormModel", frmSummaryKAControllerObj);
	var frmSummaryKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSummaryKAFormModelExtension", frmSummaryKAFormModelObj);
	frmSummaryKAFormModelObj.setFormModelExtensionObj(frmSummaryKAFormModelExtObj);
	appContext.setFormController("frmSummaryKA", frmSummaryKAControllerObj);
};
kony.sdk.mvvm.initCashPaymentKAForm = function(appContext) {
	var frmCashPaymentKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCashPaymentKAConfig);
	var frmCashPaymentKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCashPaymentKAController", appContext, frmCashPaymentKAModelConfigObj);
	var frmCashPaymentKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCashPaymentKAControllerExtension",frmCashPaymentKAControllerObj);
	frmCashPaymentKAControllerObj.setControllerExtensionObject(frmCashPaymentKAstrategyObj);
	var frmCashPaymentKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCashPaymentKAFormModel", frmCashPaymentKAControllerObj);
	var frmCashPaymentKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCashPaymentKAFormModelExtension", frmCashPaymentKAFormModelObj);
	frmCashPaymentKAFormModelObj.setFormModelExtensionObj(frmCashPaymentKAFormModelExtObj);
	appContext.setFormController("frmCashPaymentKA", frmCashPaymentKAControllerObj);
};
kony.sdk.mvvm.initInvoicePdfKAForm = function(appContext) {
	var frmInvoicePdfKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmInvoicePdfKAConfig);
	var frmInvoicePdfKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmInvoicePdfKAController", appContext, frmInvoicePdfKAModelConfigObj);
	var frmInvoicePdfKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmInvoicePdfKAControllerExtension",frmInvoicePdfKAControllerObj);
	frmInvoicePdfKAControllerObj.setControllerExtensionObject(frmInvoicePdfKAstrategyObj);
	var frmInvoicePdfKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmInvoicePdfKAFormModel", frmInvoicePdfKAControllerObj);
	var frmInvoicePdfKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmInvoicePdfKAFormModelExtension", frmInvoicePdfKAFormModelObj);
	frmInvoicePdfKAFormModelObj.setFormModelExtensionObj(frmInvoicePdfKAFormModelExtObj);
	appContext.setFormController("frmInvoicePdfKA", frmInvoicePdfKAControllerObj);
};

kony.sdk.mvvm.initSelectPaymentMethodKAForm = function(appContext) {
	var frmSelectPaymentMethodKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmSelectPaymentMethodKAConfig);
	var frmSelectPaymentMethodKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmSelectPaymentMethodKAController", appContext, frmSelectPaymentMethodKAModelConfigObj);
	var frmSelectPaymentMethodKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmSelectPaymentMethodKAControllerExtension",frmSelectPaymentMethodKAControllerObj);
	frmSelectPaymentMethodKAControllerObj.setControllerExtensionObject(frmSelectPaymentMethodKAstrategyObj);
	var frmSelectPaymentMethodKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmSelectPaymentMethodKAFormModel", frmSelectPaymentMethodKAControllerObj);
	var frmSelectPaymentMethodKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmSelectPaymentMethodKAFormModelExtension", frmSelectPaymentMethodKAFormModelObj);
	frmSelectPaymentMethodKAFormModelObj.setFormModelExtensionObj(frmSelectPaymentMethodKAFormModelExtObj);
	appContext.setFormController("frmSelectPaymentMethodKA", frmSelectPaymentMethodKAControllerObj);
};

kony.sdk.mvvm.initCardPaymentKAForm = function(appContext) {
	var frmCardPaymentKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmCardPaymentKAConfig);
	var frmCardPaymentKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmCardPaymentKAController", appContext, frmCardPaymentKAModelConfigObj);
	var frmCardPaymentKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmCardPaymentKAControllerExtension",frmCardPaymentKAControllerObj);
	frmCardPaymentKAControllerObj.setControllerExtensionObject(frmCardPaymentKAstrategyObj);
	var frmCardPaymentKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmCardPaymentKAFormModel", frmCardPaymentKAControllerObj);
	var frmCardPaymentKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmCardPaymentKAFormModelExtension", frmCardPaymentKAFormModelObj);
	frmCardPaymentKAFormModelObj.setFormModelExtensionObj(frmCardPaymentKAFormModelExtObj);
	appContext.setFormController("frmCardPaymentKA", frmCardPaymentKAControllerObj);
};

kony.sdk.mvvm.initInvoicePdfBrowserKAForm = function(appContext) {
	var frmInvoicePdfBrowserKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmInvoicePdfBrowserKAConfig);
	var frmInvoicePdfBrowserKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmInvoicePdfBrowserKAController", appContext, frmInvoicePdfBrowserKAModelConfigObj);
	var frmInvoicePdfBrowserKAstrategyObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmInvoicePdfBrowserKAControllerExtension",frmInvoicePdfBrowserKAControllerObj);
	frmInvoicePdfBrowserKAControllerObj.setControllerExtensionObject(frmInvoicePdfBrowserKAstrategyObj);
	var frmInvoicePdfBrowserKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmInvoicePdfBrowserKAFormModel", frmInvoicePdfBrowserKAControllerObj);
	var frmInvoicePdfBrowserKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmInvoicePdfBrowserKAFormModelExtension", frmInvoicePdfBrowserKAFormModelObj);
	frmInvoicePdfBrowserKAFormModelObj.setFormModelExtensionObj(frmInvoicePdfBrowserKAFormModelExtObj);
	appContext.setFormController("frmInvoicePdfBrowserKA", frmInvoicePdfBrowserKAControllerObj);
};