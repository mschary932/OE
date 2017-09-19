function frmSurveyBtnConfirmNoOnClickKA(eventobject) {
    return AS_Button_e0239bf41b6347238b6d9df917de4b50(eventobject);
}

function AS_Button_e0239bf41b6347238b6d9df917de4b50(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxConfirmbg", "isVisible", false);
}