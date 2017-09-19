function frmTaskExecutionFlexAddTimeExpenseOnClickKA(eventobject) {
    return AS_FlexContainer_c97e189dfec74e5f9cc9238f10fd2f88(eventobject);
}

function AS_FlexContainer_c97e189dfec74e5f9cc9238f10fd2f88(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("closeAddTimeExpense");
}