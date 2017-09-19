function p2kwiet1234563580124_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack", [true]);
};

function p2kwiet1234563580124_btnCallKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var phoneNum = this.parent.lblPhoneNumberValueKA.text;
    if (phoneNum.indexOf('(') != -1) {
        phoneNum = phoneNum.substring(0, phoneNum.indexOf('('));
    }
    controller.performAction("callContact", [phoneNum]);
};

function p2kwiet1234563580124_btnAlternatePhoneKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("callContact", [this.parent.lblAlternatePhoneKA.text]);
};

function p2kwiet1234563580124_btnEmailKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("sendMail", [this.parent.lblEmailValueKA.text]);
};

function p2kwiet1234563580124_btnMsgKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("sendMessage");
};

function p2kwiet1234563580139_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm");
};

function p2kwiet1234563580139_btnListKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectFilters");
};

function p2kwiet1234563580139_segDateFilterKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber, selectedState) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var selectedRecords = controller.getFormModel().getViewAttributeByProperty("segDateFilterKA", "selectedRowIndex");
    if (selectedRecords) {
        controller.performAction("onRowClickOfSegFilter", [selectedRecords[1]]);
    }
};

function p2kwiet1234563580139_btnClearFiltersKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("clearFilters");
};

function p2kwiet1234563580148_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
};

function p2kwiet1234563580157_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
};

function p2kwiet1234563580157_btnShareKA_onClick_seq0(eventobject) {
    alert("Work in Progress");
};

function p2kwiet1234563580157_btnCurrenLocation_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("getCurrentLocation");
};

function p2kwiet1234563580185_frmFSLoginKA_preshow_seq0(eventobject) {
    if (!kony.servicesapp.isAppLaunchedFirstTime) animateInitScreen();
};

function p2kwiet1234563580185_frmFSLoginKA_postshow_seq0(eventobject) {
    animateInitScreen();
};

function p2kwiet1234563580185_flxQRCodeKA_onTouchEnd_seq0(eventobject, x, y) {
    LoginController.captureBarcode();
};

function p2kwiet1234563580185_btnManualSetupKA_onClick_seq0(eventobject) {
    frmTenantKA.show();
};

function p2kwiet1234563580197_flxMenuItem0CntrKA_onTouchEnd_seq0(eventobject, x, y) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var viewControllerExtension = INSTANCE.getFormController("frmOrdersViewsKA").getControllerExtensionObject();;
    var listController = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    new hamburgerMenu().execute();
    viewControllerExtension.setFormModelInfo("viewType", kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
    viewControllerExtension.setFormModelInfo("DateFilterIndex1", null);
    viewControllerExtension.setFormModelInfo("DateFilter1", null);
    viewControllerExtension.setFormModelInfo("orderViewFilters1", null);
    listController.performAction("setSegmentListDataKA", ["btnDay1KA"]);
};

function p2kwiet1234563580197_btnLogoutKA_onClick_seq0(eventobject) {
    TAG.NC.registerEvent(frmOrderListKA.btnLogoutKA);
    kony.sdk.mvvm.LogoutAction();
};

function p2kwiet1234563580197_btnManualSyncKA_onClick_seq0(eventobject) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
    startManualSync(true);
};

function p2kwiet1234563580219_frmLoginKA_preshow_seq0(eventobject) {
    var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
    if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
        frmLoginKA.switchonoffKA.nativeThumbLook = true;
    }
    kony.sdk.mvvm.populateUserCredentialsFromStore();
    frmLoginKA.lblVersionNumberKA.text = kony.servicesapp.constants.getServiceConstantsObj().getValue("VERSION_NUMBER");
    if (kony.servicesapp.isAppLaunchedFirstTime) animateLoginScreen();
};

function p2kwiet1234563580219_frmLoginKA_postshow_seq0(eventobject) {
    animateLoginScreen();
    preShowSyncAnimCall.call(this);
    kony.sdk.mvvm.backGroundSyncInProgress = false;
};

function p2kwiet1234563580219_tbxPasswordKA_onDone_seq0(eventobject, changedtext) {
    kony.sdk.mvvm.LoginAction();
};

