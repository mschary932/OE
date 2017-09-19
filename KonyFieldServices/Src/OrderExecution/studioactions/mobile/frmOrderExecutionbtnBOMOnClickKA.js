function frmOrderExecutionBtnBOMOnCLickKA(eventobject) {
    return AS_Button_da0a628f59b741b5b48cfa15da924f03(eventobject);
}

function AS_Button_da0a628f59b741b5b48cfa15da924f03(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
    controller.performAction("showOrderObjectFromExecution");
}