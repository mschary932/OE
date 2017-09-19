function frmREbtnEditOnClickKA(eventobject) {
    return AS_Button_fd5a6bec5ac14d1bb4a66f1a57ac33bc(eventobject);
}

function AS_Button_fd5a6bec5ac14d1bb4a66f1a57ac33bc(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onEditCall");
}