function p2kwiet1234563580219_btnLoginKA_onClick_seq0(eventobject) {
    kony.sdk.mvvm.LoginAction();
};

function p2kwiet1234563580219_switchonoffKA_onslide_seq0(eventobject) {
    var platFormName = kony.appfoundation.Utils.getPlatformName();
    if (kony.store.getItem("isTouchIDEnabled")) {
        kony.ui.Alert(kony.i18n.getLocalizedString("i18n.common.login.alert.RememberMe"), callback, constants.ALERT_TYPE_CONFIRMATION, kony.i18n.getLocalizedString("i18n.common.login.alert.continueKA"), kony.i18n.getLocalizedString("i18n.common.cancelValueKA"), kony.i18n.getLocalizedString("i18n.common.login.alert.continueKA"), {});

        function callback(response) {
            if (response) {
                kony.store.setItem("isTouchIDEnabled", false);
                frmLoginKA.flxTouchDKA.setVisibility(false);
            } else {
                frmLoginKA.switchonoffKA.selectedIndex = 0;
            }
        }
    } else if (platFormName === kony.appfoundation.Platforms["ANDROID"] || platFormName === kony.appfoundation.Platforms["TABRCANDROID"]) {
        kony.appfoundation.rememberMeKA();
    }
};

function p2kwiet1234563580219_flxReConnectKA_onTouchStart_seq0(eventobject, x, y) {
    frmTenantKA.show();
};

function p2kwiet1234563580219_btnTouchKA_onClick_seq0(eventobject) {
    LocalAuthController.authenicateTouchId();
};

function p2kwiet1234563580269_frmOrderCompleteCheckListKA_preshow_seq0(eventobject) {
    var platFormName = kony.appfoundation.Utils.getPlatformName();
    if (platFormName == kony.appfoundation.Platforms["IPHONE"] || platFormName == 'ipad') {
        frmOrderCompleteCheckListKA.switchProblemSolKA.nativeThumbLook = true;
        frmOrderCompleteCheckListKA.switchRegResourceKA.nativeThumbLook = true;
        frmOrderCompleteCheckListKA.switchClnLocKA.nativeThumbLook = true;
    }
};

function p2kwiet1234563580269_frmOrderCompleteCheckListKA_postshow_seq0(eventobject) {
    frmDescriptionDetailsKA.lblHeaderKA.text = "Complete Order Description";
};

function p2kwiet1234563580320_frmOrderDetailsKA_preshow_seq0(eventobject) {
    frmOrderDetailsKA.flxScrollDetailsKA.contentOffset = {
        x: 0,
        y: 0
    };
};

function p2kwiet1234563580320_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
};

function p2kwiet1234563580320_flxParentContactKA_onTouchEnd_seq0(eventobject, x, y) {
    /* 

var INSTANCE = kony.appfoundation.v2.KonyApplicationContext.getAppInstance();
var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
controller.performAction("showContactDetailsForm"); 

 */
};

function p2kwiet1234563580351_frmOrderExecutionKA_onhide_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmOrderExecutionKA");
    controller.performAction("cancelTimer");
};

function p2kwiet1234563580351_frmOrderExecutionKA_init_seq0(eventobject) {
    var orderDetailsKA = function() {
            var controller = navController().getViewController("frmOrderExecutionKA");
            controller.performAction("showEmpDetailsForm");
        };
    var orderAttachmentsKA = function() {
            alert("Work in progress");
        }
    var orderResourcesKA = function() {
            alert("Work in progress");
        }
    var orderHistoryKA = function() {
            alert("Work in progress");
        }
    var orderNotificationKA = function() {
            alert("Work in progress");
        }
    var widgets = [{
        "skin": "sknBtnDtlsKA",
        "focusSkin": "sknBtnDtlsFocKA",
        "onclick": orderDetailsKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnAttachmentsKA",
        "focusSkin": "sknBtnAttachmentsFocKA",
        "onclick": orderAttachmentsKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnHistoryKA",
        "focusSkin": "sknBtnHistoryFocKA",
        "onclick": orderHistoryKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnResourcesKA",
        "focusSkin": "sknBtnResourcesFocKA",
        "onclick": orderResourcesKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnPhotosKA",
        "focusSkin": "sknBtnPhotosFocKA",
        "onclick": orderNotificationKA,
        "widgetType": "button"
    }];
    var utilitiesObj = new utilities(frmOrderExecutionKA);
    utilitiesObj.configureSubMenu("flxScrollTypesKA", widgets, true);
};

