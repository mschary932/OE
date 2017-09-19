function frmCompleteOrderFlexViewContainerHidePopUpOnClickKA(eventobject) {
    return AS_FlexContainer_4663d0b623564e7394d04a098165f877(eventobject);
}

function AS_FlexContainer_4663d0b623564e7394d04a098165f877(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}