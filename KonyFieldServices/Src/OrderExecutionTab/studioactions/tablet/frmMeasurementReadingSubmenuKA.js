function frmMeasurementReadingSubmenuKA(eventobject) {
    return AS_FlexContainer_4804a1bb48314152819cc0594155cfda(eventobject);
}

function AS_FlexContainer_4804a1bb48314152819cc0594155cfda(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementReadings");
}