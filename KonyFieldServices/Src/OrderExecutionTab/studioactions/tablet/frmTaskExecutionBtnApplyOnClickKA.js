function frmTaskExecutionBtnApplyOnClickKA(eventobject) {
    return AS_Button_bbbe31b038c943c1a5756a3ae55ccc2c(eventobject);
}

function AS_Button_bbbe31b038c943c1a5756a3ae55ccc2c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}