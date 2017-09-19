function frmTaskExecutionimgBarCodeIcon2OnTouchEndKA(eventobject, x, y) {
    return AS_Image_d96d16e383864b8c87b15483aa9ddfd7(eventobject, x, y);
}

function AS_Image_d96d16e383864b8c87b15483aa9ddfd7(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showStockLocationFlex");
}