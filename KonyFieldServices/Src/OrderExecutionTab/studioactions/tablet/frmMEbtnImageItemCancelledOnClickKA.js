function frmMEbtnImageItemCancelledOnClickKA(eventobject) {
    return AS_Button_74bffe3af30940b1845cf89018d674ba(eventobject);
}

function AS_Button_74bffe3af30940b1845cf89018d674ba(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelReadingCreation");
}