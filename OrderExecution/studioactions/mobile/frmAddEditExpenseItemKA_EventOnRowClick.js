function frmAddEditExpenseItemKA_EventOnRowClick(eventobject) {
    return AS_ListBox_dd17404621c04b6884cc18957e9ec785(eventobject);
}

function AS_ListBox_dd17404621c04b6884cc18957e9ec785(eventobject) {
    var selRecord = frmAddEditExpenseItemKA.listBoxExpenseTypeKA.selectedKeyValues[0];
    var Name = selRecord[1];
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAddEditExpenseItemKA");
    controller.performAction("populateDescription", [Name]);
}