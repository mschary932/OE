function frmTemplateNumTextBoxOnTextChangeKA(eventobject, changedtext) {
    return AS_TextField_529b9e620da54118b3d02d3dfb9e92b0(eventobject, changedtext);
}

function AS_TextField_529b9e620da54118b3d02d3dfb9e92b0(eventobject, changedtext) {
    var ques = parseInt((this.id).substring(3)).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveInputValue", [ques, "Num"]);
}