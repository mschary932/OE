function frmAvailableOrderimgAvailablePin1OnTouchEndKA(eventobject, x, y) {
    return AS_Image_ae7b13e3a4974304ab2fc5495967e85b(eventobject, x, y);
}

function AS_Image_ae7b13e3a4974304ab2fc5495967e85b(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderBallonOnPinTap");
}