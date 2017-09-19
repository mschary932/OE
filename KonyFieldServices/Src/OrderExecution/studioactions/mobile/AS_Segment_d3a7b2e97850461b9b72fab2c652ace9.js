function AS_Segment_d3a7b2e97850461b9b72fab2c652ace9(eventobject, x, y) {
    if ((Object.keys(kony.servicesapp.swipedIndices).length > 0) && !kony.servicesapp.isAnimationInProgress) {
        var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", false);
        frmTimeAndExpenseKA.SegTimeExpenseKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flxChildKA"],
            animation: animObj
        });
    }
}