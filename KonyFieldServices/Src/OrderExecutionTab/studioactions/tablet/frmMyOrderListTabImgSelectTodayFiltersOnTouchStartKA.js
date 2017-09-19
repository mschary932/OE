function frmMyOrderListTabImgSelectTodayFiltersOnTouchStartKA(eventobject, x, y) {
    return AS_Image_6b8897beac624dabaf66ae05d5d46fd7(eventobject, x, y);
}

function AS_Image_6b8897beac624dabaf66ae05d5d46fd7(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectToday");
    controller.performAction("indicateIfAnyDateSelected");
}