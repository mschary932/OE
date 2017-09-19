function frmExpenseDetailsTabFormBackOnClickKA(eventobject) {
    return AS_Button_9ba0023c4c41454490866d6011abc3ad(eventobject);
}

function AS_Button_9ba0023c4c41454490866d6011abc3ad(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderExecutionForm");
}