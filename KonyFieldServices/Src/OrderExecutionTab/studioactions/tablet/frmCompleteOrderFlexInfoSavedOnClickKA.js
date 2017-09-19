function frmCompleteOrderFlexInfoSavedOnClickKA(eventobject) {
    return AS_FlexContainer_1dacb413606245228fe4ad286a3ffdb3(eventobject);
}

function AS_FlexContainer_1dacb413606245228fe4ad286a3ffdb3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothing");
}