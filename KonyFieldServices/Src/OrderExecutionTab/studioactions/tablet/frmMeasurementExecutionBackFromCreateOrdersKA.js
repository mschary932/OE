function frmMeasurementExecutionBackFromCreateOrdersKA(eventobject) {
    return AS_Button_02be31d9a0fb4747abb2ac00c2cc85d9(eventobject);
}

function AS_Button_02be31d9a0fb4747abb2ac00c2cc85d9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCreateMeasurementReading");
}