function frmCOIImageFromGalleryKA(eventobject) {
    return AS_Button_354948ad970f48de8bb7ed17c8b8d9c8(eventobject);
}

function AS_Button_354948ad970f48de8bb7ed17c8b8d9c8(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteImagesKA");
    controller.performAction("getImageFromGallery");
}