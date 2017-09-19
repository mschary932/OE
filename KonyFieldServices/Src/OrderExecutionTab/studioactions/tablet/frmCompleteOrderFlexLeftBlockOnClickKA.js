function frmCompleteOrderFlexLeftBlockOnClickKA(eventobject) {
    return AS_FlexContainer_675bbb86e4cc41588a2f7d336ff0e459(eventobject);
}

function AS_FlexContainer_675bbb86e4cc41588a2f7d336ff0e459(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}