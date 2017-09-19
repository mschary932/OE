function frmAddEditTimeItemKA_OnCalenderDoneBtnKA(eventobject) {
    return AS_Button_51b85c7326bb47f9b609a299b51a95f7(eventobject);
}

function AS_Button_51b85c7326bb47f9b609a299b51a95f7(eventobject) {
    var Controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formModel = Controller.getFormModel();
    inputValue = formModel.getViewAttributeByProperty("CalenderrBg", "dateComponents");
    var date = inputValue[0] + "/" + inputValue[1] + "/" + inputValue[2];
    formModel.setViewAttributeByProperty("lblSelectDateKA", "text", moment(date, "DD/MM/YYYY").format(kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE")));
    formModel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", false);
}