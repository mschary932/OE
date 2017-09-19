function frmREbtnRejectOnClickKA(eventobject) {
    return AS_Button_22a7adeee32b4b5dae9eb3d2bac3f353(eventobject);
}

function AS_Button_22a7adeee32b4b5dae9eb3d2bac3f353(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelCall");
}