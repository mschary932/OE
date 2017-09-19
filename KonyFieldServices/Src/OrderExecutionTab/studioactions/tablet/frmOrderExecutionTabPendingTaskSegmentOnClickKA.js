function frmOrderExecutionTabPendingTaskSegmentOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_2bddae762f7d464fad7604ed1c9f0f5c(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_2bddae762f7d464fad7604ed1c9f0f5c(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backToListView");
}