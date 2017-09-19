function frmOrderExecutionFlexStatusAnswersOnClickKa(eventobject) {
    return AS_FlexContainer_e492a6aacc41434f84f402c67a46d95a(eventobject);
}

function AS_FlexContainer_e492a6aacc41434f84f402c67a46d95a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderObject");
}