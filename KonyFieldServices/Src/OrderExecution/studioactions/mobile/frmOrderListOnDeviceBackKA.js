function frmOrderListOnDeviceBackKA(eventobject) {
    return p2kwiet1234563580384_frmOrderListKA_Android_onDeviceBack_seq0(eventobject);
}

function p2kwiet1234563580384_frmOrderListKA_Android_onDeviceBack_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("deviceBackForAndroidOrderList");
}