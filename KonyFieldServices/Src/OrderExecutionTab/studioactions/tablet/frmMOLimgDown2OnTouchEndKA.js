function frmMOLimgDown2OnTouchEndKA(eventobject, x, y) {
    return AS_Image_f28f23290643447087132cfa023b01b7(eventobject, x, y);
}

function AS_Image_f28f23290643447087132cfa023b01b7(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onImgDown2Call");
}