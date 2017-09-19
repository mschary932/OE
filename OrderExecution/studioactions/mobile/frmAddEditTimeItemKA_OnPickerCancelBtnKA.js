function frmAddEditTimeItemKA_OnPickerCancelBtnKA(eventobject) {
    return AS_Button_b848351af5f64880a77db9bc6eb5da0c(eventobject);
}

function AS_Button_b848351af5f64880a77db9bc6eb5da0c(eventobject) {
    var Controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formModel = Controller.getFormModel();
    formModel.setViewAttributeByProperty("flxTimePickerBg", "isVisible", false);
}