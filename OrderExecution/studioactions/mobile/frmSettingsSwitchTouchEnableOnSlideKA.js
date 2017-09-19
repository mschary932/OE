function frmSettingsSwitchTouchEnableOnSlideKA(eventobject) {
    return AS_Switch_3b6783d7d4cf4b4b87f4a6111adf8487(eventobject);
}

function AS_Switch_3b6783d7d4cf4b4b87f4a6111adf8487(eventobject) {
    if (frmSettingsKA.SwitchTouchIDKA.selectedIndex === 0) {
        frmTouchIDSetupKA.show();
    } else {
        kony.store.setItem("isTouchIDEnabled", false);
    }
}