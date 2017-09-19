function frmMyOrderbtnLowOnClickKA(eventobject) {
    return AS_Button_6ee99c231b474f7abc6e1cf4c0a2ede8(eventobject);
}

function AS_Button_6ee99c231b474f7abc6e1cf4c0a2ede8(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onPriorityFilterClick", ['btnLowKA']);
}