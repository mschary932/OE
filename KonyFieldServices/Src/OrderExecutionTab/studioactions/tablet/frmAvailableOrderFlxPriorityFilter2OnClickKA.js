function frmAvailableOrderFlxPriorityFilter2OnClickKA(eventobject) {
    return AS_FlexContainer_4521578653ef4f4789a17f906dceab39(eventobject);
}

function AS_FlexContainer_4521578653ef4f4789a17f906dceab39(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxPriorityFilterKA']);
}