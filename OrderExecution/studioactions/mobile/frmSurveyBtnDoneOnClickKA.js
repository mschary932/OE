function frmSurveyBtnDoneOnClickKA(eventobject) {
    return AS_Button_449216becab54117b46645a693073516(eventobject);
}

function AS_Button_449216becab54117b46645a693073516(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmSurveyKA");
    var callSave = controller.performAction("checkForMandatoryFields");
    if (!callSave) {
        var utilitiesObj = utilities.getUtilityObj();
        var alertText = utilitiesObj.geti18nValueKA("i18n.common.FillMandatoryFields");
        alert(alertText);
    } else {
        var formmodel = controller.getFormModel();
        formmodel.setViewAttributeByProperty("flxConfirmbg", "isVisible", true);
    }
}