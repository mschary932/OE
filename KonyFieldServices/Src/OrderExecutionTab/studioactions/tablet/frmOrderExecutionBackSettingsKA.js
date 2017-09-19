function frmOrderExecutionBackSettingsKA(eventobject) {
    return AS_Button_e022e65dfc864e36a7145bbc34897e09(eventobject);
}

function AS_Button_e022e65dfc864e36a7145bbc34897e09(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromSettingScreen");
}