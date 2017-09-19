function p2kwiet1234563580219_switchonoffKA_onslide_seq0(eventobject) {
    var platFormName = kony.appfoundation.Utils.getPlatformName();
    if (kony.store.getItem("isTouchIDEnabled")) {
        kony.ui.Alert(kony.i18n.getLocalizedString("i18n.common.login.alert.RememberMe"), callback, constants.ALERT_TYPE_CONFIRMATION, kony.i18n.getLocalizedString("i18n.common.login.alert.continueKA"), kony.i18n.getLocalizedString("i18n.common.cancelValueKA"), kony.i18n.getLocalizedString("i18n.common.login.alert.continueKA"), {});

        function callback(response) {
            if (response) {
                kony.store.setItem("isTouchIDEnabled", false);
                frmLoginKA.flxTouchDKA.setVisibility(false);
            } else {
                frmLoginKA.switchonoffKA.selectedIndex = 0;
            }
        }
    } else if (platFormName === kony.appfoundation.Platforms["ANDROID"] || platFormName === kony.appfoundation.Platforms["TABRCANDROID"]) {
        kony.appfoundation.rememberMeKA();
    }
}