function frmSurveyBtnCancelOnClickKA(eventobject) {
    return AS_Button_cd01b54e5c3a44cbb546721940dbb881(eventobject);
}

function AS_Button_cd01b54e5c3a44cbb546721940dbb881(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxTimePickerBg", "isVisible", false);
}