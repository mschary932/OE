function frmCompleteOrderTabSubmenuOrderResourcesOnClickKA(eventobject) {
    return AS_FlexContainer_6a40c597c0a44f42961fcb4c87d9b9a0(eventobject);
}

function AS_FlexContainer_6a40c597c0a44f42961fcb4c87d9b9a0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderResources");
}