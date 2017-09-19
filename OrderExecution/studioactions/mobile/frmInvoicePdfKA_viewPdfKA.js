function frmInvoicePdfKA_viewPdfKA(eventobject) {
    return AS_FlexContainer_5fb677f08c87483897ae572069db8e58(eventobject);
}

function AS_FlexContainer_5fb677f08c87483897ae572069db8e58(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("viewInvoicePdf");
}