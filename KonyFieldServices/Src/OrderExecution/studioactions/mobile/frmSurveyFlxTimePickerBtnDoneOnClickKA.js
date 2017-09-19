function frmSurveyFlxTimePickerBtnDoneOnClickKA(eventobject) {
    return AS_Button_6a42f460f8244e70991a36ee5314d605(eventobject);
}

function AS_Button_6a42f460f8244e70991a36ee5314d605(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveInputValue", [selectedQuestion, "Time"]);
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxTimePickerBg", "isVisible", false);
}