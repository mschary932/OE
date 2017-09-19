function frmSurveyBtnTextAreaDoneOnClickKA(eventobject) {
    return AS_Button_fda0552a6e9c439cbd33709cd86986db(eventobject);
}

function AS_Button_fda0552a6e9c439cbd33709cd86986db(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("setTextField", ["DONE"]);
}