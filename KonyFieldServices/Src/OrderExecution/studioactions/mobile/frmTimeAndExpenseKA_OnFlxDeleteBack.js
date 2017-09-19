function frmTimeAndExpenseKA_OnFlxDeleteBack(eventobject) {
    return AS_Button_ce0b97ca368b4c7485db210d4ffff7ec(eventobject);
}

function AS_Button_ce0b97ca368b4c7485db210d4ffff7ec(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    formModel.setViewAttributeByProperty("flxDeleteKA", "isVisible", false);
    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.common.msg.loadingDataKA"));
}