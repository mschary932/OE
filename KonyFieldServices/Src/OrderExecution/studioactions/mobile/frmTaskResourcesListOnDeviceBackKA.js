function frmTaskResourcesListOnDeviceBackKA(eventobject) {
    return AS_Form_0bfd0851a4e74cc28c78124cd16abc4b(eventobject);
}

function AS_Form_0bfd0851a4e74cc28c78124cd16abc4b(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("deviceBackForAndroidTaskResourcesList");
    } catch (e) {}
}