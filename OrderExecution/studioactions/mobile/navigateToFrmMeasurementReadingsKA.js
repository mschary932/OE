function navigateToFrmMeasurementReadingsKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_31c4e5c890554adc9ef2f8b52da35628(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_31c4e5c890554adc9ef2f8b52da35628(eventobject, sectionNumber, rowNumber) {
    if (kony.servicesapp.isAnimationInProgress) {
        return;
    } else if (((Object.keys(kony.servicesapp.swipedIndices).length > 0))) {
        frmMeasurementExecutionKA.segMeasurementKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flxChildKA"],
            animation: kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", true)
        });
    } else if (kony.servicesapp.coords.length == 0) {
        var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
        controller.performAction("navigateToMeasurementReadings");
    }
}