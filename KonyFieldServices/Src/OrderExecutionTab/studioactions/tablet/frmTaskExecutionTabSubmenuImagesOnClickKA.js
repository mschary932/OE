function frmTaskExecutionTabSubmenuImagesOnClickKA(eventobject) {
    return AS_FlexContainer_dce4b1e9270d4854b65ea9d437a26241(eventobject);
}

function AS_FlexContainer_dce4b1e9270d4854b65ea9d437a26241(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showThreeImages");
}