function p2kwiet1234563580351_btnHeaderKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
};

function p2kwiet1234563580351_lblAddressKA_onTouchEnd_seq0(eventobject, x, y) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFrmDirectionKA");
};

function p2kwiet1234563580351_btnOrderDetailsKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showWorkOrderDetailsForm");
};

function p2kwiet1234563580351_btnHistoryKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showWorkOrderHistoryForm");
};

function p2kwiet1234563580351_btnOrderResKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showWorkOrderResourcesForm");
};

function p2kwiet1234563580351_segDetailsKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTaskExecutionForm");
};

function p2kwiet1234563580351_btnCompleteKA_onClick_seq0(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
    controller.performAction("changeStatusForWorkorder");
};

function p2kwiet1234563580351_btnHoldKA_onClick_seq0(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
    controller.performAction("changeStatusForWorkorder");
};

function p2kwiet1234563580351_btnCancelKA_onClick_seq0(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionKA");
    controller.performAction("completeOrRejectWorkorder");
};

function p2kwiet1234563580359_btnHeaderKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
};

function p2kwiet1234563580384_frmOrderListKA_preshow_seq0(eventobject) {
    /* 
kony.appfoundation.isValidBackGroundSyncForm = true;
if((!kony.appfoundation.backGroundSyncInProgress) && frmOrderListKA.flxHorizontalAnimationaKA){
 frmOrderListKA.remove(flxHorizontalAnimationaKA);
}
 

 */
};

function p2kwiet1234563580384_frmOrderListKA_postshow_seq0(eventobject) {
    /* 
var INSTANCE = kony.appfoundation.v2.KonyApplicationContext.getAppInstance();
var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
controller.performAction("orderListPostShow");
if(kony.appfoundation.backGroundSyncInProgress){
 startProgressBarAnimation();
}


 */
};

function p2kwiet1234563580384_flexMainKA_onTouchEnd_seq0(eventobject, x, y) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
};

function p2kwiet1234563580384_btnViewFilterKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderListView");
};

function p2kwiet1234563580384_btnAppMenuKA_onClick_seq0(eventobject) {
    //var INSTANCE = kony.appfoundation.v2.KonyApplicationContext.getAppInstance();
    //var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    //controller.performAction("showHideHamburgerMenuKA",[frmOrderListKA,frmHamburgerMenuWOKA]);
    new hamburgerMenu().execute();
};

function p2kwiet1234563580384_btnDay1KA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("setSegmentListDataKA", [this.id]);
};

function p2kwiet1234563580384_btnDay2KA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("setSegmentListDataKA", [this.id]);
};

function p2kwiet1234563580384_btnDay3KA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("setSegmentListDataKA", [this.id]);
};

function p2kwiet1234563580384_btnDay4KA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("setSegmentListDataKA", [this.id]);
};

function p2kwiet1234563580384_btnDay0KA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    if (!hamburgerMenu.IS_MENU_SHOWN) {
        controller.performAction("setSegmentListDataKA", [this.id]);
    } else {
        new hamburgerMenu().execute();
    }
};

function p2kwiet1234563580384_btnListOrderKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("actionForList");
};

function p2kwiet1234563580384_btnMapShowKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("actionForMap");
};

function p2kwiet1234563580384_segOrderListKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    if (!hamburgerMenu.IS_MENU_SHOWN) {
        controller.performAction("showOrderExecutionForm");
    } else {
        new hamburgerMenu().execute();
    }
};

function p2kwiet1234563580384_segOrderListKA_onTouchEnd_seq0(eventobject, x, y) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
};

