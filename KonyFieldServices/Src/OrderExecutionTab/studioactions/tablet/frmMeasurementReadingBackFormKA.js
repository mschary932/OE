function frmMeasurementReadingBackFormKA(eventobject) {
    return AS_Button_deff7a37a8ca436085d44153e8dc7f98(eventobject);
}

function AS_Button_deff7a37a8ca436085d44153e8dc7f98(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementExecutionForm");
}