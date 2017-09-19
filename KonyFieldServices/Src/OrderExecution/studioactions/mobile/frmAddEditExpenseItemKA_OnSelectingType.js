function frmAddEditExpenseItemKA_OnSelectingType(eventobject) {
    return AS_ListBox_12f321e278fd4f26a304c9d2c4916e97(eventobject);
}

function AS_ListBox_12f321e278fd4f26a304c9d2c4916e97(eventobject) {
    var selRecord = frmAddEditExpenseItemKA.listBoxExpenseTypeKA.selectedKeyValues[0];
    var Name = selRecord[1];
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAddEditExpenseItemKA");
    controller.performAction("populateDescription", [Name]);
}