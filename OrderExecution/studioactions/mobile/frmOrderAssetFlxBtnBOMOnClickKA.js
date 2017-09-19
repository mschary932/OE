function frmOrderAssetFlxBtnBOMOnClickKA(eventobject) {
    return AS_FlexContainer_c64f1ab7e9e14944ad641ceaafecef4b(eventobject);
}

function AS_FlexContainer_c64f1ab7e9e14944ad641ceaafecef4b(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderAssetKA");
    if (kony.sdk.mvvm.isNetworkAvailabile()) {
        controller.performAction('navigateToBOM');
    } else {
        var utilitiesObj = utilities.getUtilityObj();
        alert(utilitiesObj.geti18nValueKA("i18n.common.NoInternetAlertKA"));
    }
}