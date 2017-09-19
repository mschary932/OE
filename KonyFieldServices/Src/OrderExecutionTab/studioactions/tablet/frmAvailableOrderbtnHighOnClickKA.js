function frmAvailableOrderbtnHighOnClickKA(eventobject) {
    return AS_Button_534678994f7a4fa8a256ea8908215502(eventobject);
}

function AS_Button_534678994f7a4fa8a256ea8908215502(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onPriorityFilterClick", ['btnHighKA']);
}