function frmOrderAssetBtnBOMHeaderOnClickKA(eventobject) {
    return AS_Button_4ec3ef4968db48978a38b5d865d49fcb(eventobject);
}

function AS_Button_4ec3ef4968db48978a38b5d865d49fcb(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderAssetKA");
    if (kony.sdk.mvvm.isNetworkAvailabile()) {
        controller.performAction('navigateToBOM');
    } else {
        var utilitiesObj = utilities.getUtilityObj();
        alert(utilitiesObj.geti18nValueKA("i18n.common.NoInternetAlertKA"));
    }
}