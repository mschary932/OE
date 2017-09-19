function frmCompleteOrderbtnExpenseItemCancelledOnClickKA(eventobject) {
    return AS_Button_0ed7bbad26794054a82ec97acd9ba823(eventobject);
}

function AS_Button_0ed7bbad26794054a82ec97acd9ba823(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}