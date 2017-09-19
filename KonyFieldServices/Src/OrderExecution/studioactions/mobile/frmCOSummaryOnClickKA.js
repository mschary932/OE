function frmCOSummaryOnClickKA(eventobject) {
    return AS_Button_2e46eb980f854b9d9d6fff959a44a74d(eventobject);
}

function AS_Button_2e46eb980f854b9d9d6fff959a44a74d(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA");
    controller.performAction("showCompleteOrderSummaryform");
}