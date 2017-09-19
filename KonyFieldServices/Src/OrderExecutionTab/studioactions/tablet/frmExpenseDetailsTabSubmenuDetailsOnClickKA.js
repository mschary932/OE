function frmExpenseDetailsTabSubmenuDetailsOnClickKA(eventobject) {
    return AS_FlexContainer_7737162a88774f2ca9aa5ee8e494b028(eventobject);
}

function AS_FlexContainer_7737162a88774f2ca9aa5ee8e494b028(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetails");
}