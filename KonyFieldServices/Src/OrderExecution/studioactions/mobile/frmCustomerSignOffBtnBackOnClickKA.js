function frmCustomerSignOffBtnBackOnClickKA(eventobject) {
    return AS_Button_2f6ee7965a4c485aac188422f252ee55(eventobject);
}

function AS_Button_2f6ee7965a4c485aac188422f252ee55(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCustomerSignOffKA");
    controller.performAction("cancelOrderComplete");
}