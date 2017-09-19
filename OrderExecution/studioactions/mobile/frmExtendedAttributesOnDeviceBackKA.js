function frmExtendedAttributesOnDeviceBackKA(eventobject) {
    return AS_Form_f0810178b87945eb9aebf39b65799cd1(eventobject);
}

function AS_Form_f0810178b87945eb9aebf39b65799cd1(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [false]);
}