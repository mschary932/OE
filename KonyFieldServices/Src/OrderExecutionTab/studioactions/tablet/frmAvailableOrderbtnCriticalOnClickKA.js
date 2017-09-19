function frmAvailableOrderbtnCriticalOnClickKA(eventobject) {
    return AS_Button_b6bb73ebcb4140be8620b5b0bd75589c(eventobject);
}

function AS_Button_b6bb73ebcb4140be8620b5b0bd75589c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onPriorityFilterClick", ['btnCriticalKA']);
}