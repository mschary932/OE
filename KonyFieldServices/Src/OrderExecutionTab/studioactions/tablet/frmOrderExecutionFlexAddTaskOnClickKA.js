function frmOrderExecutionFlexAddTaskOnClickKA(eventobject) {
    return AS_FlexContainer_dbe379916c304d43b4d71c360353a393(eventobject);
}

function AS_FlexContainer_dbe379916c304d43b4d71c360353a393(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTask");
}