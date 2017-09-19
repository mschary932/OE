function frmMeasurementExecutionSubmenuKA(eventobject) {
    return AS_FlexContainer_ce3f7f373a5f4eaf8dd22e3d00b7b853(eventobject);
}

function AS_FlexContainer_ce3f7f373a5f4eaf8dd22e3d00b7b853(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCreateMeasurementReading");
}