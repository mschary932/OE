function frmOrderExecutionFlxQuePopUpOnClickKA(eventobject) {
    return AS_FlexContainer_8ce364c9bf2a46438a3316ff460971d6(eventobject);
}

function AS_FlexContainer_8ce364c9bf2a46438a3316ff460971d6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddNotes");
}