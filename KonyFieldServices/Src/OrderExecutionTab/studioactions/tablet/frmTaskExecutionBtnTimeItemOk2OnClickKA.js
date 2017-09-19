function frmTaskExecutionBtnTimeItemOk2OnClickKA(eventobject) {
    return AS_Button_d070616cfde44fc794f48f8dd8d7eee2(eventobject);
}

function AS_Button_d070616cfde44fc794f48f8dd8d7eee2(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTimeItemPopUp");
}