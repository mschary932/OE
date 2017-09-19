function frmMeasurementsKA_segMeasurementPointsKAonRowClick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_259c2e59b7e343a2b9644d7e53b98f7e(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_259c2e59b7e343a2b9644d7e53b98f7e(eventobject, sectionNumber, rowNumber) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToMeasurementReadings");
}