function frmOrderExecutionTabHideViewPopUpKA(eventobject) {
    return AS_FlexContainer_94bbcc065a3b4f50b6206639f53f41b1(eventobject);
}

function AS_FlexContainer_94bbcc065a3b4f50b6206639f53f41b1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}