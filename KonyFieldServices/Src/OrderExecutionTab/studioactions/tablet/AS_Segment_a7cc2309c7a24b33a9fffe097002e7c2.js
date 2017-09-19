function AS_Segment_a7cc2309c7a24b33a9fffe097002e7c2(eventobject, x, y) {
    alert("on touch start event");
    if ((Object.keys(kony.servicesapp.swipedIndices).length) > 0 && !kony.servicesapp.isAnimationInProgress) {
        alert("In swipe event");
        var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", false);
        alert("In swipe event22");
        frmTaskExecutionTabKA.segResourcesKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flexContainerKA"],
            animation: animObj
        });
        alert("In swipe event33");
    } else {
        alert("in else");
    }
}