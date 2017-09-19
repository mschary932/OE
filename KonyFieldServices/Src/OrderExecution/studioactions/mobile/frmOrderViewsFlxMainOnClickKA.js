function frmOrderViewsFlxMainOnClickKA(eventobject) {
    return AS_FlexContainer_e971b15376fb4a9897ef1dbef0376306(eventobject);
}

function AS_FlexContainer_e971b15376fb4a9897ef1dbef0376306(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm");
}