function tmpMeasurementReadingSegKA_deleteReadingKA(eventobject, context) {
    return AS_Button_a37b7ff2a4c74cc48bc52313aa824ffb(eventobject, context);
}

function AS_Button_a37b7ff2a4c74cc48bc52313aa824ffb(eventobject, context) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDeletePopup");
}