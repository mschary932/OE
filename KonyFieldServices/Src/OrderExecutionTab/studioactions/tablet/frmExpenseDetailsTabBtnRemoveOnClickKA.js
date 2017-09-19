function frmExpenseDetailsTabBtnRemoveOnClickKA(eventobject) {
    return AS_Button_7a7bde01f265449abdbcab582cef4874(eventobject);
}

function AS_Button_7a7bde01f265449abdbcab582cef4874(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDeleteExpensePopUp");
}