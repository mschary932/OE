function navigateToFrmHistory(eventobject) {
    return AS_Button_d3667882b0384afd89f229a82df8cc60(eventobject);
}

function AS_Button_d3667882b0384afd89f229a82df8cc60(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showHistoryForm");
    } catch (e) {}
}