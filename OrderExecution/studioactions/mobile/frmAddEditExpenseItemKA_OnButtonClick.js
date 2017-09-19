function frmAddEditExpenseItemKA_OnButtonClick(eventobject) {
    return AS_Button_f1b9df7d1cb14dc8822cefe2b34bbac6(eventobject);
}

function AS_Button_f1b9df7d1cb14dc8822cefe2b34bbac6(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmAddEditTimeItemKA");
    controller.performAction("saveCompleteData");
}