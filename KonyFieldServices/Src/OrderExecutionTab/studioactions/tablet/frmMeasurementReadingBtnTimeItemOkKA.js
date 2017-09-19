function frmMeasurementReadingBtnTimeItemOkKA(eventobject) {
    return AS_Button_4294c1511d2340e6a2ed1a8d1c5439b5(eventobject);
}

function AS_Button_4294c1511d2340e6a2ed1a8d1c5439b5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelReadingCreation");
}