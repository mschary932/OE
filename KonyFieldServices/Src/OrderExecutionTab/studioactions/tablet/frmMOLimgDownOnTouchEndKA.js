function frmMOLimgDownOnTouchEndKA(eventobject, x, y) {
    return AS_Image_e1c9f6c362eb48e98b91bc56da8d7a24(eventobject, x, y);
}

function AS_Image_e1c9f6c362eb48e98b91bc56da8d7a24(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onImgDownCall");
}