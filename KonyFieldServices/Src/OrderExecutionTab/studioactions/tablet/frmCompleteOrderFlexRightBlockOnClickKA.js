function frmCompleteOrderFlexRightBlockOnClickKA(eventobject) {
    return AS_FlexContainer_84831eb6c0e140b0867c6dd8c9442cb1(eventobject);
}

function AS_FlexContainer_84831eb6c0e140b0867c6dd8c9442cb1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}