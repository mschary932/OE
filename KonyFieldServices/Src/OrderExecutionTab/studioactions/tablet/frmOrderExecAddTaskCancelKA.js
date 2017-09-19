function frmOrderExecAddTaskCancelKA(eventobject) {
    return AS_Button_37a650100976450280573ded63fbb894(eventobject);
}

function AS_Button_37a650100976450280573ded63fbb894(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTask");
}