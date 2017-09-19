function frmOrderExecutionViewOnClickKA(eventobject) {
    return AS_FlexContainer_092e9ed988f8416fa3c1fde9b07b6d96(eventobject);
}

function AS_FlexContainer_092e9ed988f8416fa3c1fde9b07b6d96(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showViewFilter");
}