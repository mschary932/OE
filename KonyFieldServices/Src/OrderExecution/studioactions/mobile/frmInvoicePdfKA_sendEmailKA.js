function frmInvoicePdfKA_sendEmailKA(eventobject, changedtext) {
    return AS_TextField_93157cd9b6354dbca6fde8a6497533e6(eventobject, changedtext);
}

function AS_TextField_93157cd9b6354dbca6fde8a6497533e6(eventobject, changedtext) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("emailInvoice");
}