function p2kwiet1234563580384_btnCurrenLocation_onClick_seq0(eventobject) {
    /* 
var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
var utilitiesObj = utilities.getUtilityObj();
kony.appfoundation.v2.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
controller.performAction("getCurrentLocation",[true]);


 */
};

function p2kwiet1234563580402_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
};

function p2kwiet1234563580429_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
};

function p2kwiet1234563580429_btnOptionsKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFilters", [true]);
};

function p2kwiet1234563580429_btnBarcodeSearchKA_onClick_seq0(eventobject) {
    alert("Work In Progress");
};

function p2kwiet1234563580429_segDetailskA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToResourceExecution");
};

function p2kwiet1234563580429_btnCancelKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFilters", [false]);
};

function p2kwiet1234563580429_btnOKKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("applyView");
};

function p2kwiet1234563580441_flxMainKA_onTouchEnd_seq0(eventobject, x, y) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm");
};

function p2kwiet1234563580441_btnCancelKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBackWithoutReload");
};

function p2kwiet1234563580441_btnOKKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("formatOrderListDataKA");
};

function p2kwiet1234563580441_segOrderViewKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber, selectedState) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var selectedRecords = controller.getFormModel().getViewAttributeByProperty("segOrderViewKA", "selectedRowIndex");
    if (selectedRecords) {
        controller.performAction("onRowClickOfSegView", [selectedRecords[1]]);
    }
};

function p2kwiet1234563580441_segFilterViewKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var selectedRecords = controller.getFormModel().getViewAttributeByProperty("segFilterViewKA", "selectedRowIndex");
    if (selectedRecords) {
        controller.performAction("showOrderFilterForm", [selectedRecords[1]]);
    }
};

function p2kwiet1234563580488_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
};

function p2kwiet1234563580488_btnSaveKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("saveQuantity");
};

function p2kwiet1234563580488_btnResorceDetailsKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToResourceDetails");
};

function p2kwiet1234563580488_btnEditKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("editQuantity");
};

function p2kwiet1234563580488_btnDeleteKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmResourceExecutionKA");
    controller.performAction("deleteQuantity");
};

function p2kwiet1234563580502_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm");
};

function p2kwiet1234563580502_btnListKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("selectFilters");
};

function p2kwiet1234563580502_btnClearFiltersKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("clearFilters");
};

function p2kwiet1234563580529_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
};

function p2kwiet1234563580554_frmTaskExecutionKA_onhide_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmTaskExecutionKA");
    controller.performAction("cancelTimer");
};

function p2kwiet1234563580554_frmTaskExecutionKA_init_seq0(eventobject) {
    var taskDetailsKA = function() {
            var controller = navController().getViewController("frmTaskExecutionKA");
            controller.performAction("showTaskDetails");
        };
    var taskResourcesKA = function() {
            alert("Work in progress");
        };
    var attachmentKA = function() {
            alert("Work in progress");
        };
    var widgets = [{
        "skin": "sknBtnDtlsKA",
        "focusSkin": "sknBtnDtlsFocKA",
        "onclick": taskDetailsKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnAttachmentsKA",
        "focusSkin": "sknBtnAttachmentsFocKA",
        "onclick": attachmentKA,
        "widgetType": "button"
    }, {
        "skin": "sknBtnResourcesKA",
        "focusSkin": "sknBtnResourcesFocKA",
        "onclick": taskResourcesKA,
        "widgetType": "button"
    }];
    var utilitiesObj = new utilities(frmTaskExecutionKA);
    utilitiesObj.configureSubMenu("flxScrollTypesKA", widgets, true);
};

function p2kwiet1234563580554_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
};

function p2kwiet1234563580554_btnTaskDetailsKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTaskDetails");
};

function p2kwiet1234563580554_btnTaskResKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToTaskResources");
};

function p2kwiet1234563580554_segTaskExecutionKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToResourceExecution");
};

function p2kwiet1234563580554_btnCompleteKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("changeStatusForTask");
};

