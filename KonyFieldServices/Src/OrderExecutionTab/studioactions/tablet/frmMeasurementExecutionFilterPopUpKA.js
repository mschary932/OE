function frmMeasurementExecutionFilterPopUpKA(eventobject) {
    return AS_FlexContainer_84fcf5e5ac7b4fb4985cb8a4f50ca97a(eventobject);
}

function AS_FlexContainer_84fcf5e5ac7b4fb4985cb8a4f50ca97a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showViewFilter");
}