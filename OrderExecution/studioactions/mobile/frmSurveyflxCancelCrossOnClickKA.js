function frmSurveyflxCancelCrossOnClickKA(eventobject) {
    return AS_FlexContainer_2d2de4a1d67f4f4db29eb712df8ebcaa(eventobject);
}

function AS_FlexContainer_2d2de4a1d67f4f4db29eb712df8ebcaa(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxCancelBg", "isVisible", false);
}