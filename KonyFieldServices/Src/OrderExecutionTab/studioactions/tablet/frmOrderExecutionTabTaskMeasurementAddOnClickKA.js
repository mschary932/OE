function frmOrderExecutionTabTaskMeasurementAddOnClickKA(eventobject) {
    return AS_Button_75291b5ca91c40fe821eaa1bd6728414(eventobject);
}

function AS_Button_75291b5ca91c40fe821eaa1bd6728414(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showScreenTaskMeasurementOption");
}