function frmOrderExecutionTabDetailsObjectFlexOnClickKA(eventobject) {
    return AS_FlexContainer_97beace1b23347b5a1cd9cacfbcea437(eventobject);
}

function AS_FlexContainer_97beace1b23347b5a1cd9cacfbcea437(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderObject");
}