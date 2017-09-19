function AS_Segment_0b0a667e02dc4371a8a8d6983cc83f0a(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExpenseDetailsForm");
}