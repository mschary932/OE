function frmMOLflxViewContainerOnClickKA(eventobject) {
    return AS_FlexContainer_73f8c165096a45be96793a3297e3535e(eventobject);
}

function AS_FlexContainer_73f8c165096a45be96793a3297e3535e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}