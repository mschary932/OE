function frmOrderAssetOnDeviceBackKA(eventobject) {
    return AS_Form_21481c9b502447329178516463b18d89(eventobject);
}

function AS_Form_21481c9b502447329178516463b18d89(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}