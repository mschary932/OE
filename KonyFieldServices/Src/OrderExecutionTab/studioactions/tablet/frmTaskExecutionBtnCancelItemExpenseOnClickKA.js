function frmTaskExecutionBtnCancelItemExpenseOnClickKA(eventobject) {
    return AS_Button_ed35fe876c354887980e35ebcb97f286(eventobject);
}

function AS_Button_ed35fe876c354887980e35ebcb97f286(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("closeAddTimeExpense");
}