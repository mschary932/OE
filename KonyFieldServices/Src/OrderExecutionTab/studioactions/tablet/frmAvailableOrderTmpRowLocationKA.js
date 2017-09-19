function frmAvailableOrderTmpRowLocationKA(eventobject, context) {
    return AS_Button_14e907e90806422990ad971da16514f9(eventobject, context);
}

function AS_Button_14e907e90806422990ad971da16514f9(eventobject, context) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderBallonOnPinTap");
}