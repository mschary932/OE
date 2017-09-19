function frmCO_OnPaymentClickKA(eventobject) {
    return AS_FlexContainer_b28f80b1a54f469988ac04d9d5b04c22(eventobject);
}

function AS_FlexContainer_b28f80b1a54f469988ac04d9d5b04c22(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToSummaryScreen");
}