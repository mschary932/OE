function frmCompleteOrderFlexBottomBlockOnClickKA(eventobject) {
    return AS_FlexContainer_3f79fe66f4934ecdb081d5a761ae9ed0(eventobject);
}

function AS_FlexContainer_3f79fe66f4934ecdb081d5a761ae9ed0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}