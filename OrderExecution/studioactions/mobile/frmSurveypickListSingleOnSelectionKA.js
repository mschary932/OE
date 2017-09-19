function frmSurveypickListSingleOnSelectionKA(eventobject) {
    return AS_ListBox_265285e9c56349f98e6acdfbf2d8823b(eventobject);
}

function AS_ListBox_265285e9c56349f98e6acdfbf2d8823b(eventobject) {
    var ques = parseInt((this.id).substring(3)).toFixed();
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    controller.performAction("saveInputValue", [ques, "picklistSingle"]);
    var formModel = controller.getFormModel();
}