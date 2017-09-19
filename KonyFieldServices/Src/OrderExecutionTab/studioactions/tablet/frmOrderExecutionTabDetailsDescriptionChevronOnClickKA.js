function frmOrderExecutionTabDetailsDescriptionChevronOnClickKA(eventobject) {
    return AS_Button_913e1a96e8f7455f8604d7063e16b586(eventobject);
}

function AS_Button_913e1a96e8f7455f8604d7063e16b586(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedDescription");
}