function frmTaskExecutionTabTimeExpenseAddOnClickKA(eventobject) {
    return AS_Button_1174339571194145a2369853a4856769(eventobject);
}

function AS_Button_1174339571194145a2369853a4856769(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddTimeExpense");
}