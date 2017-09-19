function tmpMeasurementReadingKA_editReading(eventobject, context) {
    return AS_Button_43bf8c7807bf40479bbcae0cec8bb51c(eventobject, context);
}

function AS_Button_43bf8c7807bf40479bbcae0cec8bb51c(eventobject, context) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("editMeasurementReading");
}