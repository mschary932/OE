function tmpResourceSegBtnBOMOnClickKA(eventobject, context) {
    return AS_Button_549a43e3f9884893948399f3f3da9167(eventobject, context);
}

function AS_Button_549a43e3f9884893948399f3f3da9167(eventobject, context) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formmodel = controller.getFormModel();
    if (kony.sdk.mvvm.isNetworkAvailabile()) {
        var selectedRow = formmodel.getViewAttributeByProperty("segSwipeKA", "selectedIndex");
        controller.performAction("showBOM", [selectedRow]);
    } else {
        var utilitiesObj = utilities.getUtilityObj();
        alert(utilitiesObj.geti18nValueKA("i18n.common.NoInternetAlertKA"));
    }
}