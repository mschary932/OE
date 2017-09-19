function frmTaskExecutionImgResourcesLoadingOnClickKA(eventobject, x, y) {
    return AS_Image_0b8b7eb4a44a4067a71778896f0024a4(eventobject, x, y);
}

function AS_Image_0b8b7eb4a44a4067a71778896f0024a4(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMaterialList");
}