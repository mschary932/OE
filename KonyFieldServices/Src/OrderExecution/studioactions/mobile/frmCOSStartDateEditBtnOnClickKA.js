function frmCOSStartDateEditBtnOnClickKA(eventobject, x, y) {
    return AS_Image_e80a0f2a07a042ad8b67dddd5660df7e(eventobject, x, y);
}

function AS_Image_e80a0f2a07a042ad8b67dddd5660df7e(eventobject, x, y) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderSummaryKA");
    controller.performAction("showCalenderWidgetKA", ["lblStartDateKA", "lblStartTimeKA"]);
}