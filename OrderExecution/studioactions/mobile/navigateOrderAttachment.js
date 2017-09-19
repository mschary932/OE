function navigateOrderAttachment(eventobject) {
    return AS_Button_975349a71f2e4119acd1aeee33922ca5(eventobject);
}

function AS_Button_975349a71f2e4119acd1aeee33922ca5(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementAttachment");
}