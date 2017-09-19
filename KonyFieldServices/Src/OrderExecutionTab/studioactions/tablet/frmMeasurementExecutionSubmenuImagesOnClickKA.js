function frmMeasurementExecutionSubmenuImagesOnClickKA(eventobject) {
    return AS_FlexContainer_6653cb30469646a19cf82fb7276927f4(eventobject);
}

function AS_FlexContainer_6653cb30469646a19cf82fb7276927f4(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showImages");
}