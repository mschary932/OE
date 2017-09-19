function frmCompleteOrderBtnAddTimeExpenseOnClickKA(eventobject) {
    return AS_Button_5e2fc4d181b64e398d538d420db6feaf(eventobject);
}

function AS_Button_5e2fc4d181b64e398d538d420db6feaf(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddTimeExpense");
}