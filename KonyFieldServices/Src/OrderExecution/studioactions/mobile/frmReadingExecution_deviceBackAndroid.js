function frmReadingExecution_deviceBackAndroid(eventobject) {
    return AS_Form_9f25342436524fc3bd896659c7c783e2(eventobject);
}

function AS_Form_9f25342436524fc3bd896659c7c783e2(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}