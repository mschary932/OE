function frmCompleteOrderFlexDatePopupOnClickKA(eventobject) {
    return AS_FlexContainer_0d2bc7b8e4de4432b181956330de0230(eventobject);
}

function AS_FlexContainer_0d2bc7b8e4de4432b181956330de0230(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothing");
}