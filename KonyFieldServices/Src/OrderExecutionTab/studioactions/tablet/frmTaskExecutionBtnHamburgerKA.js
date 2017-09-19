function frmTaskExecutionBtnHamburgerKA(eventobject) {
    return AS_Button_6ce8bd44ab204ac087d9b57add6acc84(eventobject);
}

function AS_Button_6ce8bd44ab204ac087d9b57add6acc84(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
}