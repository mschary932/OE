function frmresourceExecutionbtnEditOnClickKa(eventobject) {
    return AS_Button_04d5c3f4017f4bad91d2274a288f7b7d(eventobject);
}

function AS_Button_04d5c3f4017f4bad91d2274a288f7b7d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onEditCall");
}