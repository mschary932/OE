function frmTAE_Seg_OnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_04d3693a25aa427799e7e6ccac0020b3(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_04d3693a25aa427799e7e6ccac0020b3(eventobject, sectionNumber, rowNumber) {
    if (kony.servicesapp.isAnimationInProgress) {
        return;
    } else if (((Object.keys(kony.servicesapp.swipedIndices).length > 0))) {
        frmTimeAndExpenseKA.SegTimeExpenseKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flxChildKA"],
            animation: kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", true)
        });
    } else if (kony.servicesapp.coords.length == 0) {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("navigateToTimeAndExpenseDetails");
    }
}