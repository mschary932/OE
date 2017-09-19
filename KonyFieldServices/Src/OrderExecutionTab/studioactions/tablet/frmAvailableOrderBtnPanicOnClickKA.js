function frmAvailableOrderBtnPanicOnClickKA(eventobject) {
    return AS_Button_19d7c0d4e0ff4d35a483da25098ae6cb(eventobject);
}

function AS_Button_19d7c0d4e0ff4d35a483da25098ae6cb(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPanicScreen");
}