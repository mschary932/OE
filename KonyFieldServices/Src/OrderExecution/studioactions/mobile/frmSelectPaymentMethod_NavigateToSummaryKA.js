function frmSelectPaymentMethod_NavigateToSummaryKA(eventobject) {
    return AS_Button_4a15211c50c047be8b972a729a58b0fd(eventobject);
}

function AS_Button_4a15211c50c047be8b972a729a58b0fd(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}