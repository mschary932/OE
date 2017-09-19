function frmAvailableOrderBtnSettingOnClickKA(eventobject) {
    return AS_Button_c2a01d92341a4bbc97375fc77ba9b4ac(eventobject);
}

function AS_Button_c2a01d92341a4bbc97375fc77ba9b4ac(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSettingScreen");
}