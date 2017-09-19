function frmExpenseDetailsKA_onCloseButton(eventobject) {
    return AS_Button_23e8d03439e64752b2df31aa307e423a(eventobject);
}

function AS_Button_23e8d03439e64752b2df31aa307e423a(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    formModel.setViewAttributeByProperty("flxDeleteKA", "isVisible", false);
    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(kony.i18n.getLocalizedString("i18n.common.msg.loadingDataKA"));
}