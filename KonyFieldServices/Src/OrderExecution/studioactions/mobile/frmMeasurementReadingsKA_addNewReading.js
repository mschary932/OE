function frmMeasurementReadingsKA_addNewReading(eventobject) {
    return AS_Button_ae6b79f991994b288396340a7e62448a(eventobject);
}

function AS_Button_ae6b79f991994b288396340a7e62448a(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("addMeasurementReading");
}