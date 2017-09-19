function frmAvailableOrderFlxDateFilterOnClick2KA(eventobject) {
    return AS_FlexContainer_2c99825a5b064bf4a1d31bbee8035fd4(eventobject);
}

function AS_FlexContainer_2c99825a5b064bf4a1d31bbee8035fd4(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxDateFilterKA']);
}