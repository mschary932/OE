function frmRETflxResDetailsOnClickKA(eventobject) {
    return AS_FlexContainer_a7e0bdcb2df248e3a23b009d7a08dc15(eventobject);
}

function AS_FlexContainer_a7e0bdcb2df248e3a23b009d7a08dc15(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectResourceDetailsTab");
}