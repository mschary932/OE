function frmCustomerSignOffOnDeviceBackKA(eventobject) {
    return AS_Form_f7a73a6d7f144248b7fdd9f39b4ca822(eventobject);
}

function AS_Form_f7a73a6d7f144248b7fdd9f39b4ca822(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCustomerSignOffKA");
    controller.performAction("cancelOrderComplete");
}