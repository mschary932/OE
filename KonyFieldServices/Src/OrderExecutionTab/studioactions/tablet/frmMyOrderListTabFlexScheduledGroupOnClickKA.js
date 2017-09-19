function frmMyOrderListTabFlexScheduledGroupOnClickKA(eventobject) {
    return AS_FlexContainer_fc6cccdc7c2b4b3fab0a934b24f69d5c(eventobject);
}

function AS_FlexContainer_fc6cccdc7c2b4b3fab0a934b24f69d5c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onImgDown2Call");
}