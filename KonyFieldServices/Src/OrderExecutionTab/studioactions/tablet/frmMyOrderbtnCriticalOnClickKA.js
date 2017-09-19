function frmMyOrderbtnCriticalOnClickKA(eventobject) {
    return AS_Button_b49dd783e5dc4cf6aed72462bf97e28d(eventobject);
}

function AS_Button_b49dd783e5dc4cf6aed72462bf97e28d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onPriorityFilterClick", ['btnCriticalKA']);
}