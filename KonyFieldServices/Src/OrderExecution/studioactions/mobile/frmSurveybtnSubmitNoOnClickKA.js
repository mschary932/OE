function frmSurveybtnSubmitNoOnClickKA(eventobject) {
    return AS_Button_2427f5befb8e48abb438a830f4aa9f51(eventobject);
}

function AS_Button_2427f5befb8e48abb438a830f4aa9f51(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction('navigateBack');
}