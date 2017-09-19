function frmMyOrderListFlexDateFilterOnClickKA(eventobject) {
    return AS_FlexContainer_2b8abb7ef3a34073b2676a3802b40d9e(eventobject);
}

function AS_FlexContainer_2b8abb7ef3a34073b2676a3802b40d9e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxDateFilterKA']);
}