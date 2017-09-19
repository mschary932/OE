function frmAddEditExpenseItemKA_OnCurrencySelection(eventobject) {
    return AS_ListBox_d6c9f7c20fb142afb8f44d1cf595a584(eventobject);
}

function AS_ListBox_d6c9f7c20fb142afb8f44d1cf595a584(eventobject) {
    var selRecord = frmAddEditExpenseItemKA.listBoxCurrencyKA.selectedKeyValues[0];
    var Currency = selRecord[1];
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAddEditExpenseItemKA");
    controller.performAction("saveCurrency", [Currency]);
}