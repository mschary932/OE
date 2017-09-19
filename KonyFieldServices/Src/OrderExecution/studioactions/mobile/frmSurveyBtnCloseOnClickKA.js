function frmSurveyBtnCloseOnClickKA(eventobject) {
    return AS_Button_7c627af8abfa4205b18f3dfeff58c61f(eventobject);
}

function AS_Button_7c627af8abfa4205b18f3dfeff58c61f(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxCancelBg", "isVisible", true);
}