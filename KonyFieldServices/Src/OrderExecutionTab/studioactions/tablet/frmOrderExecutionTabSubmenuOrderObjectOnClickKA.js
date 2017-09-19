function frmOrderExecutionTabSubmenuOrderObjectOnClickKA(eventobject) {
    return AS_FlexContainer_8e3145aad9d6479eb893e57d27dd852d(eventobject);
}

function AS_FlexContainer_8e3145aad9d6479eb893e57d27dd852d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderObject");
}