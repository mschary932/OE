function frmMyOrderFlexPanicPopUpOnClickKA(eventobject) {
    return AS_FlexContainer_98644550adc64c81a9dcaf421871721a(eventobject);
}

function AS_FlexContainer_98644550adc64c81a9dcaf421871721a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromPanicScreen");
}