function frmSurveyBtnTextAreaCancelOnClickKA(eventobject) {
    return AS_Button_7645f139e2ba44d0bdf32524d7d095b1(eventobject);
}

function AS_Button_7645f139e2ba44d0bdf32524d7d095b1(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxTextArea", "isVisible", false);
    formmodel.setViewAttributeByProperty("lblTextAreaAnswerKA", "text", "");
    controller.performAction("setTextField", ["CANCEL"]);
}