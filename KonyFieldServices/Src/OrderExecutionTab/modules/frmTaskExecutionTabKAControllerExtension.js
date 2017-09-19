/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmDetailsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

var hasShownShadow = false;
var hasShownHamburger = false;

kony.sdk.mvvm.frmTaskExecutionTabKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
	constructor: function(controllerObj) {
		this.$class.$super.call(this, controllerObj);
	},
	fetchData: function() {
		try {
			var scopeObj = this;
			kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
			if (Object.keys(kony.servicesapp.swipedIndices).length > 0) {
				alert("in if block");
				var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-50%", "0%", true);
				animObj["callbacks"] = {
					"animationEnd": function() {
						var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
						var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
						kony.servicesapp.rowreset = true;
						kony.servicesapp.swipedIndices = {};
						kony.servicesapp.coords = [];
						kony.servicesapp.isAnimationInProgress = false;
						//return controller.$class.$superp.fetchData.call(controller);
					}
				}
				frmTaskExecutionTabKA.segResourcesKA.animateRows({
					rows: [{
						sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
						rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
					}],
					widgets: ["flexContainerKA"],
					animation: animObj
				});
			} else if (kony.servicesapp.isAnimationInProgress && kony.application.getCurrentForm().id == "frmTaskExecutionTabKA") {
				return;
			} else {
				this.$class.$superp.fetchData.call(this);
			}
			this.$class.$superp.fetchData.call(this, success, error);

			function error(err) {
				kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
				var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
				kony.sdk.mvvm.log.error(exception.toString());
			}

			function success(response) {
				kony.sdk.mvvm.log.info("success fetching data ", response);
				//scopeObj.formatData(response);
				scopeObj.bindData(response);
			}
		} catch (err) {
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
			var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
			kony.sdk.mvvm.log.error(exception.toString());
		}

		function success(response) {
			kony.sdk.mvvm.log.info("success fetching data ", response);
			//scopeObj.getController().processData(response);
			scopeObj.bindData(response);
		}

		function error(err) {
			//Error fetching data
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
			var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
			kony.sdk.mvvm.log.error(exception.toString());
		}
	},
	bindData: function(data) {
		try {
			var formModel = this.getController().getFormModel();
			formModel.showView();
		} catch (err) {
			kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
		}
	},
	fetchMasterData: function(successcallback, errorcallback) {
		try {
			this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
		} catch (e) {
			kony.sdk.mvvm.log.error("Error in fetchingMasterData", e);
		}
	},
	fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
		try {
			this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
		} catch (e) {
			kony.sdk.mvvm.log.error("Error in fetchingMasterDataForWidget", e);
		}
	},
	saveData: function() {
		var scopeObj = this;
		this.$class.$superp.saveData.call(this, success, error);
	},
	deleteData: function() {
		try {
			var scopeObj = this;
			this.$class.$superp.deleteData.call(this, success, error);
		} catch (err) {
			kony.sdk.mvvm.log.error(exception.toString());
		}
	},
	showOrderExecutionForm: function() {
		var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionTabKA").getFormModel();
		formmodel.showView();
	},
	
	submenu: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexResourcesLblKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flexIndicator1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexTaskDetailsKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flexIndicator2KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexAttachmentsKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flexIndicator3KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexImagesKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flexIndicator4KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexTimeExpenseKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flexIndicator5KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexExtendedAttributesKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flexIndicator6KA", "isVisible", false);
	},
	hideFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexOneResourcesKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexTwoTaskDetailsKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexThreeImagesKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexFourAttachmentsKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexFiveTimeExpenseKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexSixExtendedAttributesKA", "left", "100%");
	},
	showFlex: function(flex) {
		animationInProgress = true;
		var pageDisplayAnim = {
			"0": {
				"opacity": 1,
				"stepConfig": {
					"timingFunction": kony.anim.EASE
				}
			},
			"100": {
				"left": "0%",
				"stepConfig": {
					"timingFunction": kony.anim.EASE
				}
			}
		};
		flex.animate(kony.ui.createAnimation(pageDisplayAnim), {
			"delay": 0,
			"iterationCount": 1,
			"fillMode": kony.anim.FILL_MODE_FORWARDS,
			"duration": 0.2
		}, {
			"animationEnd": function() {
				animationInProgress = false;
			}
		});
	},
	showOneResourcesDetails: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexResourcesLblKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator1KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmTaskExecutionTabKA.flexOneResourcesKA);
		}
	},
	showTwoTaskDetails: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexTaskDetailsKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator2KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmTaskExecutionTabKA.flexTwoTaskDetailsKA);
		}
	},
	showThreeImages: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexImagesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator4KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmTaskExecutionTabKA.flexThreeImagesKA);
		}
	},
	showFourAttachments: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexAttachmentsKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator3KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmTaskExecutionTabKA.flexFourAttachmentsKA);
		}
	},
	showTimeExpense: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseFocusKA");
			formModel.setViewAttributeByProperty("flexTimeExpenseKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator5KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmTaskExecutionTabKA.flexFiveTimeExpenseKA);
		}
	},
	showSixExtendedAttributes: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseFocusKA");
			formModel.setViewAttributeByProperty("flexExtendedAttributesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator6KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmTaskExecutionTabKA.flexSixExtendedAttributesKA);
		}
	},
	showDetailedInstruction: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexTwoInnerKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexTwoInnerInstructionKA", "isVisible", true);
	},
	showTaskDetailsBackInstruction: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexTwoInnerKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexTwoInnerInstructionKA", "isVisible", false);
	},
	showResourceExecutionForm: function() {
		var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmResourceExecutionTabKA").getFormModel();
		formmodel.showView();
	},
	showAddExpensePopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddExpensePopupKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", false);

	 } ,
	 cancelAddExpenseItemPopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddExpensePopupKA", "isVisible", false);
	 },
	 	 showAddTimePopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTimePopupKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", false);

	 },	 
	  cancelAddTimeItemPopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTimePopupKA", "isVisible", false);
	 },
	showTimeSegment: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseFocusKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseKA");
	},
	showExpenseSegment: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseFocusKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseKA");
	},
	showBothSegment: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseFocusKA");
	},
	showExpenseDetailsForm: function() {
		var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmExpenseDetailsTabKA").getFormModel();
		formmodel.showView();
	},
	showAddTimeExpense: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", true);
	},
	closeAddTimeExpense: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", false);
	},
	doNothingOnDeviceBackKA: function() {},
	showEditTimPopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexAddTimePopupKA", "isVisible", true);
	},
	hideEditTimePopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexEditTimePopupKA", "isVisible", false);
	},
	showBomFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
	},
	showViewFilter: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", true);
	},
	showViewFilterOne: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxViewContainer1KA", "isVisible", true);
	},
	backMapFlexOnlineCall: function() {
	    var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
	},
	backStockDetailsFlexOnlineCalls: function() {
	    var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
	},
	backStockLocationFlexOnlineCall: function() {
	    var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
	},
	backOnlineCall: function() {
	    var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
	},
	onHidePopUpCall: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", false);
	},
	onHidePopUpCallOne: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxViewContainer1KA", "isVisible", false);
	},
	showOnlineCallsFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesLoadingKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCallsKA", "isVisible", true);
		formModel.setViewAttributeByProperty("segMaterialKA", "isVisible", false);
	},
	showLoading: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesLoadingKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexOnlineCallsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("segMaterialKA", "isVisible", false);
	},
	showMaterialList: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesLoadingKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCallsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("segMaterialKA", "isVisible", true);
	},
	showResoucesFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
	},
	showStockLocationFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
	},
	showStockLocationsFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
	},
	showStockLocationDetails: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);
	},
	showMapStockLocation: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexOnlineCalls1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationDetailsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexStockLocationsKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", true);
	},
	showRequestPopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexStockRequestPopupKA", "isVisible", true);
	},
	onCancelRequestPopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexStockRequestPopupKA", "isVisible", false);
	},
	onAcceptRequestTransferPopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexStockRequestPopupKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexConfirmationPopupKA", "isVisible", true);
	},
	onCancelConfirmation: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexConfirmationPopupKA", "isVisible", false);
	},
	onRaisePurchaseRequest: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPurchaseRequestPopupKA", "isVisible", true);
	},
	onCancelPurchasePopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPurchaseRequestPopupKA", "isVisible", false);
	},
	onAcceptPurchasePopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPurchaseRequestPopupKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexConfirmationPopupKA", "isVisible", true);
	},
	showDateSpinner: function() {
		
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexCalendarKA", "isVisible", true);
	
	},
	hideDateSpinner: function() {
		
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexCalendarKA", "isVisible", false);
	
	},
	showDateSpinnerOne: function() {
		
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexCalendar1KA", "isVisible", true);
	
	},
	hideDateSpinnerOne: function() {
		
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexCalendar1KA", "isVisible", false);
	
	},
	showHamburgerMenu:function(){
		 if(!hasShownHamburger){
        frmTaskExecutionTabKA.flexMainKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "35%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
    }, {
        "animationEnd": function(){
			
		}
    }); 
	
	    frmTaskExecutionTabKA.flxMainMenuKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
    }, {
        "animationEnd": function(){
			
		}
    });
	
	hasShownHamburger = true;
		 }
		 else{
			 frmTaskExecutionTabKA.flexMainKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
    }, {
        "animationEnd": function(){
			
		}
    }); 
	
	    frmTaskExecutionTabKA.flxMainMenuKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "-35%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
    }, {
        "animationEnd": function(){
			
		}
    });
	hasShownHamburger = false;
		 }

	},
	showAndHideShadow:function(){

		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
		if(!hasShownShadow){
		formModel.setViewAttributeByProperty("flxShadowKA", "isVisible", true);	
		hasShownShadow = true;
		}
		else{
		formModel.setViewAttributeByProperty("flxShadowKA", "isVisible", false);	
		hasShownShadow = false;	
		}
	},
	showSettingScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		formModel.setViewAttributeByProperty("flexMainMenuContainerKA", "isVisible", false);
        formModel.setViewAttributeByProperty("FlexMainSettingsKA", "isVisible", true);		
	 },
	 showPanicScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		
        formModel.setViewAttributeByProperty("flexPanicPopUpKA", "isVisible", true);		
	 },
	 showMyOrderListForm: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmMyOrderListTabKA").getFormModel();
        formmodel.showView();

	 },
	 showAvailableOrderListForm: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmAvailableOrderListTabKA").getFormModel();
        formmodel.showView();

	 },
	 backFromSettingScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		formModel.setViewAttributeByProperty("flexMainMenuContainerKA", "isVisible", true);
        formModel.setViewAttributeByProperty("FlexMainSettingsKA", "isVisible", false);		
	 },
	 backFromPanicScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		
        formModel.setViewAttributeByProperty("flexPanicPopUpKA", "isVisible", false);		
	 }	 

});