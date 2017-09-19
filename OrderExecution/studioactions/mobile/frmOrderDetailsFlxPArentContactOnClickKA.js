function frmOrderDetailsFlxParentContactOnClickKA(eventobject) {
    return AS_FlexContainer_371ce6d331ee49bc91c3957afad8ec18(eventobject);
}

function AS_FlexContainer_371ce6d331ee49bc91c3957afad8ec18(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showContactDetailsForm");
    } catch (err) {}
}