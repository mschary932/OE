function frmOrderExecLocationbFlexKA(eventobject) {
    return AS_FlexContainer_986f182c2bbd40359ef26ef0604371cf(eventobject);
}

function AS_FlexContainer_986f182c2bbd40359ef26ef0604371cf(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedDescription");
}