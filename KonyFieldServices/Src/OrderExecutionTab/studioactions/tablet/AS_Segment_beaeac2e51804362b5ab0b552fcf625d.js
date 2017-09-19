function AS_Segment_beaeac2e51804362b5ab0b552fcf625d(eventobject, sectionNumber, rowNumber) {
    //var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backToListView");
}