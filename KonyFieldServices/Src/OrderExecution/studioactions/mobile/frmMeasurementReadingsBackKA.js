function frmMeasurementReadingsBackKA(eventobject) {
    return AS_Button_165b886a34ed43739ebb5447cec126c4(eventobject);
}

function AS_Button_165b886a34ed43739ebb5447cec126c4(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}