function frmOrdrExecutionTabTaskMeasurementCancelOnClickKA(eventobject) {
    return AS_Button_a914e18b26bf47f5a2b452a4cd92fdaf(eventobject);
}

function AS_Button_a914e18b26bf47f5a2b452a4cd92fdaf(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("closeScreenTaskMeasurement");
}