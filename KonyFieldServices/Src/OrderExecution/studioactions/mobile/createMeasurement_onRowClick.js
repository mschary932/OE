function createMeasurement_onRowClick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_28f14c3f00a34711a2b192ad62139777(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_28f14c3f00a34711a2b192ad62139777(eventobject, sectionNumber, rowNumber) {
    var controllerObject = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCreateMeasurementKA").getControllerExtensionObject();
    controllerObject.createMeasurementTask();
}