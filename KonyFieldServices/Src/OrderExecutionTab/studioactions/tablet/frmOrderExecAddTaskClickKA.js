function frmOrderExecAddTaskClickKA(eventobject) {
    return AS_Button_2cdf453e449043639b665a63f1328952(eventobject);
}

function AS_Button_2cdf453e449043639b665a63f1328952(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddTaskPopUp");
}