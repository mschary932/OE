function frmAddEditTimeItemKA_OnCancelButtonKA(eventobject) {
    return AS_Button_65438bc99bbb4cbb871daa7e33f9d076(eventobject);
}

function AS_Button_65438bc99bbb4cbb871daa7e33f9d076(eventobject) {
    var Controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formModel = Controller.getFormModel();
    formModel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", false);
}