function frmOrderExecutionBtnBackToTaskDetailsOnClickKA(eventobject) {
    return AS_Button_a29baf2dbff14f0c88200214427318b6(eventobject);
}

function AS_Button_a29baf2dbff14f0c88200214427318b6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("BackToOrderDetailsTwo");
}