function frmCompleteOrderFlexViewGroupOnClickKA(eventobject) {
    return AS_FlexContainer_6b14d8cd148b4a8fb2dc198e936ede61(eventobject);
}

function AS_FlexContainer_6b14d8cd148b4a8fb2dc198e936ede61(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showViewFilter");
}