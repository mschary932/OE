function frmSettingsPreShowKA(eventobject) {
    return AS_Form_2f218f73d1a84478b88edcb7b451e2a9(eventobject);
}

function AS_Form_2f218f73d1a84478b88edcb7b451e2a9(eventobject) {
    if (kony.store.getItem("isTouchIDEnabled")) {
        frmSettingsKA.SwitchTouchIDKA.selectedIndex = 0;
    } else {
        frmSettingsKA.SwitchTouchIDKA.selectedIndex = 1;
    }
    if (kony.store.getItem("isNotificationEnabled")) {
        frmSettingsKA.switchNotificationKA.selectedIndex = 0;
    } else {
        frmSettingsKA.switchNotificationKA.selectedIndex = 1;
    }
    if (kony.sdk.mvvm.Utils.isAndroid() || kony.sdk.mvvm.Utils.isAndroidTablet()) frmSettingsKA.flxEnableTouchID.isVisible = false;
}