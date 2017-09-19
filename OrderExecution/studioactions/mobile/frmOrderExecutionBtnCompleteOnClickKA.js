function frmOrderExecutionBtnCompleteOnClickKA(eventobject) {
    return AS_Button_bb0c1e9bee2a48f3980c1ac2b6f70add(eventobject);
}

function AS_Button_bb0c1e9bee2a48f3980c1ac2b6f70add(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
    controller.performAction("changeStatusForWorkorder");
}