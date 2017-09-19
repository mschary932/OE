function frmCompleteOrderBtnCancelTimeExpenseOnClickKA(eventobject) {
    return AS_Button_5a2ae9063fd445dd9ed0626bd842a7df(eventobject);
}

function AS_Button_5a2ae9063fd445dd9ed0626bd842a7df(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("closeAddTimeExpense");
}