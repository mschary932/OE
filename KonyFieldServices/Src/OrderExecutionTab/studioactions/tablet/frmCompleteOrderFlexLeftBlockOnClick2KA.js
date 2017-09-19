function frmCompleteOrderFlexLeftBlockOnClick2KA(eventobject) {
    return AS_FlexContainer_57e210fa362048f592b2b9b51a594a04(eventobject);
}

function AS_FlexContainer_57e210fa362048f592b2b9b51a594a04(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}