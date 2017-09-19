function frmBillOFMaterialbtnBOMBackOnClickKA(eventobject) {
    return AS_Button_0e313f9676cf42bcbea2d4cc7b951847(eventobject);
}

function AS_Button_0e313f9676cf42bcbea2d4cc7b951847(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backNavigationCalls");
}