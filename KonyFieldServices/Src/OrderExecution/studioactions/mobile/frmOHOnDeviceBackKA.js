function frmOHOnDeviceBackKA(eventobject) {
    return AS_Form_c85c8d4eba9c4029b885feaf9cfffc88(eventobject);
}

function AS_Form_c85c8d4eba9c4029b885feaf9cfffc88(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack", [true]);
}