function frmTaskExecutionBtnTimeItemCancelledOnClickKA(eventobject) {
    return AS_Button_abc1d614b01d44cb9526abdc5b9e8026(eventobject);
}

function AS_Button_abc1d614b01d44cb9526abdc5b9e8026(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTimeItemPopUp");
}