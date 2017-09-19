function p2kwiet1234563580197_flxMenuItem0CntrKA_onTouchEnd_seq0(eventobject, x, y) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var viewControllerExtension = INSTANCE.getFormController("frmOrdersViewsKA").getControllerExtensionObject();;
    var listController = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    new hamburgerMenu().execute();
    viewControllerExtension.setFormModelInfo("viewType", kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
	viewControllerExtension.setFormModelInfo("viewType1", kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
	viewControllerExtension.setFormModelInfo("defaultFilterApplied",true);
    viewControllerExtension.setFormModelInfo("DateFilterIndex1", null);
    viewControllerExtension.setFormModelInfo("DateFilter1", null);
    viewControllerExtension.setFormModelInfo("orderViewFilters1", null);
    listController.performAction("setSegmentListDataKA", ["btnDay1KA"]);
}