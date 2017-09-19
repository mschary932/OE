function frmOrderExecAddMeasurementPopUpKA(eventobject) {
    return AS_Button_cc4a3273aa6a43a7b298c2cba4381dd5(eventobject);
}

function AS_Button_cc4a3273aa6a43a7b298c2cba4381dd5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelMeasurementPopUp");
}