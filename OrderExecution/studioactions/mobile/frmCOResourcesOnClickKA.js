function frmCOResourcesOnClickKA(eventobject) {
    return AS_Button_855f0c5b08cb4bffa71c525c6537eef9(eventobject);
}

function AS_Button_855f0c5b08cb4bffa71c525c6537eef9(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showWorkOrderResourcesForm");
}