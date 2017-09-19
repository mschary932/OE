function tmpBOMbtnBOMSegmentOnClickKA(eventobject, context) {
    return AS_Button_afa77062198d4f039177d4658604eba6(eventobject, context);
}

function AS_Button_afa77062198d4f039177d4658604eba6(eventobject, context) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formmodel = controller.getFormModel();
    if (kony.sdk.mvvm.isNetworkAvailabile()) {
        var selectedRow = formmodel.getViewAttributeByProperty("segBOMKA", "selectedIndex");
        controller.performAction("fetchChildObjects", [selectedRow]);
    } else {
        var utilitiesObj = utilities.getUtilityObj();
        alert(utilitiesObj.geti18nValueKA("i18n.common.NoInternetAlertKA"));
    }
}