function frmREbtnRejecItemOnClickKA(eventobject) {
    return AS_Button_e2a1080087404db4965eb532f59688f0(eventobject);
}

function AS_Button_e2a1080087404db4965eb532f59688f0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelCall");
}