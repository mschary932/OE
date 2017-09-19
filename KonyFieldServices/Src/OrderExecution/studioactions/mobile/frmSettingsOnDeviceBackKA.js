function frmSettingsOnDeviceBackKA(eventobject) {
    return AS_Form_1f58e99cd9064ec09107732aef7e67d7(eventobject);
}

function AS_Form_1f58e99cd9064ec09107732aef7e67d7(eventobject) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    } else {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController("frmOrderExecutionKA");
        controller.performAction("showPreviousForm", [true]);
    }
}