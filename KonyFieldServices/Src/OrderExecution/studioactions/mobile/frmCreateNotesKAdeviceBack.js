function frmCreateNotesKAdeviceBack(eventobject) {
    return AS_Form_6612c1b4b27d4807abfeae28bec688bc(eventobject);
}

function AS_Form_6612c1b4b27d4807abfeae28bec688bc(eventobject) {
    var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = instance.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBackToList", [true]);
}