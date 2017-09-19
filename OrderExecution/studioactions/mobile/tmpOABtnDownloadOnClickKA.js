function tmpOABtnDownloadOnClickKA(eventobject, context) {
    return AS_Button_26721c6c5ddd42e491215da27b879f51(eventobject, context);
}

function AS_Button_26721c6c5ddd42e491215da27b879f51(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("openAttachment");
}