function frmCompleteOrderOrderCompletionKA(eventobject) {
    return AS_FlexContainer_01dc4b2f4fa541ea9d2ffb95e9a710e2(eventobject);
}

function AS_FlexContainer_01dc4b2f4fa541ea9d2ffb95e9a710e2(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderCompletion");
}