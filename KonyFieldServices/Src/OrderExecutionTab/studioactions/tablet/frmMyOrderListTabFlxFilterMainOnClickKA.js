function frmMyOrderListTabFlxFilterMainOnClickKA(eventobject) {
    return AS_FlexContainer_ea4278c7a66e4174a73f0fbcb5641954(eventobject);
}

function AS_FlexContainer_ea4278c7a66e4174a73f0fbcb5641954(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}