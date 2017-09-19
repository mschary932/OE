function frmNotesListOnDeviceBackKA(eventobject) {
    return AS_Form_6ff4afadd1004b30948cfe483b33472f(eventobject);
}

function AS_Form_6ff4afadd1004b30948cfe483b33472f(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}