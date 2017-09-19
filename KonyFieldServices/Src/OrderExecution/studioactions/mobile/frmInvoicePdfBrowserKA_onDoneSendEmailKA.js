function frmInvoicePdfBrowserKA_onDoneSendEmailKA(eventobject, changedtext) {
    return AS_TextField_c14417111be7402fbf492ebeef65ac1a(eventobject, changedtext);
}

function AS_TextField_c14417111be7402fbf492ebeef65ac1a(eventobject, changedtext) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("emailInvoice");
}