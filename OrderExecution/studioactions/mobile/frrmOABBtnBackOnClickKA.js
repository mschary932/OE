function frrmOABBtnBackOnClickKA(eventobject) {
    return AS_Button_9d55c43034b74193a6e9c68440056bef(eventobject);
}

function AS_Button_9d55c43034b74193a6e9c68440056bef(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}