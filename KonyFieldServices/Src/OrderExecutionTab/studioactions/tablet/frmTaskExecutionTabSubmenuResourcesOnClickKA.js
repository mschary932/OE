function frmTaskExecutionTabSubmenuResourcesOnClickKA(eventobject) {
    return AS_FlexContainer_0852792df27a4a58bd1a2740d2e6ff08(eventobject);
}

function AS_FlexContainer_0852792df27a4a58bd1a2740d2e6ff08(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOneResourcesDetails");
}