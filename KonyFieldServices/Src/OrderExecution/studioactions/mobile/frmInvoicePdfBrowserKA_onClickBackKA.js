function frmInvoicePdfBrowserKA_onClickBackKA(eventobject) {
    return AS_Button_7f81d05143f643a2ac39304de1af07ba(eventobject);
}

function AS_Button_7f81d05143f643a2ac39304de1af07ba(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}