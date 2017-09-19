function frmMyOrderImgChevronOnTouchEndKA(eventobject, x, y) {
    return AS_Image_4af9d2d48fbc4d028e4b956bed3444c5(eventobject, x, y);
}

function AS_Image_4af9d2d48fbc4d028e4b956bed3444c5(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderExecutionForm");
}