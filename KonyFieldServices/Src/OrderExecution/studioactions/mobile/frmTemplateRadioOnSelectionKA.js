function frmTemplateRadioOnSelectionKA(eventobject) {
    return AS_RadioButtonGroup_9635a9b8081d4ac29729cc55299dfdbf(eventobject);
}

function AS_RadioButtonGroup_9635a9b8081d4ac29729cc55299dfdbf(eventobject) {
    var ques = parseInt((this.id).substring(3)).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveInputValue", [ques, "Radio"]);
}