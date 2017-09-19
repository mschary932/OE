function frmCustomerSignOffBtnSaveOnClickKA(eventobject) {
    return AS_Button_02aef251302947b691d86b9574cce62f(eventobject);
}

function AS_Button_02aef251302947b691d86b9574cce62f(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCustomerSignOffKA");
    controller.performAction("completeChecklist");
}