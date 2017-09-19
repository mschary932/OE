function frmCOSEndDateEditBtnOnclickKA(eventobject, x, y) {
    return AS_Image_e345e35402934e8ebf55592d4af84f60(eventobject, x, y);
}

function AS_Image_e345e35402934e8ebf55592d4af84f60(eventobject, x, y) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderSummaryKA");
    controller.performAction("showCalenderWidgetKA", ["lblEndDateKA", "lblEndTimeKA"]);
}