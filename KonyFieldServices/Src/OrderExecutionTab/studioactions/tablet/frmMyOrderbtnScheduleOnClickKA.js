function frmMyOrderbtnScheduleOnClickKA(eventobject) {
    return AS_Button_8c571e7d6cb94a258b3293085200ad21(eventobject);
}

function AS_Button_8c571e7d6cb94a258b3293085200ad21(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnScheduleKA']);
}