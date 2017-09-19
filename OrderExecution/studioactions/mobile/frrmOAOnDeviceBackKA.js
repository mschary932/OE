function frrmOAOnDeviceBackKA(eventobject) {
    return AS_Form_293330c0475f4c30a097165678c55cf2(eventobject);
}

function AS_Form_293330c0475f4c30a097165678c55cf2(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}