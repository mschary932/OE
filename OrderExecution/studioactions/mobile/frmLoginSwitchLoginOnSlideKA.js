function frmLoginSwitchLoginOnSlideKA(eventobject) {
    return AS_Switch_aef4ff8b70b34efcb081ebe15089b374(eventobject);
}

function AS_Switch_aef4ff8b70b34efcb081ebe15089b374(eventobject) {
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
    } else {
        kony.servicesapp.rememberMeKA();
    }
}