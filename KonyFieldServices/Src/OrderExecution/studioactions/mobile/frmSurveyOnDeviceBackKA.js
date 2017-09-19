function frmSurveyOnDeviceBackKA(eventobject) {
    return AS_Form_a7e92fea6fda4f198d3ae89fad4b96ea(eventobject);
}

function AS_Form_a7e92fea6fda4f198d3ae89fad4b96ea(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("deviceBack");
}