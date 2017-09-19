function frmOrdrExecBackLocInstructionTouchTargetKA(eventobject) {
    return AS_Button_3c125c3bc8b041959c300551688cc853(eventobject);
}

function AS_Button_3c125c3bc8b041959c300551688cc853(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("BackToOrderDetailsTwo");
}