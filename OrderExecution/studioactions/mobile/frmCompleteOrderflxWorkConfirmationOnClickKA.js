function frmCompleteOrderflxWorkConfirmationOnClickKA(eventobject) {
    return AS_FlexContainer_628456245dcd4fc59bddc5e7fce560fb(eventobject);
}

function AS_FlexContainer_628456245dcd4fc59bddc5e7fce560fb(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA");
    controller.performAction("showWorkConfirmationform");
}