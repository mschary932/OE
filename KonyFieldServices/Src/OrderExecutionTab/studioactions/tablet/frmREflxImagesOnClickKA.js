function frmREflxImagesOnClickKA(eventobject) {
    return AS_FlexContainer_2c961bcb3cc3424a815d771f2aef649e(eventobject);
}

function AS_FlexContainer_2c961bcb3cc3424a815d771f2aef649e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectImagesTab");
}