function frmTaskExecutionBtnSettingsKA(eventobject) {
    return AS_Button_f923ba174aa242a9af8b98b05fe031c1(eventobject);
}

function AS_Button_f923ba174aa242a9af8b98b05fe031c1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSettingScreen");
}