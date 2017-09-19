function frmPendingOrderAppMenuOnClickKA(eventobject) {
    return AS_Button_606e275ee40e44b2b67abf42e9a68e67(eventobject);
}

function AS_Button_606e275ee40e44b2b67abf42e9a68e67(eventobject) {
    if (Object.keys(kony.servicesapp.swipedIndices).length > 0) {
        var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-25%", "0%", true);
        animObj["callbacks"] = {
            "animationEnd": function() {
                var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
                var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
                kony.servicesapp.rowreset = true;
                kony.servicesapp.swipedIndices = {};
                kony.servicesapp.coords = [];
                kony.servicesapp.isAnimationInProgress = false;
            }
        }
        frmPendingOrderListKA.segPendingOrderListKA.animateRows({
            rows: [{
                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
            }],
            widgets: ["flxPendingOrdListKA"],
            animation: animObj
        });
    }
    new hamburgerMenu().execute();
}