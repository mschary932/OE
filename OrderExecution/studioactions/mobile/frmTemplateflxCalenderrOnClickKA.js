function frmTemplateflxCalenderrOnClickKA(eventobject) {
    return AS_FlexContainer_c930df648c4b4ecaa8d81a14eb9914c1(eventobject);
}

function AS_FlexContainer_c930df648c4b4ecaa8d81a14eb9914c1(eventobject) {
    selectedQuestion = parseInt(((this.id).substring(3))).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", true);
}