function frmAvailableOrderFlexPriorityFilterOnClickKA(eventobject) {
    return AS_FlexContainer_72f689384ed04b3fa8f0116ed2e48f51(eventobject);
}

function AS_FlexContainer_72f689384ed04b3fa8f0116ed2e48f51(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxPriorityFilterKA']);
}