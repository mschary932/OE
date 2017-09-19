function frmOrderExecutionBtnAddTaskTickOnClickKA(eventobject) {
    return AS_Button_2a2d88c010474f7aa03de0b126314617(eventobject);
}

function AS_Button_2a2d88c010474f7aa03de0b126314617(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTask");
}