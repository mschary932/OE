function frmInvoicePdfBrowserKA_loadBrowserDataKA(eventobject) {
    return AS_Form_72ccad0445f14a86b3504b110f679f09(eventobject);
}

function AS_Form_72ccad0445f14a86b3504b110f679f09(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("loadBrowserData");
}