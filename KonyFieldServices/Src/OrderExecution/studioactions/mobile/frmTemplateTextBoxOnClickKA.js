function frmTemplateTextBoxOnClickKA(eventobject) {
    return AS_FlexContainer_35d58d11d79646378f1aa8d9a85cd03a(eventobject);
}

function AS_FlexContainer_35d58d11d79646378f1aa8d9a85cd03a(eventobject) {
    selectedQuestion = parseInt(((this.id).substring(3))).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("setTextArea", [selectedQuestion]);
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxTextArea", "isVisible", true);
    frmSurveyKA.flxTextArea["isVisible"] = true;
}