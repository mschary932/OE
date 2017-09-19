function frmPendingOrderListSegListOnTouchStartKA(eventobject, x, y) {
    return AS_Segment_3aa3c15615b94b36875b6b8c4b097eda(eventobject, x, y);
}

function AS_Segment_3aa3c15615b94b36875b6b8c4b097eda(eventobject, x, y) {
    if ((Object.keys(kony.servicesapp.swipedIndices).length > 0) && !kony.servicesapp.isAnimationInProgress) {
        var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-25%", "0%");
        frmPendingOrderListKA.segPendingOrderListKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flxPendingOrdListKA"],
            animation: animObj
        });
    }
}