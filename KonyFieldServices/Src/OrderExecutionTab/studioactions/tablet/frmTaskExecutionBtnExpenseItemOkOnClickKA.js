function frmTaskExecutionBtnExpenseItemOkOnClickKA(eventobject) {
    return AS_Button_cc34b2582eab455a837ff70bef1c66c1(eventobject);
}

function AS_Button_cc34b2582eab455a837ff70bef1c66c1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}