function AS_Segment_e27036cccad742cda6aaef60e6397b59(eventobject, x, y) {
    alert("Swipe event");
    if ((Object.keys(kony.servicesapp.swipedIndices).length > 0) && !kony.servicesapp.isAnimationInProgress) {
        var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", false);
        frmTaskExecutionTabKA.segResourcesKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flexContainerKA"],
            animation: animObj
        });
    }
}