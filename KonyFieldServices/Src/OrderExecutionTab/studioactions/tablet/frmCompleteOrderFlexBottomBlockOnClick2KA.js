function frmCompleteOrderFlexBottomBlockOnClick2KA(eventobject) {
    return AS_FlexContainer_541199263d8442a5a367a5ccfad7829c(eventobject);
}

function AS_FlexContainer_541199263d8442a5a367a5ccfad7829c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}