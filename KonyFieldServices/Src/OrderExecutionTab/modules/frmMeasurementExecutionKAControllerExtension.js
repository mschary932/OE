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
var isMeasurementReadingDisplayed = true;
var isAttachmentsDisplayed = false;
var isImagesDisplayed = false;
var isCreateMeasurementReadingDisplayed = false;
kony.sdk.mvvm.frmMeasurementExecutionKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
	constructor: function(controllerObj) {
		this.$class.$super.call(this, controllerObj);
	},
	fetchData: function() {
		try {
			var scopeObj = this;
			this.$class.$superp.fetchData.call(this, success, error);
		} catch (err) {
			kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
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
	submenu: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexMeasurementExecutionKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flexIndicator1KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexAttachmentsKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flexIndicator2KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexImagesKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flexIndicator3KA", "isVisible", false);
	},
	hideFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexOneMeasurementReadingKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexTwoAttachmentsKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexThreeImagesKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexFourCreateMeasurementReadingKA", "left", "100%");
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
	showMeasurementReadings: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.hideFlex();
			scopeObj.showFlex(frmMeasurementExecutionKA.flexOneMeasurementReadingKA);
		}
	},
	FormBack: function() {
		var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderExecutionTabKA").getFormModel();
		formmodel.showView();
	},
	showMeasurementReadingForm: function() {
		var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmMeasurementsReadingKA").getFormModel();
		formmodel.showView();
	},
	showAttachments: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexAttachmentsKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator2KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmMeasurementExecutionKA.flexTwoAttachmentsKA);
		}
	},
	showImages: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexImagesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator3KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmMeasurementExecutionKA.flexThreeImagesKA);
		}
	},
	showCreateMeasurementReading: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexMeasurementExecutionKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator1KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmMeasurementExecutionKA.flexFourCreateMeasurementReadingKA);
		}
	},
	showMeasurementReadingCreationPopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexReadingExecutionPopupKA", "isVisible", true);
	},
	createReading: function() {
		var scopeObj = this;
		var formModel2 = scopeObj.getController().getFormModel();
		formModel2.setViewAttributeByProperty("flexReadingExecutionPopupKA", "isVisible", false);
		var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmMeasurementsReadingKA").getFormModel();
		formmodel.showView();
	},
	cancelReadingCreation: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexReadingExecutionPopupKA", "isVisible", false);
	},
	startMeasurementExecution: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("lblDateTimeKA", "isVisible", true);
		formModel.setViewAttributeByProperty("lblCreateReadingInstructionKA", "isVisible", true);
		formModel.setViewAttributeByProperty("btnAddMeasurementsKA", "isVisible", true);		
		
	},
	 showViewFilter: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", true);
	},
	onHidePopUpCall: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", false);
	},
    doNothingOnDeviceBackKA: function() {}
});