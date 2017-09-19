function frmWorkConfirmationOnDeviceBackKA(eventobject) {
    return AS_Form_c35977c25ed34f8f8f31d68d524336c2(eventobject);
}

function AS_Form_c35977c25ed34f8f8f31d68d524336c2(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("cancelOrderComplete");
}