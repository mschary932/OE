function frmAddEditTimeItemKA_OnPickerDoneBtnKA(eventobject) {
    return AS_Button_31934bb7b1e8440587fca65d02055c34(eventobject);
}

function AS_Button_31934bb7b1e8440587fca65d02055c34(eventobject) {
    var Controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formModel = Controller.getFormModel();
    inputValue = formModel.getViewAttributeByProperty("TimePicker", "selectedKeys");
    formModel.setViewAttributeByProperty("lblDurationKA", "text", inputValue[0] + ":" + inputValue[1]);
    formModel.setViewAttributeByProperty("flxTimePickerBg", "isVisible", false);
}