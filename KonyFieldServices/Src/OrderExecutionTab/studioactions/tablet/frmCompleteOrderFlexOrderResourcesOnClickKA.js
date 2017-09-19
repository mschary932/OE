function frmCompleteOrderFlexOrderResourcesOnClickKA(eventobject) {
    return AS_FlexContainer_40fffe826db24cb6910bad1fa48150ee(eventobject);
}

function AS_FlexContainer_40fffe826db24cb6910bad1fa48150ee(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderResources");
}