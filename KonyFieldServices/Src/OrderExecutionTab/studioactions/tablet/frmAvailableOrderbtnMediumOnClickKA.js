function frmAvailableOrderbtnMediumOnClickKA(eventobject) {
    return AS_Button_cc345da43bf9424dbb672ddbbd23366f(eventobject);
}

function AS_Button_cc345da43bf9424dbb672ddbbd23366f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onPriorityFilterClick", ['btnMediumKA']);
}