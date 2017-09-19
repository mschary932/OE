function frmOrderExectBackLocationKA(eventobject) {
    return AS_Button_ab3a649fd7da4e5485938d1031707605(eventobject);
}

function AS_Button_ab3a649fd7da4e5485938d1031707605(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("BackToOrderDetailsTwo");
}