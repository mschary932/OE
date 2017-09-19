function frrmOABOnDeviceBackKA(eventobject) {
    return AS_Form_6f040689a8d74a35a0e08f191965ca03(eventobject);
}

function AS_Form_6f040689a8d74a35a0e08f191965ca03(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}