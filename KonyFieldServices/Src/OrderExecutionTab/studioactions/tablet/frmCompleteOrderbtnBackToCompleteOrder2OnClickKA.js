function frmCompleteOrderbtnBackToCompleteOrder2OnClickKA(eventobject) {
    return AS_Button_53df6dd85b4746279ddcb2819adaa8c2(eventobject);
}

function AS_Button_53df6dd85b4746279ddcb2819adaa8c2(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCancelPopUpFlex");
}