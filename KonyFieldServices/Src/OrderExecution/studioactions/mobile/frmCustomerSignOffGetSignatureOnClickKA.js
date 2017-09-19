function frmCustomerSignOffGetSignatureOnClickKA(eventobject) {
    return AS_FlexContainer_b64a94344f3c41578c7fb4e7ed651673(eventobject);
}

function AS_FlexContainer_b64a94344f3c41578c7fb4e7ed651673(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCustomerSignOffKA");
    controller.performAction("getSignature");
}