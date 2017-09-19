function frmOrderExecutionTabTimeExpenseSegmentOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_fc78dc34f174405d9f8bfee7e282a3a7(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_fc78dc34f174405d9f8bfee7e282a3a7(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExpenseDetailsForm");
}