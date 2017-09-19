function frmOrderExecutionBtnHamburgerKA(eventobject) {
    return AS_Button_6f0d72fb4d6a4a11a7078552de6f08f2(eventobject);
}

function AS_Button_6f0d72fb4d6a4a11a7078552de6f08f2(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
}