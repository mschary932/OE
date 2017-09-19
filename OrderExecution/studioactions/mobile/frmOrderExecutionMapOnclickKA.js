function frmOrderExecutionMapOnclickKA(eventobject) {
    return AS_FlexContainer_d31abdd17b784e45bead0f1e029cd206(eventobject);
}

function AS_FlexContainer_d31abdd17b784e45bead0f1e029cd206(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFrmDirectionKA");
}