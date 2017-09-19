function frmTaskExecutionbtnBackFromStockLocationOnClickKA(eventobject) {
    return AS_Button_d0404fe847884b74a5fb8c525a858fa6(eventobject);
}

function AS_Button_d0404fe847884b74a5fb8c525a858fa6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backStockDetailsFlexOnlineCalls");
}