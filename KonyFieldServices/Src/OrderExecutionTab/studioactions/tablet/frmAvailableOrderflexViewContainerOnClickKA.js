function frmAvailableOrderflexViewContainerOnClickKA(eventobject) {
    return AS_FlexContainer_f3537395924d441292b96dc8af949118(eventobject);
}

function AS_FlexContainer_f3537395924d441292b96dc8af949118(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}