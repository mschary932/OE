function frmAvailableOrderFlxFilterMainOnClickKA(eventobject) {
    return AS_FlexContainer_a971c3b222a24d0c9e40c71c7ee1ffdd(eventobject);
}

function AS_FlexContainer_a971c3b222a24d0c9e40c71c7ee1ffdd(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}