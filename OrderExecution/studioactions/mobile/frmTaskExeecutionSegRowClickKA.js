function frmTaskExeecutionSegRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_94efa707145f498e8738e4d0e0c5bed7(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_94efa707145f498e8738e4d0e0c5bed7(eventobject, sectionNumber, rowNumber) {
    kony.print("onRowClick kony.servicesapp.rowreset" + kony.servicesapp.rowreset);
    /*alert("onRowClick swiped indices length"+Object.keys(kony.servicesapp.swipedIndices).length);
    alert("onRowClick coord"+kony.servicesapp.coords.length);
    alert("onRowClick kony.servicesapp.isAnimationInProgress"+kony.servicesapp.isAnimationInProgress);*/
    if (kony.servicesapp.isAnimationInProgress) {
        return;
    } else if (((Object.keys(kony.servicesapp.swipedIndices).length > 0))) {
        frmTaskExecutionKA.segSwipeKA.animateRows({
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