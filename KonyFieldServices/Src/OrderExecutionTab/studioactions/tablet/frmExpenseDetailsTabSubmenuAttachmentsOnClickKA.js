function frmExpenseDetailsTabSubmenuAttachmentsOnClickKA(eventobject) {
    return AS_FlexContainer_d69f798f5bb144e09abe87fa420cab80(eventobject);
}

function AS_FlexContainer_d69f798f5bb144e09abe87fa420cab80(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showImages");
}