function frmdirectionStepsBtnBackOnClickKA(eventobject) {
    return AS_Button_5b958abee75a482eafeb84e344b851fe(eventobject);
}

function AS_Button_5b958abee75a482eafeb84e344b851fe(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}