function frmNewTaskOnDeviceBAckKA(eventobject) {
    return AS_Form_7c10414a49e647219c0a2e368bad9a5b(eventobject);
}

function AS_Form_7c10414a49e647219c0a2e368bad9a5b(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}