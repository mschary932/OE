function frmMyOrderFlxDateFilterOnClickKA(eventobject) {
    return AS_FlexContainer_9d28f37ef7a9452f922f6cd76213d81d(eventobject);
}

function AS_FlexContainer_9d28f37ef7a9452f922f6cd76213d81d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxDateFilterKA']);
}