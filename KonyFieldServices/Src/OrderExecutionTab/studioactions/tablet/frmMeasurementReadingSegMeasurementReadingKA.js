function frmMeasurementReadingSegMeasurementReadingKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_a6d44a5344634ec9a936766c0696e516(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_a6d44a5344634ec9a936766c0696e516(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementReadingsDetails");
}