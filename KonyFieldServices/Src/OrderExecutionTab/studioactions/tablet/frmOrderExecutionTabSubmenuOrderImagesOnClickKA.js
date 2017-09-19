function frmOrderExecutionTabSubmenuOrderImagesOnClickKA(eventobject) {
    return AS_FlexContainer_178ccb85248d4ac08f9bc9fa27708dc2(eventobject);
}

function AS_FlexContainer_178ccb85248d4ac08f9bc9fa27708dc2(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showImages");
}