function frmCompleteOrderTabSubmenuOrderImagesOnClickKA(eventobject) {
    return AS_FlexContainer_804253ad7c0d4608b6611f2e4e0aa3bd(eventobject);
}

function AS_FlexContainer_804253ad7c0d4608b6611f2e4e0aa3bd(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderImages");
}