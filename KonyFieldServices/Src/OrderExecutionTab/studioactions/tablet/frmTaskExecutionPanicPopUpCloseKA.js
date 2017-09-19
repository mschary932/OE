function frmTaskExecutionPanicPopUpCloseKA(eventobject) {
    return AS_FlexContainer_4012d37a4a7e45879a45487357ab3cf5(eventobject);
}

function AS_FlexContainer_4012d37a4a7e45879a45487357ab3cf5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromPanicScreen");
}