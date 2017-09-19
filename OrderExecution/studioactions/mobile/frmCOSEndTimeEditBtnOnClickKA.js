function frmCOSEndTimeEditBtnOnClickKA(eventobject, x, y) {
    return AS_Image_6e63c7dd4660406fb05fc726e039af18(eventobject, x, y);
}

function AS_Image_6e63c7dd4660406fb05fc726e039af18(eventobject, x, y) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderSummaryKA");
    controller.performAction("showTimePickerKA", ["lblEndDateKA", "lblEndTimeKA"]);
}