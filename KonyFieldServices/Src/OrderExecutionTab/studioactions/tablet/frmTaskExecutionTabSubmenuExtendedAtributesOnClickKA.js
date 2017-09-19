function frmTaskExecutionTabSubmenuExtendedAtributesOnClickKA(eventobject) {
    return AS_FlexContainer_9922357f95d54d06a289932d5aaa6db3(eventobject);
}

function AS_FlexContainer_9922357f95d54d06a289932d5aaa6db3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSixExtendedAttributes");
}