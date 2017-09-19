function navigateToFrmMeasurementsKA(eventobject) {
    return AS_Button_0e5b0f9c33194ccc921c1820e3ea192b(eventobject);
}

function AS_Button_0e5b0f9c33194ccc921c1820e3ea192b(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementPoints");
}