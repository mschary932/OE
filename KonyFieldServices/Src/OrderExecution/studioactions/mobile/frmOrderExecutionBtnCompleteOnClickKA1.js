function frmOrderExecutionBtnCompleteOnClickKA1(eventobject) {
    return AS_Button_214f8e2a8ab743a096227c127b934564(eventobject);
}

function AS_Button_214f8e2a8ab743a096227c127b934564(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
    controller.performAction("changeStatusForWorkorder");
}