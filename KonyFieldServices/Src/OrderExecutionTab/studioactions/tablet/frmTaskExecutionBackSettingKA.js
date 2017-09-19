function frmTaskExecutionBackSettingKA(eventobject) {
    return AS_Button_42100ca9e6b64858b519d07db514b5b1(eventobject);
}

function AS_Button_42100ca9e6b64858b519d07db514b5b1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromSettingScreen");
}