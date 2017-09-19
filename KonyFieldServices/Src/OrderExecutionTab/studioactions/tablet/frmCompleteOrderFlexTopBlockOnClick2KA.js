function frmCompleteOrderFlexTopBlockOnClick2KA(eventobject) {
    return AS_FlexContainer_b199410e2bac4ff888e21191e338ed71(eventobject);
}

function AS_FlexContainer_b199410e2bac4ff888e21191e338ed71(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}