function frmAvailableOrderImgShowDistanceKA(eventobject, x, y) {
    return AS_Image_c9205054fe6744c38d53057da9f8aee0(eventobject, x, y);
}

function AS_Image_c9205054fe6744c38d53057da9f8aee0(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderBallonOnPinTap");
}