function cancelViewsfrmMeasurementsKA(eventobject) {
    return AS_Button_b242905575f9470492629b0c2cc7c071(eventobject);
}

function AS_Button_b242905575f9470492629b0c2cc7c071(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("applyViews", [false]);
}