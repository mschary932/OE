function navigateTaskAttachment(eventobject) {
    return AS_Button_cea6f76f12b94a188fa66b8721b1cc8e(eventobject);
}

function AS_Button_cea6f76f12b94a188fa66b8721b1cc8e(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementImages");
}