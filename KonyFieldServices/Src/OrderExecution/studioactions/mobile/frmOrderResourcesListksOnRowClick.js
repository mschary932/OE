function frmOrderResourcesListksOnRowClick(eventobject, sectionNumber, rowNumber) {
    return p2kwiet1234563580429_segDetailskA_onRowClick_seq0(eventobject, sectionNumber, rowNumber);
}

function p2kwiet1234563580429_segDetailskA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("navigateToResourceExecution");
    } catch (e) {}
}