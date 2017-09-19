function frmAvailableOrderFlxFilterContainerOnClickKA(eventobject) {
    return AS_FlexContainer_4dd31e11e3d34a66bebc58f6e6ac5b92(eventobject);
}

function AS_FlexContainer_4dd31e11e3d34a66bebc58f6e6ac5b92(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}