function frmResourceExecutionbtnAcceptOnClickKA(eventobject) {
    return AS_Button_527f1fa312b24a84bee9d2bfc549c7e6(eventobject);
}

function AS_Button_527f1fa312b24a84bee9d2bfc549c7e6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onCancelCall");
}