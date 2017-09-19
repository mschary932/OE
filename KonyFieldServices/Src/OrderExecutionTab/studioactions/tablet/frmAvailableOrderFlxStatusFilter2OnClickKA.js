function frmAvailableOrderFlxStatusFilter2OnClickKA(eventobject) {
    return AS_FlexContainer_7585219020bb4fb69a47ca414c2a3c93(eventobject);
}

function AS_FlexContainer_7585219020bb4fb69a47ca414c2a3c93(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxStatusFilterKA']);
}