function p2kwiet1234563580554_btnHoldKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("changeStatusForTask");
};

function p2kwiet1234563580554_btnCancelKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("completeOrRejectTask");
};

function p2kwiet1234563580581_btnBackKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
};

function p2kwiet1234563580581_btnOptionsKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFilters", [true]);
};

function p2kwiet1234563580581_btnBarcodeSearchKA_onClick_seq0(eventobject) {
    alert("Work In Progress");
};

function p2kwiet1234563580581_segDetailskA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToResourceExecution");
};

function p2kwiet1234563580581_btnCancelKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFilters", [false]);
};

function p2kwiet1234563580581_btnOKKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("applyView");
};

function p2kwiet1234563580608_frmTenantKA_preshow_seq0(eventobject) {
    frmTenantKA.lblBuildNumberKA.text = kony.servicesapp.constants.getServiceConstantsObj().getValue("VERSION_NUMBER");
};

function p2kwiet1234563580608_btnConnectKA_onClick_seq0(eventobject) {
    LoginController.verifyTenantURL();
    //frmLoginKA.show();
};

function p2kwiet1234563580608_btnQRCodeKA_onClick_seq0(eventobject) {
    frmFSLoginKA.show();
};

function p2kwiet1234563580624_frmTouchIDSetupKA_preshow_seq0(eventobject) {
    var credStore = kony.store.getItem(kony.appfoundation.credStoreName);
    var storedUsername;
    var key;
    if (credStore !== null && credStore !== undefined) {
        key = credStore[kony.appfoundation.credStoreSecretKey];
        storedUsername = kony.appfoundation.decryptData(key, credStore[kony.appfoundation.credStoreUsername]);
    }
    frmTouchIDSetupKA.lblUserNameKA.text = storedUsername;
};

function p2kwiet1234563580624_btnRejectKA_onClick_seq0(eventobject) {
    kony.store.setItem("isTouchIDEnabled", false);
    showFormOrderList();
};

function p2kwiet1234563580624_btnAcceptKA_onClick_seq0(eventobject) {
    kony.store.setItem("isTouchIDEnabled", true);
    showFormOrderList();
};

function p2kwiet1234563580638_frmURLKA_preshow_seq0(eventobject) {
    var credStore = kony.store.getItem(kony.appfoundation.credStoreName);
    var storedTenant;
    var storedHostName;
    if (credStore !== null && credStore !== undefined) {
        key = credStore[kony.appfoundation.credStoreSecretKey];
        storedTenant = credStore[kony.appfoundation.credStoreTenant];
        storedHostName = credStore[kony.appfoundation.credStoreHostName];
    }
    if (storedTenant && storedHostName && storedTenant == kony.appfoundation.tenant) {
        frmTanentKA.tbxTenantKA.text = storedTenant;
        frmTanentKA.tbxURLKA.text = storedHostName;
    } else {
        frmTanentKA.tbxTenantKA.text = kony.appfoundation.tenant;
        frmTanentKA.tbxURLKA.text = kony.appfoundation.tenantURL;
    }
};

function p2kwiet1234563580638_btnConnectKA_onClick_seq0(eventobject) {
    LoginController.verifyTenantURL();
};

function p2kwiet1234563580638_btnBarcodeScanKA_onClick_seq0(eventobject) {
    LoginController.captureBarcode();
};

function p2kwiet1234563580652_btnSelectFilterKA_onClick_seq0(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmOrdersViewsKA");
    controller.performAction("checkUncheckFilter");
};

function p2kwiet1234563580703_btnClearKA_onClick_seq0(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmOrdersViewsKA");
    controller.performAction("clearAllFilter");
};

function p2kwiet1234563580719_btnCallTechKA_onClick_seq0(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("makeCall");
};

function p2kwiet1234563580769_btnConssumedKA_onClick_seq0(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("changeConsumedStatus");
};

function orderxecutionpostappinit_seq0(params) {
    kony.application.setApplicationBehaviors({
        "retainSpaceOnHide": false,
        "hideDefaultLoadingIndicator": true
    });
    return LoginController.postAppInit();
};