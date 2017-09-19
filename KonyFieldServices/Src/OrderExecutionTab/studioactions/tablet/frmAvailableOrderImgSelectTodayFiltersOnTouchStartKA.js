function frmAvailableOrderImgSelectTodayFiltersOnTouchStartKA(eventobject, x, y) {
    return AS_Image_12c6776c44414841907a1de16dd6066b(eventobject, x, y);
}

function AS_Image_12c6776c44414841907a1de16dd6066b(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectToday");
    controller.performAction("indicateIfAnyDateSelected");
}