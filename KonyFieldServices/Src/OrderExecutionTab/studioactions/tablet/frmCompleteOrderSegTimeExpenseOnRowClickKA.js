function frmCompleteOrderSegTimeExpenseOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_cec401427ff046c490b33424f3525360(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_cec401427ff046c490b33424f3525360(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExpenseDetailsForm");
}