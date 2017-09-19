function frmSurveyBtnNoOnClickKA(eventobject) {
    return AS_Button_8d0d9f4a32d94ed9ac1c2640873ade18(eventobject);
}

function AS_Button_8d0d9f4a32d94ed9ac1c2640873ade18(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxCancelBg", "isVisible", false);
}