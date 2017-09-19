function frmAddEditTimeKA_EventOnRowClick(eventobject) {
    return AS_ListBox_ec611c789f6d421face4790b655d24a9(eventobject);
}

function AS_ListBox_ec611c789f6d421face4790b655d24a9(eventobject) {
    var selRecord = frmAddEditTimeItemKA.listBoxExpenseTypeKA.selectedKeyValues[0];
    var Name = selRecord[1];
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAddEditTimeItemKA");
    controller.performAction("populateDescription", [Name]);
}