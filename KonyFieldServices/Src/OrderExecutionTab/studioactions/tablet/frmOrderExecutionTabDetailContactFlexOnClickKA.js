function frmOrderExecutionTabDetailContactFlexOnClickKA(eventobject) {
    return AS_FlexContainer_406fe02250614a838aae9117941af6e0(eventobject);
}

function AS_FlexContainer_406fe02250614a838aae9117941af6e0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showContactDetails");
}