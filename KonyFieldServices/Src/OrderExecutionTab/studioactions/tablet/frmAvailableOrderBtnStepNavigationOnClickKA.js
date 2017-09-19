function frmAvailableOrderBtnStepNavigationOnClickKA(eventobject) {
    return AS_Button_37bb645dc4f647d280ce8ac91e4ec5bc(eventobject);
}

function AS_Button_37bb645dc4f647d280ce8ac91e4ec5bc(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("startStepNavigation");
}