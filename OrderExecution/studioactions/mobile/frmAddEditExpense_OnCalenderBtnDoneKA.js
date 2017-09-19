function frmAddEDitExpense_OnCalenderBtnDoneKA(eventobject) {
    return AS_Button_a09cd9119cc84b8db88d8e12b82c3d23(eventobject);
}

function AS_Button_a09cd9119cc84b8db88d8e12b82c3d23(eventobject) {
    var Controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formModel = Controller.getFormModel();
    inputValue = formModel.getViewAttributeByProperty("CalenderrBg", "dateComponents");
    var date = inputValue[0] + "/" + inputValue[1] + "/" + inputValue[2];
    formModel.setViewAttributeByProperty("lblSelectDateKA", "text", moment(date, "DD/MM/YYYY").format(kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("SHORTDATE")));
    formModel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", false);
}