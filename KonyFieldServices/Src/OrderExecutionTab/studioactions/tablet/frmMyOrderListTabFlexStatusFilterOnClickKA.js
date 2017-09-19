function frmMyOrderListTabFlexStatusFilterOnClickKA(eventobject) {
    return AS_FlexContainer_cae4887690774f0583de8df8f2d35178(eventobject);
}

function AS_FlexContainer_cae4887690774f0583de8df8f2d35178(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxStatusFilterKA']);
}