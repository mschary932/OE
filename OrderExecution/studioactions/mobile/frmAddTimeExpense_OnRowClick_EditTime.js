function frmAddTimeExpense_OnRowClick_EditTime(eventobject) {
    return AS_FlexContainer_2205d664f747492e95f913703e17ee0e(eventobject);
}

function AS_FlexContainer_2205d664f747492e95f913703e17ee0e(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToAddScreen", ["Time"]);
}