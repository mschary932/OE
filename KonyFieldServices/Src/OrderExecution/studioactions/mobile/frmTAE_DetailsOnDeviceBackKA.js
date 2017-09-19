function frmTAE_DetailsOnDeviceBackKA(eventobject) {
    return AS_Form_004ef400859742b1a1ac41f6fe9e1d54(eventobject);
}

function AS_Form_004ef400859742b1a1ac41f6fe9e1d54(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}