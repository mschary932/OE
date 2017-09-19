function frmNotesDetailsOnDeviceBackKA(eventobject) {
    return AS_Form_2e36f823b5b44536bd77b11d2c31226d(eventobject);
}

function AS_Form_2e36f823b5b44536bd77b11d2c31226d(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}