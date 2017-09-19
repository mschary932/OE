function frmResourceExecutionbtnResetOnClickKA(eventobject) {
    return AS_Button_fbeeffcf9de945a5be616f9bff9994cf(eventobject);
}

function AS_Button_fbeeffcf9de945a5be616f9bff9994cf(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelCall");
}