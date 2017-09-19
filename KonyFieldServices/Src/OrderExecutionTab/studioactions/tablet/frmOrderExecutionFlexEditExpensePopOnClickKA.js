function frmOrderExecutionFlexEditExpensePopOnClickKA(eventobject) {
    return AS_FlexContainer_6f592e510a1b430a9d16a381e75b942a(eventobject);
}

function AS_FlexContainer_6f592e510a1b430a9d16a381e75b942a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}