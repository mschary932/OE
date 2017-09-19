function frmDateFilterOnDeviceBackKA(eventobject) {
    return p2kwiet1234563580139_frmDateFilterKA_Android_onDeviceBack_seq0(eventobject);
}

function p2kwiet1234563580139_frmDateFilterKA_Android_onDeviceBack_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm");
}