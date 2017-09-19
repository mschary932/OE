function frmORLSegDetailsOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_8fda04f5dfd84bb58c45c40d14e0433d(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_8fda04f5dfd84bb58c45c40d14e0433d(eventobject, sectionNumber, rowNumber) {
    if (kony.servicesapp.isAnimationInProgress) {
        return;
    } else if (((Object.keys(kony.servicesapp.swipedIndices).length > 0))) {
        frmOrderResourcesListKA.segSwipeKA.animateRows({
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
        controller.performAction("navigateToResourceExecution");
    }
}