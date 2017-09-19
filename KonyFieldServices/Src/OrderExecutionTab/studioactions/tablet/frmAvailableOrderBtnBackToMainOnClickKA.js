function frmAvailableOrderBtnBackToMainOnClickKA(eventobject) {
    return AS_Button_844251599ae6456b99a8af4614b58671(eventobject);
}

function AS_Button_844251599ae6456b99a8af4614b58671(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromSettingScreen");
}