function frmMeasurementExecutionSegMeasurementReadingsKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_dca216a626c64a0e8ed5ec484971a0ac(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_dca216a626c64a0e8ed5ec484971a0ac(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementReadingForm");
}