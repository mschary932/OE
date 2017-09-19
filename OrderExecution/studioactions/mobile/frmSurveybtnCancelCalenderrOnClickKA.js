function frmSurveybtnCancelCalenderrOnClickKA(eventobject) {
    return AS_Button_0e697c27702b49e984db462efd2893e0(eventobject);
}

function AS_Button_0e697c27702b49e984db462efd2893e0(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var formmodel = controller.getFormModel();
    formmodel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", false);
}