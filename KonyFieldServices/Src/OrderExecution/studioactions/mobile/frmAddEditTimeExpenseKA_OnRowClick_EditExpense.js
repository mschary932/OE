function frmAddEditTimeExpenseKA_OnRowClick_EditExpense(eventobject) {
    return AS_FlexContainer_dbd41834e24945b7bec1fc2096b32f2e(eventobject);
}

function AS_FlexContainer_dbd41834e24945b7bec1fc2096b32f2e(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToAddScreen", ["Expense"]);
}