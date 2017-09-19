function frmTaskExecutionbtnBack2OnClickKA(eventobject) {
    return AS_Button_db9cd0209cfc47d9971dd23895e81ea9(eventobject);
}

function AS_Button_db9cd0209cfc47d9971dd23895e81ea9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backOnlineCall");
}