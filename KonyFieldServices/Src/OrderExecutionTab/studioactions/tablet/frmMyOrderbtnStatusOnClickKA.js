function frmMyOrderbtnStatusOnClickKA(eventobject) {
    return AS_Button_65748a0fd9d244828c83e771e1dbd23d(eventobject);
}

function AS_Button_65748a0fd9d244828c83e771e1dbd23d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnStatusKA']);
}