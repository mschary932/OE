function frmTemplateToggleSectionOnClickKA(eventobject) {
    return AS_FlexContainer_c72c45210ba246de99f31f78201cb90e(eventobject);
}

function AS_FlexContainer_c72c45210ba246de99f31f78201cb90e(eventobject) {
    var SectionId = parseInt(((this.id).substring(3))).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("makeSectionVisible", [SectionId]);
    controller.performAction("changeToAttemptedState", [SectionId])
}