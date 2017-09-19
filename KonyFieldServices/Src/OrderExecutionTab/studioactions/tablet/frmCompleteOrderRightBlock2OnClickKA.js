function frmCompleteOrderRightBlock2OnClickKA(eventobject) {
    return AS_FlexContainer_24293ebc040046b5b4dc992dfe3ce08b(eventobject);
}

function AS_FlexContainer_24293ebc040046b5b4dc992dfe3ce08b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}