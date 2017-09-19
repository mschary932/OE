function frmAddEditTimeItemKA_OnSelectingType(eventobject) {
    return AS_ListBox_94dc968fd4e64618b1e0b52fd101c477(eventobject);
}

function AS_ListBox_94dc968fd4e64618b1e0b52fd101c477(eventobject) {
    var selRecord = frmAddEditTimeItemKA.listBoxExpenseTypeKA.selectedKeyValues[0];
    var Name = selRecord[1];
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAddEditTimeItemKA");
    controller.performAction("populateDescription", [Name]);
}