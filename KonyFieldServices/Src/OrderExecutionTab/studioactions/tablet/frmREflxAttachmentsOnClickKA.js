function frmREflxAttachmentsOnClickKA(eventobject) {
    return AS_FlexContainer_4434b014e9594e1086f48b3b37ee41c1(eventobject);
}

function AS_FlexContainer_4434b014e9594e1086f48b3b37ee41c1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectAttachmentsTabKA");
}