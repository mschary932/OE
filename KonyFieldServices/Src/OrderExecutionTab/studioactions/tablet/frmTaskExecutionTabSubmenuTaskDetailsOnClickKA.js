function frmTaskExecutionTabSubmenuTaskDetailsOnClickKA(eventobject) {
    return AS_FlexContainer_c05b9f0662fd4421a48acd011dc49ac6(eventobject);
}

function AS_FlexContainer_c05b9f0662fd4421a48acd011dc49ac6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTwoTaskDetails");
}