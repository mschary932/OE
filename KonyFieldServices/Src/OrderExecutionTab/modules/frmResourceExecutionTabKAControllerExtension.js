/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmResourceExecutionTabKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmResourceExecutionTabKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
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
	/*backToListView: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTaskExecutionTabKA").getFormModel();
        formmodel.showView();

	 },	
	 */
	submenu: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxExtendedAttributesKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flxStatusColor2KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flxResourceDetailsKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flxStatusColorKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flxImagesKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flxStatusColor3KA", "isVisible", false);
		formModel.setViewAttributeByProperty("flxAttachmentsKA", "skin", "sknFlexSubmenuKA");
		formModel.setViewAttributeByProperty("flxStatusColor4KA", "isVisible", false);
	},
	hideFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxExtendedAttributesContainerKA", "left", "100%");
		formModel.setViewAttributeByProperty("flxResourceDetailsMainKA", "left", "100%");
		formModel.setViewAttributeByProperty("flxImagesContainerKA", "left", "100%");
		formModel.setViewAttributeByProperty("flxAttachmentsContainerKA", "left", "100%");
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
	selectResourceDetailsTab: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flxResourceDetailsKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flxStatusColorKA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmResourceExecutionTabKA.flxResourceDetailsMainKA);
		}
	},
	selectExtendedAttributesTab: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flxExtendedAttributesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flxStatusColor2KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmResourceExecutionTabKA.flxExtendedAttributesContainerKA);
		}
	},
	selectImagesTab: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flxImagesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flxStatusColor3KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmResourceExecutionTabKA.flxImagesContainerKA);
		}
	},
	selectAttachmentsTabKA: function() {
		if (animationInProgress == false) {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flxAttachmentsKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flxStatusColor4KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmResourceExecutionTabKA.flxAttachmentsContainerKA);
		}
	},
	onEditCall: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexResourceInputKA", "isVisible", true);
	},
	onRemoveCall: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxItemDeleteKA", "isVisible", true);
	},
	onCancelCall: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxItemDeleteKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourceInputKA", "isVisible", false);
	}
});