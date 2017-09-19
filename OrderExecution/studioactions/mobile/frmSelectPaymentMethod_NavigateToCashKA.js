function frmSelectPaymentMethod_NavigateToCashKA(eventobject) {
    return AS_FlexContainer_7783bbc269c14e4098a320c120052bb9(eventobject);
}

function AS_FlexContainer_7783bbc269c14e4098a320c120052bb9(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToCashPayment");
}