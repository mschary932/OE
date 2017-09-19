function frmOrderExecutionTabExpenseOnClickKA(eventobject) {
    return AS_Button_e79d434a92f44e5dbc8b68141fd2e03a(eventobject);
}

function AS_Button_e79d434a92f44e5dbc8b68141fd2e03a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExpenseSegment");
}