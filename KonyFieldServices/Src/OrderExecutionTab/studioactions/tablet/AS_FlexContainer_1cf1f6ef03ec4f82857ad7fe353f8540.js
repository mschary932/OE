function AS_FlexContainer_1cf1f6ef03ec4f82857ad7fe353f8540(eventobject) {
    return AS_FlexContainer_ee8f1bdf92704f3088c5d89071ef6d3d(eventobject);
}

function AS_FlexContainer_ee8f1bdf92704f3088c5d89071ef6d3d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedDescription");
}