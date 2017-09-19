function frmOrderExecutionBtnSettingKA(eventobject) {
    return AS_Button_a22cf1cd93c140e48a26dc34b09fadf6(eventobject);
}

function AS_Button_a22cf1cd93c140e48a26dc34b09fadf6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSettingScreen");
}