function applyViewsfrmMeasurementsKA(eventobject) {
    return AS_Button_955821e3b91f41ab9e57f429ab8a54dd(eventobject);
}

function AS_Button_955821e3b91f41ab9e57f429ab8a54dd(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("getDataForViews");
}