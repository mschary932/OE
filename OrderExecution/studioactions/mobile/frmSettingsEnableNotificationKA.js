function frmSettingsEnableNotificationKA(eventobject) {
    return AS_Switch_9ca94571f28542c2bd94a106419578e9(eventobject);
}

function AS_Switch_9ca94571f28542c2bd94a106419578e9(eventobject) {
    if (frmSettingsKA.switchNotificationKA.selectedIndex === 0) {
        kony.servicesapp.pushRegister();
    } else {
        kony.servicesapp.unsubscribeKPNS();
    }
}