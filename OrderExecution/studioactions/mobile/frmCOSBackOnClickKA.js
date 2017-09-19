function frmCOSBackOnClickKA(eventobject) {
    return AS_Button_6b0900c4138a425b848ef02b9db78957(eventobject);
}

function AS_Button_6b0900c4138a425b848ef02b9db78957(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("checkStartAndEndDate");
}