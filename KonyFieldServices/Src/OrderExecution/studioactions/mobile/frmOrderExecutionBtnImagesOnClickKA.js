function frmOrderExecutionBtnImagesOnClickKA(eventobject) {
    return AS_Button_5423fcf231cc4dc7884c8fa6cf32e4cd(eventobject);
}

function AS_Button_5423fcf231cc4dc7884c8fa6cf32e4cd(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showAttachmentForm");
    } catch (e) {}
}