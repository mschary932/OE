function frmCompleteOrderFlexImagesOnClickKA(eventobject) {
    return AS_FlexContainer_1fbc3c99a33349e7b36e4e448b157ee8(eventobject);
}

function AS_FlexContainer_1fbc3c99a33349e7b36e4e448b157ee8(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderImages");
}