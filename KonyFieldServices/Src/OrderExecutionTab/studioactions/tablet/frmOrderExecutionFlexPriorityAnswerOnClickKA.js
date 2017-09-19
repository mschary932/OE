function frmOrderExecutionFlexPriorityAnswerOnClickKA(eventobject) {
    return AS_FlexContainer_98445ada185b403391e04579629bfb3a(eventobject);
}

function AS_FlexContainer_98445ada185b403391e04579629bfb3a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderObject");
}