function frmOrderExecutionAddMeasurementBtnOnClickKA(eventobject) {
    return AS_Button_a9f93e9824de4054a96e1b2d25e1ad26(eventobject);
}

function AS_Button_a9f93e9824de4054a96e1b2d25e1ad26(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddMeasurementPopUp");
}