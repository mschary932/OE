function frmCOSStartTimeEditBtnOnClickKA(eventobject, x, y) {
    return AS_Image_ff28a05121ae4ab798fad7dc02eac4ad(eventobject, x, y);
}

function AS_Image_ff28a05121ae4ab798fad7dc02eac4ad(eventobject, x, y) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderSummaryKA");
    controller.performAction("showTimePickerKA", ["lblStartDateKA", "lblStartTimeKA"]);
}