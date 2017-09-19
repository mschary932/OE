function frmCODeviceBackKA(eventobject) {
    return AS_Form_281be3bf6aaa4999aca5c2f93189a35e(eventobject);
}

function AS_Form_281be3bf6aaa4999aca5c2f93189a35e(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA");
    controller.performAction("cancelOrderComplete");
}