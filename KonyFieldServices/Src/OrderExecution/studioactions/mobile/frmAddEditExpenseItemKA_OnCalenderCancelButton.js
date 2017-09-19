function frmAddEditExpenseItemKA_OnCalenderCancelButton(eventobject) {
    return AS_Button_163043a1c9524d80bc35c0220922a85e(eventobject);
}

function AS_Button_163043a1c9524d80bc35c0220922a85e(eventobject) {
    var Controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formModel = Controller.getFormModel();
    formModel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", false);
}