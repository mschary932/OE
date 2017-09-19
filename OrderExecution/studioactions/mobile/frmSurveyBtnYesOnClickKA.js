function frmSurveyBtnYesOnClickKA(eventobject) {
    return AS_Button_d2b4e28f74244db68fb23c7f78a96569(eventobject);
}

function AS_Button_d2b4e28f74244db68fb23c7f78a96569(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveCompleteData", [true]);
}