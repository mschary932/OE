function frmCOSaveOnClickKA(eventobject) {
    return AS_Button_743f1892022147c7b2557479dba10d31(eventobject);
}

function AS_Button_743f1892022147c7b2557479dba10d31(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA");
    controller.performAction("saveOrderComplete");
}