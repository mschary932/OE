function frmTaskExecutionFlexMaterialDetailsOnClickKA(eventobject) {
    return AS_FlexContainer_9a5363266b9a430fb29670638e15e28c(eventobject);
}

function AS_FlexContainer_9a5363266b9a430fb29670638e15e28c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showResourceExecutionForm");
}