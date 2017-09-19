function frmOrderExecutionBtnBackToOrderDetailsOnClickKA(eventobject) {
    return AS_Button_64a949d009ff4bcbbed32d36e51ab0ca(eventobject);
}

function AS_Button_64a949d009ff4bcbbed32d36e51ab0ca(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("BackToOrderDetailsTwo");
}