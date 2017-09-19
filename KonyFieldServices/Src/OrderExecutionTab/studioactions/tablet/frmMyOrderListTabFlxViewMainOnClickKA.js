function frmMyOrderListTabFlxViewMainOnClickKA(eventobject) {
    return AS_FlexContainer_4574d1d7e2dd47bb9d07670d65f5b73d(eventobject);
}

function AS_FlexContainer_4574d1d7e2dd47bb9d07670d65f5b73d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}