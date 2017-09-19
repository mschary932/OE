function frmORLsegSwipeOnTouchStartKA(eventobject, x, y) {
    return AS_Segment_892183d9ede34c829f851c0152637cb9(eventobject, x, y);
}

function AS_Segment_892183d9ede34c829f851c0152637cb9(eventobject, x, y) {
    /*alert("touchstart kony.servicesapp.rowreset"+kony.servicesapp.rowreset);
    alert("tpuch startswipedIndices keys length"+Object.keys(kony.servicesapp.swipedIndices).length);*/
    if ((Object.keys(kony.servicesapp.swipedIndices).length > 0) && !kony.servicesapp.isAnimationInProgress) {
        var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", false);
        frmOrderResourcesListKA.segSwipeKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flxChildKA"],
            animation: animObj
        });
    }
}