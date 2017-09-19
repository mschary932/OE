function frmCompleteOrderFlexCancelAlertOnClickKA(eventobject) {
    return AS_FlexContainer_1c9f83a81fd9469d8d17cd3acbfa0d89(eventobject);
}

function AS_FlexContainer_1c9f83a81fd9469d8d17cd3acbfa0d89(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothing");
}