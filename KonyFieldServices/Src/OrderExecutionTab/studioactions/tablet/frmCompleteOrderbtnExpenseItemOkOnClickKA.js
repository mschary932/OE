function frmCompleteOrderbtnExpenseItemOkOnClickKA(eventobject) {
    return AS_Button_b3babe042d67413e9012495d9231c6f8(eventobject);
}

function AS_Button_b3babe042d67413e9012495d9231c6f8(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}