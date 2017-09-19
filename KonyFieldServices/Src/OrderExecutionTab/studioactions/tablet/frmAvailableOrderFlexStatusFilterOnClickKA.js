function frmAvailableOrderFlexStatusFilterOnClickKA(eventobject) {
    return AS_FlexContainer_f37f7d3189bf4ab9bd9317887d0b3b44(eventobject);
}

function AS_FlexContainer_f37f7d3189bf4ab9bd9317887d0b3b44(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxStatusFilterKA']);
}