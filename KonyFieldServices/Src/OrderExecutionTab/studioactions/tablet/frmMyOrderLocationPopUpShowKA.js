function frmMyOrderLocationPopUpShowKA(eventobject, context) {
    return AS_Button_5c1320f6f397461fb7f19b3aaf2cb3f7(eventobject, context);
}

function AS_Button_5c1320f6f397461fb7f19b3aaf2cb3f7(eventobject, context) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderBallonOnPinTap");
}