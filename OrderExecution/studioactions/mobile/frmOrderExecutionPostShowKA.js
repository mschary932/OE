function frmOrderExecutionPostShowKA(eventobject) {
    return AS_Form_1e697bb9cb55420f8ebcbf81112f7c8c(eventobject);
}

function AS_Form_1e697bb9cb55420f8ebcbf81112f7c8c(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmOrderExecutionKA");
    controller.performAction("destroySurveyForm");
}