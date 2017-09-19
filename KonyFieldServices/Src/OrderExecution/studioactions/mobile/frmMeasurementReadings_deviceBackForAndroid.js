function frmMeasurementReadings_deviceBackForAndroid(eventobject) {
    return AS_Form_42679c033e434715a21ed07a9fcbfa69(eventobject);
}

function AS_Form_42679c033e434715a21ed07a9fcbfa69(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}