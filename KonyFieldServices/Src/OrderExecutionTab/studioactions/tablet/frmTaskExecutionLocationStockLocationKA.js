function frmTaskExecutionLocationStockLocationKA(eventobject) {
    return AS_Button_8deefa5f3b9843ef9a31ce8e3ca4f864(eventobject);
}

function AS_Button_8deefa5f3b9843ef9a31ce8e3ca4f864(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMapStockLocation");
}