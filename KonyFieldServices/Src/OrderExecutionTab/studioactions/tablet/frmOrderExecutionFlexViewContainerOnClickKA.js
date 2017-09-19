function frmOrderExecutionFlexViewContainerOnClickKA(eventobject) {
    return AS_FlexContainer_efc53aae4559432fa56c96c8d393d93b(eventobject);
}

function AS_FlexContainer_efc53aae4559432fa56c96c8d393d93b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}