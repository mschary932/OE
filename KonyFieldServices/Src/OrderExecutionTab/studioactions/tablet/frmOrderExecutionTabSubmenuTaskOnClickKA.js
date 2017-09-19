function frmOrderExecutionTabSubmenuTaskOnClickKA(eventobject) {
    return AS_FlexContainer_7b122ba59d314bb2a621ddc65cd3c0b6(eventobject);
}

function AS_FlexContainer_7b122ba59d314bb2a621ddc65cd3c0b6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTaskList");
}