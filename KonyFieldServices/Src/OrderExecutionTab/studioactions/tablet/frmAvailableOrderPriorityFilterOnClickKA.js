function frmAvailableOrderPriorityFilterOnClickKA(eventobject) {
    return AS_FlexContainer_e30f299bf4e24ee584441bd0d9a078c1(eventobject);
}

function AS_FlexContainer_e30f299bf4e24ee584441bd0d9a078c1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxPriorityFilterKA']);
}