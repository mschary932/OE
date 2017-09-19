function frmTemplateTextBoxOnTextChangeKA(eventobject, changedtext) {
    return AS_TextField_3ae40c2bb16c4dbe9407c9e0453edf51(eventobject, changedtext);
}

function AS_TextField_3ae40c2bb16c4dbe9407c9e0453edf51(eventobject, changedtext) {
    var ques = parseInt((this.id).substring(3)).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveInputValue", [ques, "TextBox"]);
    var formModel = controller.getFormModel();
    if (this.text != "") formModel.setViewAttributeByProperty("dyn" + ques + "imgQuesType", "src", "answered.png");
    else formModel.setViewAttributeByProperty("dyn" + ques + "imgQuesType", "src", "not_answered_questions.png");
}