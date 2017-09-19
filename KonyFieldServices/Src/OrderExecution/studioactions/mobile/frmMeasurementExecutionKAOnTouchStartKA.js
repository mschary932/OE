function frmMeasurementExecutionKAOnTouchStartKA(eventobject, x, y) {
    return AS_Segment_04122b7eb0b34aae958513cd7ce7780d(eventobject, x, y);
}

function AS_Segment_04122b7eb0b34aae958513cd7ce7780d(eventobject, x, y) {
    if ((Object.keys(kony.servicesapp.swipedIndices).length > 0) && !kony.servicesapp.isAnimationInProgress) {
        var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", false);
        frmMeasurementExecutionKA.segMeasurementKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flxChildKA"],
            animation: animObj
        });
    }
}