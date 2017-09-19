function frmOrderExecutionBtnExpenseItemCancelOnClickKA(eventobject) {
    return AS_Button_1e9c94cc431044bdac62b0dc4c483563(eventobject);
}

function AS_Button_1e9c94cc431044bdac62b0dc4c483563(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}