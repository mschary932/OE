function frmOrderExecDoneAddMeasurementPopUpKA(eventobject) {
    return AS_Button_2532ac5615c746d1bd39e14e9cf7bdf1(eventobject);
}

function AS_Button_2532ac5615c746d1bd39e14e9cf7bdf1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("AddMeasurement");
}