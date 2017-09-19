function frmCompleteOrderFlexFillCumpalsaryPopUpOnClickKA(eventobject) {
    return AS_FlexContainer_de1b22eee8ff48ad943038a61e2f25c6(eventobject);
}

function AS_FlexContainer_de1b22eee8ff48ad943038a61e2f25c6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothing");
}