function frmORDOnDeviceBackKA(eventobject) {
    return p2kwiet1234563580402_frmOrderResourceDetailsKA_Android_onDeviceBack_seq0(eventobject);
}

function p2kwiet1234563580402_frmOrderResourceDetailsKA_Android_onDeviceBack_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}