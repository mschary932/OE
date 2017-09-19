function frmTemplateflxTimePickerOnClickKA(eventobject) {
    return AS_FlexContainer_c4c22c2eb06a4c6da23dbafd4f6ec30b(eventobject);
}

function AS_FlexContainer_c4c22c2eb06a4c6da23dbafd4f6ec30b(eventobject) {
    selectedQuestion = parseInt(((this.id).substring(3))).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxTimePickerBg", "isVisible", true);
}