function frmOrderExecutionTabDescriptonFlexOnClickKA(eventobject) {
    return AS_FlexContainer_ce9263bfaa9b4ac894a7135fbb1834a1(eventobject);
}

function AS_FlexContainer_ce9263bfaa9b4ac894a7135fbb1834a1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedDescription");
}