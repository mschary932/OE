function frmCompleteOrderSegInvoiceDetailsOnRowClickkA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_aed6e444f9564de0a380063000e789a9(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_aed6e444f9564de0a380063000e789a9(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSendEmailKA");
}