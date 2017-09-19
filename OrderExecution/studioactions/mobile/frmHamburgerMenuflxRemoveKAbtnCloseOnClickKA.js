function frmHamburgerMenuflxRemoveKAbtnCloseOnClickKA(eventobject) {
    return AS_Button_e6ee96c0ba9644499eea442998a1186d(eventobject);
}

function AS_Button_e6ee96c0ba9644499eea442998a1186d(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("updateReadings");
}