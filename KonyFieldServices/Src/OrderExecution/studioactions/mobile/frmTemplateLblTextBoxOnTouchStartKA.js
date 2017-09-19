function frmTemplateLblTextBoxOnTouchStartKA(eventobject, x, y) {
    return AS_Label_dad91ba180df465c915baf33497f8f42(eventobject, x, y);
}

function AS_Label_dad91ba180df465c915baf33497f8f42(eventobject, x, y) {
    selectedQuestion = parseInt(((this.id).substring(3))).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("setTextArea", [selectedQuestion]);
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxTextArea", "isVisible", true);
}