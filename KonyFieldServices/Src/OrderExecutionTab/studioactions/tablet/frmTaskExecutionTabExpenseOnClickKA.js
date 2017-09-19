function frmTaskExecutionTabExpenseOnClickKA(eventobject) {
    return AS_Button_a9f463ca6d3c4d07b43e8a6855457992(eventobject);
}

function AS_Button_a9f463ca6d3c4d07b43e8a6855457992(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExpenseSegment");
}