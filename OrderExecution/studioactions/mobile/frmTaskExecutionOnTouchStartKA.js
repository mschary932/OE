function frmTaskExecutionOnTouchStartKA(eventobject, x, y) {
    return AS_Segment_7585165aafc74e928a7186fa3d5cd2b1(eventobject, x, y);
}

function AS_Segment_7585165aafc74e928a7186fa3d5cd2b1(eventobject, x, y) {
    /*alert("touchstart kony.servicesapp.rowreset"+kony.servicesapp.rowreset);
    alert("tpuch startswipedIndices keys length"+Object.keys(kony.servicesapp.swipedIndices).length);*/
    if ((Object.keys(kony.servicesapp.swipedIndices).length > 0) && !kony.servicesapp.isAnimationInProgress) {
        var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", false);
        frmTaskExecutionKA.segSwipeKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flxChildKA"],
            animation: animObj
        });
    }
}