function frmOrderExecutionFlexAddTimeExpenseOnClickKA(eventobject) {
    return AS_FlexContainer_3c7138c70251429a87d4363f9418c2b7(eventobject);
}

function AS_FlexContainer_3c7138c70251429a87d4363f9418c2b7(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("closeAddTimeExpense");
}