function AS_Button_e1ca44d21f114bfa803a22e3387278b9(eventobject) {
    return AS_Button_63b7dc2ee90c4676b88e1f47ead0774a(eventobject);
}

function AS_Button_63b7dc2ee90c4676b88e1f47ead0774a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}