function frmTemplateflxQuestionOnTouchStartKA(eventobject, x, y) {
    return AS_FlexContainer_587f3b9de128448a84d4f80e5dad53d2(eventobject, x, y);
}

function AS_FlexContainer_587f3b9de128448a84d4f80e5dad53d2(eventobject, x, y) {
    var ques = parseInt((this.id).substring(3)).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("changeFlexSkins", [ques]);
}