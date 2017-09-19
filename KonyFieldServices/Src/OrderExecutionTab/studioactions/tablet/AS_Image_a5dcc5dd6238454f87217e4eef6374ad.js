function AS_Image_a5dcc5dd6238454f87217e4eef6374ad(eventobject, imagesrc, issuccess) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showStockLocationsFlex");
}