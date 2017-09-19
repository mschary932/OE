function frmWorkConfirmationCancelLayerOnClickKA(eventobject) {
    return AS_Button_5601966523b64b7bacb5e2ece161947a(eventobject);
}

function AS_Button_5601966523b64b7bacb5e2ece161947a(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("navigateBack");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flexPopupKA", "isVisible", false);
}