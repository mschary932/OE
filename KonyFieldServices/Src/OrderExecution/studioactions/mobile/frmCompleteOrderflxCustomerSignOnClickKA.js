function frmCompleteOrderflxCustomerSignOnClickKA(eventobject) {
    return AS_FlexContainer_9db389a50dd445689230ad8df7121d52(eventobject);
}

function AS_FlexContainer_9db389a50dd445689230ad8df7121d52(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA");
    controller.performAction("showCustomerSignOffForm");
}