function frmResourceExecutionbtnRemoveOnClickKA(eventobject) {
    return AS_Button_9ebd71afc3844a6d9e7aea265db2af43(eventobject);
}

function AS_Button_9ebd71afc3844a6d9e7aea265db2af43(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onRemoveCall");
}