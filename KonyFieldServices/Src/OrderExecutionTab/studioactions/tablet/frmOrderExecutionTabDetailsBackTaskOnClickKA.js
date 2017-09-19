function frmOrderExecutionTabDetailsBackTaskOnClickKA(eventobject) {
    return AS_Button_09c2a3e44b4a4c869295f3d8d849bcae(eventobject);
}

function AS_Button_09c2a3e44b4a4c869295f3d8d849bcae(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("BackToOrderDetailsTwo");
}