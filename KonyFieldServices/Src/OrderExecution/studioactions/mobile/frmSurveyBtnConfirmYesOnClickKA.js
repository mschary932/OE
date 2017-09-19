function frmSurveyBtnConfirmYesOnClickKA(eventobject) {
    return AS_Button_4d46a7f4dac844af899f4f7b2db848b7(eventobject);
}

function AS_Button_4d46a7f4dac844af899f4f7b2db848b7(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveCompleteData", [false]);
}