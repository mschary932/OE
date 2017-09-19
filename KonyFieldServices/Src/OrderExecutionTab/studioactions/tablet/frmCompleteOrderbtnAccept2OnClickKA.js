function frmCompleteOrderbtnAccept2OnClickKA(eventobject) {
    return AS_Button_cad0556c392e423f8b8e67703c658327(eventobject);
}

function AS_Button_cad0556c392e423f8b8e67703c658327(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showConfirmationPopUpFlex");
}