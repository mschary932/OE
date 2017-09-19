function frmMyOrderFlxPriorityFilterOnClickKA(eventobject) {
    return AS_FlexContainer_b9ec56b8824841c586b7676ee841ed4b(eventobject);
}

function AS_FlexContainer_b9ec56b8824841c586b7676ee841ed4b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxPriorityFilterKA']);
}