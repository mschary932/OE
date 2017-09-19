function frmTaskExecShowDateSpinnerOneKA(eventobject, x, y) {
    return AS_Label_6a7857a61367477cb9e7cf5e94bc9eba(eventobject, x, y);
}

function AS_Label_6a7857a61367477cb9e7cf5e94bc9eba(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDateSpinnerOne");
}