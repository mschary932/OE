function frmCustomerSignOffCancelLayerOnClickKA(eventobject) {
    return AS_Button_aebd797be41646778851af5f2e19d4dc(eventobject);
}

function AS_Button_aebd797be41646778851af5f2e19d4dc(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCustomerSignOffKA");
    controller.performAction("navigateBack");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flexPopupKA", "isVisible", false);
}