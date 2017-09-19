function frmMeasurementsBackKA(eventobject) {
    return AS_Button_48f36f4317c9421aaba4b8b729deedcd(eventobject);
}

function AS_Button_48f36f4317c9421aaba4b8b729deedcd(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}