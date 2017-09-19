function frmCompleteOrderTabSubmenuOrderAttachmentOnClickKA(eventobject) {
    return AS_FlexContainer_119f57dad2ca46bc9778e4f4c721a053(eventobject);
}

function AS_FlexContainer_119f57dad2ca46bc9778e4f4c721a053(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderAttachments");
}