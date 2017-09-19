function frmMyOrderListTabFlexPriorityFilterOnClickKA(eventobject) {
    return AS_FlexContainer_1eba9b460e5d4012a2ff5a299e3f3d22(eventobject);
}

function AS_FlexContainer_1eba9b460e5d4012a2ff5a299e3f3d22(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxPriorityFilterKA']);
}