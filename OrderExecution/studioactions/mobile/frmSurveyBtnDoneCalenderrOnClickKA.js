function frmSurveyBtnDoneCalenderrOnClickKA(eventobject) {
    return AS_Button_31b74133d25c4d8e9dc69ce421de40e4(eventobject);
}

function AS_Button_31b74133d25c4d8e9dc69ce421de40e4(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveInputValue", [selectedQuestion, "Date"]);
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", false);
}