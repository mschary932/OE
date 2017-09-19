function frmSurveyflxConfirmCrossOnClickKA(eventobject) {
    return AS_FlexContainer_e01a3c3919ce4d5f982709f1e81eb084(eventobject);
}

function AS_FlexContainer_e01a3c3919ce4d5f982709f1e81eb084(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxConfirmbg", "isVisible", false);
}