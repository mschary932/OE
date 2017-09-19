function AS_Segment_4a0273b8ee524b58b4312212a4b3c6b4(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExpenseDetailsForm");
}