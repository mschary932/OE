function frmOrderExecAddTaskTickKA(eventobject) {
    return AS_Button_83ef2b117ec8494eb885e6bf91adbf2e(eventobject);
}

function AS_Button_83ef2b117ec8494eb885e6bf91adbf2e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTask");
}