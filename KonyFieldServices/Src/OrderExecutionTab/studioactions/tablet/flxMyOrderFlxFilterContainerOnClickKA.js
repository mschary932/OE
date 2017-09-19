function flxMyOrderFlxFilterContainerOnClickKA(eventobject) {
    return AS_FlexContainer_51b299f7f2ab4214a89c40a08829035f(eventobject);
}

function AS_FlexContainer_51b299f7f2ab4214a89c40a08829035f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}