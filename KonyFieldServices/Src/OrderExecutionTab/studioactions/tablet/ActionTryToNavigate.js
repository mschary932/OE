function ActionTryToNavigate(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_2ec3f34341e54893a04319b2e71087ca(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_2ec3f34341e54893a04319b2e71087ca(eventobject, sectionNumber, rowNumber) {
    //var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backToListView");
}