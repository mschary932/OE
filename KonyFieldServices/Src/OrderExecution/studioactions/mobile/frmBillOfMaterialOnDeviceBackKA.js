function frmBillOfMaterialOnDeviceBackKA(eventobject) {
    return AS_Form_a06b9a61e2724065b92acc01bd36f103(eventobject);
}

function AS_Form_a06b9a61e2724065b92acc01bd36f103(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backNavigationCalls");
}