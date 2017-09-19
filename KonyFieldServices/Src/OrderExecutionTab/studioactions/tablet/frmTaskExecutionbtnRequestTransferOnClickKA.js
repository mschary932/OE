function frmTaskExecutionbtnRequestTransferOnClickKA(eventobject) {
    return AS_Button_3b8bb73c27714588a3333c58d5ed4525(eventobject);
}

function AS_Button_3b8bb73c27714588a3333c58d5ed4525(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showRequestPopUp");
}