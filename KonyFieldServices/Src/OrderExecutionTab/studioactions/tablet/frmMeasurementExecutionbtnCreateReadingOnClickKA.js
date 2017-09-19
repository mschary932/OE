function frmMeasurementExecutionbtnCreateReadingOnClickKA(eventobject) {
    return AS_Button_22c3d306a0d54c1b9c1ca8d10cec45a7(eventobject);
}

function AS_Button_22c3d306a0d54c1b9c1ca8d10cec45a7(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementReadingCreationPopUp");
}