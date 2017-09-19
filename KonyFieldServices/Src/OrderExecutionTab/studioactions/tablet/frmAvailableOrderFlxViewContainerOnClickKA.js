function frmAvailableOrderFlxViewContainerOnClickKA(eventobject) {
    return AS_FlexContainer_50eeb0b8a8114c89ac820123361c55d1(eventobject);
}

function AS_FlexContainer_50eeb0b8a8114c89ac820123361c55d1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}