function frmMeasurementExecutionBtnTimeItemOkOnClickKA(eventobject) {
    return AS_Button_0b3ded45f0624693aaa24159f91cfaaa(eventobject);
}

function AS_Button_0b3ded45f0624693aaa24159f91cfaaa(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("createReading");
}