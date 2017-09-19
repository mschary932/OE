function frmOrderExecutionTabDetailsBackContactOnClickKA(eventobject) {
    return AS_Button_b0367f65c77e482fb6109ac0d16babda(eventobject);
}

function AS_Button_b0367f65c77e482fb6109ac0d16babda(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("BackToOrderDetails");
}