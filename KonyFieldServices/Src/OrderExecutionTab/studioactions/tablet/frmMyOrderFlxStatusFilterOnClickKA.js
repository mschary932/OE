function frmMyOrderFlxStatusFilterOnClickKA(eventobject) {
    return AS_FlexContainer_df5f840b219f42568391d8ce63e1d474(eventobject);
}

function AS_FlexContainer_df5f840b219f42568391d8ce63e1d474(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxStatusFilterKA']);
}