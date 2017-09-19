function frmCompleteOrderFlexRightBlockOnClick2KA(eventobject) {
    return AS_FlexContainer_cb35f5f9664f4ac4a9ed15a655517a49(eventobject);
}

function AS_FlexContainer_cb35f5f9664f4ac4a9ed15a655517a49(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}