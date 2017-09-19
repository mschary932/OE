kony.servicesapp.initialise_segment_pan_defaultValues = function(segmentId, gestureHandlerKA) {
    try {
        if (kony.os.deviceInfo().name.toLowerCase() == "android") {
            kony.servicesapp.setPanGestures(segmentId, gestureHandlerKA);
        } else {
            segmentId.editStyle = constants.SEGUI_EDITING_STYLE_SWIPE;
        }
    } catch (err) {
        kony.sdk.mvvm.log.error("error in initialise_segment_pan_defaultValues : " + err);
    }
};
kony.servicesapp.editCallback = function(seguiWidget, section, row) {
	try {
	    var formModel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id).getFormModel();
	    kony.servicesapp.currIndices["secIndex"] = section;
	    kony.servicesapp.currIndices["rowIndex"] = row;
	    var utilitiesObj = utilities.getUtilityObj();
	    utilitiesObj.editQuantity(formModel.getViewAttributeByProperty("segSwipeKA", "data")[section][1][row]);
	    formModel.setViewAttributeByProperty("flxEditKA", "isVisible", true);
    } catch (err) {
        kony.sdk.mvvm.log.error("error in editCallback : " + err);
    }
};
kony.servicesapp.deleteCallback = function(seguiWidget, section, row) {
	try {
	    kony.servicesapp.currIndices["secIndex"] = section;
	    kony.servicesapp.currIndices["rowIndex"] = row;
	    var utilitiesObj = utilities.getUtilityObj();
	    utilitiesObj.deleteQuantity(kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id).getFormModel().getViewAttributeByProperty("segSwipeKA", "data")[section][1][row]);
	} catch (err) {
        kony.sdk.mvvm.log.error("error in deleteCallback : " + err);
    }
};
kony.servicesapp.addReadingCallback = function(seguiWidget, section, row) {
	try {
      kony.servicesapp.currIndices["secIndex"] = section;
	  kony.servicesapp.currIndices["rowIndex"] = row;	       
       var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();   
	  var currentController = appContext.getFormController(kony.application.getCurrentForm().id);
      var currentControllerExtension = currentController.getControllerExtensionObject();
	  var formModel = currentController.getFormModel();
      currentControllerExtension.addMeasurementReading(formModel.getViewAttributeByProperty("segMeasurementKA", "data")[section][1][row]);
    }catch (err) {      
        kony.sdk.mvvm.log.error("error in addReadingCallback : " + err);
    }
};
kony.servicesapp.removeReadingCallback = function(seguiWidget, section, row) {
	try {
      kony.servicesapp.currIndices["secIndex"] = section;
	  kony.servicesapp.currIndices["rowIndex"] = row;
      var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();   
	  var currentController = appContext.getFormController(kony.application.getCurrentForm().id);
      var currentControllerExtension = currentController.getControllerExtensionObject();
	  var formModel = currentController.getFormModel();
      currentControllerExtension.removeReadings(formModel.getViewAttributeByProperty("segMeasurementKA", "data")[section][1][row]);      
    }catch (err) {      
        kony.sdk.mvvm.log.error("error in removeReadingCallback : " + err);
    }
};
kony.servicesapp.setPanGestures = function(segId, gestureHandlerKA) {
    segTemp = segId.rowTemplate;
    try {
        segTemp.addGestureRecognizer(constants.GESTURE_TYPE_PAN, {
            fingers: 1,
            continuousEvents: true
        }, gestureHandlerKA);
    } catch (err) {
        alert("error while regestering the gestures" + err);
    }
};
kony.servicesapp.pendingOrderAcceptCallbackKA= function(seguiWidget, section, row){
	try {
		kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id).performAction("acceptPendingOrderKA", [seguiWidget, section, row]);
	} catch (err) {
        alert("error in pendingOrderAcceptCallbackKA" + err);
    }
};
kony.servicesapp.orderListPanGestureHandlerKA = function(commonWidget, gestureInfo, context) {
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controllerExtension = appContext.getFormController(kony.servicesapp.FRMPENDINGORDERLISTKA).getControllerExtensionObject();
	var currentController = appContext.getFormController(kony.application.getCurrentForm().id);
    var currentControllerExtension = currentController.getControllerExtensionObject();
	var formModel = currentController.getFormModel();
    try {
		if(!kony.servicesapp.isAnimationInProgress){ 
			var selRecord = formModel.getViewAttributeByProperty("segPendingOrderListKA", "selectedItems")[0];
			var status = selRecord.Status_id;
			if (status && status.toUpperCase() == "PENDING" && (kony.servicesapp.swipedIndices["rowIndex"] != context["rowIndex"] && kony.servicesapp.swipedIndices["secIndex"] != context["sectionIndex"])) {
				var segInfo = context["widgetInfo"];
				var diff = 0;
				var leftVal1 = 0;
				leftVal1 = (parseInt(gestureInfo.translationX));
				kony.servicesapp.coords.push(leftVal1);
				var animationObj;
				if (gestureInfo.gestureState == 3) {
					//kony.print("kony.servicesapp.coords" + JSON.stringify(kony.servicesapp.coords));
					var coords_length=kony.servicesapp.coords.length;
					diff = ((coords_length == 1) ? kony.servicesapp.coords[0] : kony.servicesapp.coords[coords_length - 1] - kony.servicesapp.coords[0]);
					if (diff > -100) {
						animationObj = kony.servicesapp.getEndStateTransAnimDefinition(kony.servicesapp.coords[coords_length - 1]+"px", "0%",true);
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxPendingOrdListKA"],
							animation: animationObj
						});
					} else {
						animationObj = kony.servicesapp.getTransAnimDefinition("-25%");
						animationObj["callbacks"]={"animationStart":function(){kony.servicesapp.isAnimationInProgress=true;kony.servicesapp.currIndices["secIndex"]=context["sectionIndex"];kony.servicesapp.currIndices["rowIndex"] = context["rowIndex"];},"animationEnd":function(){kony.servicesapp.coords=[]; kony.servicesapp.swipedIndices["rowIndex"] = context["rowIndex"];kony.servicesapp.rowreset=true;
						kony.servicesapp.swipedIndices["secIndex"] = context["sectionIndex"];kony.servicesapp.isAnimationInProgress=false;}
						};
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxPendingOrdListKA"],
							animation: animationObj
						});
					}
				}else if (gestureInfo.gestureState == 2) {
					animationObj = kony.servicesapp.getTransAnimDefinition(leftVal1 + "px");
					segInfo.animateRows({
						rows: [{
							sectionIndex: context["sectionIndex"],
							rowIndex: context["rowIndex"]
						}],
						widgets: ["flxPendingOrdListKA"],
						animation: animationObj
					});
				}
			} 
		}
	} catch (err) {
        kony.print("error in orderListPanGestureHandlerKA" + JSON.stringify(err));
    }
};
kony.servicesapp.resourcesPanGestureHandler = function(commonWidget, gestureInfo, context) {
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = appContext.getFormController(kony.servicesapp.FRMTASKEXECUTIONKA);
    var controllerExtension = controller.getControllerExtensionObject();
	var currentController = appContext.getFormController(kony.application.getCurrentForm().id);
    var currentControllerExtension = currentController.getControllerExtensionObject();
	var formModel = currentController.getFormModel();
    try {
		if(!kony.servicesapp.isAnimationInProgress){ 
			var selRecord = formModel.getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
			var status = controllerExtension.getFormModelInfo("tStatusID");
			if (status && status.toUpperCase() == "STARTED" && selRecord && selRecord.isConsumable.toUpperCase() != 'N' && selRecord.RequestedQuantityNumber && selRecord.RequestedQuantityNumber != 0 && selRecord.isConsumed.toUpperCase() != 'Y' && kony.application.getCurrentForm().id != kony.servicesapp.FRMORDERRESOURCESLISTKA && (kony.servicesapp.swipedIndices["rowIndex"] != context["rowIndex"] && kony.servicesapp.swipedIndices["secIndex"] != context["sectionIndex"])) {
				var segInfo = context["widgetInfo"];
				var diff = 0;
				var leftVal1 = 0;
				leftVal1 = (parseInt(gestureInfo.translationX));
				kony.print("leftVal1" + leftVal1);
				kony.servicesapp.coords.push(leftVal1);
				var animationObj;
				if (gestureInfo.gestureState == 3) {
					//kony.print("kony.servicesapp.coords" + JSON.stringify(kony.servicesapp.coords));
					var coords_length=kony.servicesapp.coords.length;
					diff = ((coords_length == 1) ? kony.servicesapp.coords[0] : kony.servicesapp.coords[coords_length - 1] - kony.servicesapp.coords[0]);
					if (diff > -100) {
						animationObj = kony.servicesapp.getEndStateTransAnimDefinition(kony.servicesapp.coords[coords_length - 1]+"px", "0%",true);
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxChildKA"],
							animation: animationObj
						});
					} else {
						animationObj = kony.servicesapp.getTransAnimDefinition("-60%");
						animationObj["callbacks"]={"animationStart":function(){kony.servicesapp.isAnimationInProgress=true;kony.servicesapp.currIndices["secIndex"]=context["sectionIndex"];kony.servicesapp.currIndices["rowIndex"] = context["rowIndex"];},"animationEnd":function(){kony.servicesapp.coords=[]; kony.servicesapp.swipedIndices["rowIndex"] = context["rowIndex"];kony.servicesapp.rowreset=true;
						kony.servicesapp.swipedIndices["secIndex"] = context["sectionIndex"];kony.servicesapp.isAnimationInProgress=false;}
						};
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxChildKA"],
							animation: animationObj
						});
					}
				} else if (gestureInfo.gestureState == 2) {
					animationObj = kony.servicesapp.getTransAnimDefinition(leftVal1 + "px");
					segInfo.animateRows({
						rows: [{
							sectionIndex: context["sectionIndex"],
							rowIndex: context["rowIndex"]
						}],
						widgets: ["flxChildKA"],
						animation: animationObj
					});
				}
			} 
		}
	} catch (err) {
        kony.print("error in resourcesPanGestureHandler" + JSON.stringify(err));
    }
};
kony.servicesapp.orderResourcesPanGestureHandler = function(commonWidget, gestureInfo, context) {
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = appContext.getFormController(kony.servicesapp.FRMORDEREXECUTIONKA);
    var controllerExtension = controller.getControllerExtensionObject();
	var currentController = appContext.getFormController(kony.application.getCurrentForm().id);
    var currentControllerExtension = currentController.getControllerExtensionObject();
	var formModel = currentController.getFormModel();
    try {
		if(!kony.servicesapp.isAnimationInProgress){ 
            var selRecord = formModel.getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
			var status = controllerExtension.getFormModelInfo("WorkOrderStatus");                  
			if (status && status.toUpperCase() == "STARTED" && kony.servicesapp.CONNECTOR=='CRM' && selRecord && selRecord.isConsumable.toUpperCase() != 'N' && selRecord.RequestedQuantityNumber && selRecord.RequestedQuantityNumber != 0 && selRecord.isConsumed.toUpperCase() != 'Y' && kony.application.getCurrentForm().id != kony.servicesapp.FRMTASKRESOURCESLISTKA && kony.servicesapp.swipedIndices["rowIndex"] != context["rowIndex"] && kony.servicesapp.swipedIndices["secIndex"] != context["sectionIndex"]) {
               var segInfo = context["widgetInfo"];
				var diff = 0;
				var leftVal1 = 0;
				leftVal1 = (parseInt(gestureInfo.translationX));
				kony.print("leftVal1" + leftVal1);
				kony.servicesapp.coords.push(leftVal1);
				var animationObj;
				if (gestureInfo.gestureState == 3) {
					var coords_length=kony.servicesapp.coords.length;
					diff = ((coords_length == 1) ? kony.servicesapp.coords[0] : kony.servicesapp.coords[coords_length - 1] - kony.servicesapp.coords[0]);
					if (diff > -100) {
						animationObj = kony.servicesapp.getEndStateTransAnimDefinition(kony.servicesapp.coords[coords_length - 1]+"px", "0%",true);
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxChildKA"],
							animation: animationObj
						});
					} else {
						animationObj = kony.servicesapp.getTransAnimDefinition("-60%");
						animationObj["callbacks"]={"animationStart":function(){kony.servicesapp.isAnimationInProgress=true;kony.servicesapp.currIndices["secIndex"]=context["sectionIndex"];kony.servicesapp.currIndices["rowIndex"] = context["rowIndex"];},"animationEnd":function(){kony.servicesapp.coords=[]; kony.servicesapp.swipedIndices["rowIndex"] = context["rowIndex"];kony.servicesapp.rowreset=true;
						kony.servicesapp.swipedIndices["secIndex"] = context["sectionIndex"];kony.servicesapp.isAnimationInProgress=false;}
						};
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxChildKA"],
							animation: animationObj
						});
					}
				} else if (gestureInfo.gestureState == 2) {
					animationObj = kony.servicesapp.getTransAnimDefinition(leftVal1 + "px");
					segInfo.animateRows({
						rows: [{
							sectionIndex: context["sectionIndex"],
							rowIndex: context["rowIndex"]
						}],
						widgets: ["flxChildKA"],
						animation: animationObj
					});
				}
			} 
		}
	} catch (err) {
        kony.print("error in resourcesPanGestureHandler" + JSON.stringify(err));
    }
};

kony.servicesapp.stockLocationsPanGestureHandlerKA = function(commonWidget, gestureInfo, context) {
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = appContext.getFormController("frmStockLocationListKA");
    var controllerExtension = controller.getControllerExtensionObject();
	var currentController = appContext.getFormController(kony.application.getCurrentForm().id);
    var currentControllerExtension = currentController.getControllerExtensionObject();
	var formModel = currentController.getFormModel();
    try {
		if(!kony.servicesapp.isAnimationInProgress){ 
			var segInfo = context["widgetInfo"];
			var diff = 0;
			var leftVal1 = 0;
			leftVal1 = (parseInt(gestureInfo.translationX));
			kony.print("leftVal1" + leftVal1);
			kony.servicesapp.coords.push(leftVal1);
			var animationObj;
			if (gestureInfo.gestureState == 3) {
				//kony.print("kony.servicesapp.coords" + JSON.stringify(kony.servicesapp.coords));
				var coords_length=kony.servicesapp.coords.length;
				diff = ((coords_length == 1) ? kony.servicesapp.coords[0] : kony.servicesapp.coords[coords_length - 1] - kony.servicesapp.coords[0]);
				if (diff > -100) {
					animationObj = kony.servicesapp.getEndStateTransAnimDefinition(kony.servicesapp.coords[coords_length - 1]+"px", "0%",true);
					segInfo.animateRows({
						rows: [{
							sectionIndex: context["sectionIndex"],
							rowIndex: context["rowIndex"]
						}],
						widgets: ["flxChildKA"],
						animation: animationObj
					});
				} else {
					animationObj = kony.servicesapp.getTransAnimDefinition("-60%");
					animationObj["callbacks"]={"animationStart":function(){kony.servicesapp.isAnimationInProgress=true;kony.servicesapp.currIndices["secIndex"]=context["sectionIndex"];kony.servicesapp.currIndices["rowIndex"] = context["rowIndex"];},"animationEnd":function(){kony.servicesapp.coords=[]; kony.servicesapp.swipedIndices["rowIndex"] = context["rowIndex"];kony.servicesapp.rowreset=true;
					kony.servicesapp.swipedIndices["secIndex"] = context["sectionIndex"];kony.servicesapp.isAnimationInProgress=false;}
					};
					segInfo.animateRows({
						rows: [{
							sectionIndex: context["sectionIndex"],
							rowIndex: context["rowIndex"]
						}],
						widgets: ["flxChildKA"],
						animation: animationObj
					});
				}
			} else if (gestureInfo.gestureState == 2) {
				animationObj = kony.servicesapp.getTransAnimDefinition(leftVal1 + "px");
				segInfo.animateRows({
					rows: [{
						sectionIndex: context["sectionIndex"],
						rowIndex: context["rowIndex"]
					}],
					widgets: ["flxChildKA"],
					animation: animationObj
				});
			}
		}
	} catch (err) {
        kony.print("error in resourcesPanGestureHandler" + JSON.stringify(err));
    }
};

kony.servicesapp.timeAndExpensePanGestureHandlerKA = function(commonWidget, gestureInfo, context) {
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controllerExtension = appContext.getFormController("frmTimeAndExpenseKA").getControllerExtensionObject();
	var currentController = appContext.getFormController(kony.application.getCurrentForm().id);
    var currentControllerExtension = currentController.getControllerExtensionObject();
	var formModel = currentController.getFormModel();
	
    try {
		if(!kony.servicesapp.isAnimationInProgress){ 
			var selRecord = formModel.getViewAttributeByProperty("SegTimeExpenseKA", "selectedItems")[0];
			var status = kony.servicesapp.STATUSFORTE;
			if (status && status.toUpperCase() == "STARTED" && kony.servicesapp.swipedIndices["rowIndex"] != context["rowIndex"] && kony.servicesapp.swipedIndices["secIndex"] != context["sectionIndex"]) {
				var segInfo = context["widgetInfo"];
				var diff = 0;
				var leftVal1 = 0;
				leftVal1 = (parseInt(gestureInfo.translationX));
				kony.servicesapp.coords.push(leftVal1);
				var animationObj;
				if (gestureInfo.gestureState == 3) {
					//kony.print("kony.servicesapp.coords" + JSON.stringify(kony.servicesapp.coords));
					var coords_length=kony.servicesapp.coords.length;
					diff = ((coords_length == 1) ? kony.servicesapp.coords[0] : kony.servicesapp.coords[coords_length - 1] - kony.servicesapp.coords[0]);
					if (diff > -100) {
						animationObj = kony.servicesapp.getEndStateTransAnimDefinition(kony.servicesapp.coords[coords_length - 1]+"px", "0%",true);
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxChildKA"],
							animation: animationObj
						});
					} else {
						animationObj = kony.servicesapp.getTransAnimDefinition("-60%");
						animationObj["callbacks"]={"animationStart":function(){kony.servicesapp.isAnimationInProgress=true;kony.servicesapp.currIndices["secIndex"]=context["sectionIndex"];kony.servicesapp.currIndices["rowIndex"] = context["rowIndex"];},"animationEnd":function(){kony.servicesapp.coords=[]; kony.servicesapp.swipedIndices["rowIndex"] = context["rowIndex"];kony.servicesapp.rowreset=true;
						kony.servicesapp.swipedIndices["secIndex"] = context["sectionIndex"];kony.servicesapp.isAnimationInProgress=false;}
						};
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxChildKA"],
							animation: animationObj
						});
					}
				}else if (gestureInfo.gestureState == 2) {
					animationObj = kony.servicesapp.getTransAnimDefinition(leftVal1 + "px");
					segInfo.animateRows({
						rows: [{
							sectionIndex: context["sectionIndex"],
							rowIndex: context["rowIndex"]
						}],
						widgets: ["flxChildKA"],
						animation: animationObj
					});
				}
			} 
		}
	} catch (err) {
        kony.print("error in orderListPanGestureHandlerKA" + JSON.stringify(err));
    }
};

kony.servicesapp.measurementExecutionPanGestureHandlerKA = function(commonWidget, gestureInfo, context) {
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = appContext.getFormController("frmMeasurementExecutionKA");
    var controllerExtension = controller.getControllerExtensionObject();
	var currentController = appContext.getFormController(kony.application.getCurrentForm().id);
    var currentControllerExtension = currentController.getControllerExtensionObject();
	var formModel = currentController.getFormModel();
    try {
		if(!kony.servicesapp.isAnimationInProgress){ 
			var selRecord = formModel.getViewAttributeByProperty("segMeasurementKA", "selectedItems")[0];
			var status = controllerExtension.getFormModelInfo("tStatusID");
			if (status && status.toUpperCase() == "STARTED" && (kony.servicesapp.swipedIndices["rowIndex"] != context["rowIndex"] && kony.servicesapp.swipedIndices["secIndex"] != context["sectionIndex"])) {
				var segInfo = context["widgetInfo"];
				var diff = 0;
				var leftVal1 = 0;
				leftVal1 = (parseInt(gestureInfo.translationX));
				kony.print("leftVal1" + leftVal1);
				kony.servicesapp.coords.push(leftVal1);
				var animationObj;
				if (gestureInfo.gestureState == 3) {
					//kony.print("kony.servicesapp.coords" + JSON.stringify(kony.servicesapp.coords));
					var coords_length=kony.servicesapp.coords.length;
					diff = ((coords_length == 1) ? kony.servicesapp.coords[0] : kony.servicesapp.coords[coords_length - 1] - kony.servicesapp.coords[0]);
					if (diff > -100) {
						animationObj = kony.servicesapp.getEndStateTransAnimDefinition(kony.servicesapp.coords[coords_length - 1]+"px", "0%",true);
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxChildKA"],
							animation: animationObj
						});
					} else {
						animationObj = kony.servicesapp.getTransAnimDefinition("-60%");
						animationObj["callbacks"]={"animationStart":function(){kony.servicesapp.isAnimationInProgress=true;kony.servicesapp.currIndices["secIndex"]=context["sectionIndex"];kony.servicesapp.currIndices["rowIndex"] = context["rowIndex"];},"animationEnd":function(){kony.servicesapp.coords=[]; kony.servicesapp.swipedIndices["rowIndex"] = context["rowIndex"];kony.servicesapp.rowreset=true;
						kony.servicesapp.swipedIndices["secIndex"] = context["sectionIndex"];kony.servicesapp.isAnimationInProgress=false;}
						};
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flxChildKA"],
							animation: animationObj
						});
					}
				} else if (gestureInfo.gestureState == 2) {
					animationObj = kony.servicesapp.getTransAnimDefinition(leftVal1 + "px");
					segInfo.animateRows({
						rows: [{
							sectionIndex: context["sectionIndex"],
							rowIndex: context["rowIndex"]
						}],
						widgets: ["flxChildKA"],
						animation: animationObj
					});
				}
			} 
		}
	} catch (err) {
        kony.print("error in resourcesPanGestureHandler" + JSON.stringify(err));
    }
};

kony.servicesapp.measurementReadingsPanGestureHandlerKA = function(commonWidget, gestureInfo, context) {
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	var frmMeasurementReadingsController = appContext.getFormController(kony.servicesapp.FRMMEASUREMENTREADINGS);
	var frmMeasurementReadingsControllerExtension = frmMeasurementReadingsController.getControllerExtensionObject();
	var formModel = frmMeasurementReadingsController.getFormModel();
	var frmMeasurementExecutionControllerExecution = appContext.getFormController(kony.servicesapp.FRMMEASUREMENTEXECUTIONKA).getControllerExtensionObject();
	try {
		if(!kony.servicesapp.isAnimationInProgress){ 
			var selRecord = formModel.getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
			var status = frmMeasurementExecutionControllerExecution.getFormModelInfo("tStatusID");
			if (status && status.toUpperCase() == "STARTED" && (kony.servicesapp.swipedIndices["rowIndex"] != context["rowIndex"] && kony.servicesapp.swipedIndices["secIndex"] != context["sectionIndex"])) {
				var segInfo = context["widgetInfo"];
				var diff = 0;
				var leftVal1 = 0;
				leftVal1 = (parseInt(gestureInfo.translationX));
				kony.print("leftVal1" + leftVal1);
				kony.servicesapp.coords.push(leftVal1);
				var animationObj;
				if (gestureInfo.gestureState == 3) {
	//kony.print("kony.servicesapp.coords" + JSON.stringify(kony.servicesapp.coords));
					var coords_length=kony.servicesapp.coords.length;
					diff = ((coords_length == 1) ? kony.servicesapp.coords[0] : kony.servicesapp.coords[coords_length - 1] - kony.servicesapp.coords[0]);
					if (diff > -100) {
						animationObj = kony.servicesapp.getEndStateTransAnimDefinition(kony.servicesapp.coords[coords_length - 1]+"px", "0%",true);
						segInfo.animateRows({
							rows: [{
							  sectionIndex: context["sectionIndex"],
							  rowIndex: context["rowIndex"]
							}],
							widgets: ["flexReadingKA"],
							animation: animationObj
							});
					} else {
						animationObj = kony.servicesapp.getTransAnimDefinition("-60%");
						animationObj["callbacks"]={"animationStart":function(){kony.servicesapp.isAnimationInProgress=true;kony.servicesapp.currIndices["secIndex"]=context["sectionIndex"];kony.servicesapp.currIndices["rowIndex"] = context["rowIndex"];},"animationEnd":function(){kony.servicesapp.coords=[]; kony.servicesapp.swipedIndices["rowIndex"] = context["rowIndex"];kony.servicesapp.rowreset=true;
						kony.servicesapp.swipedIndices["secIndex"] = context["sectionIndex"];kony.servicesapp.isAnimationInProgress=false;}
						};
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flexReadingKA"],
							animation: animationObj
						});
					}
				} else if (gestureInfo.gestureState == 2) {
					animationObj = kony.servicesapp.getTransAnimDefinition(leftVal1 + "px");
					segInfo.animateRows({
						rows: [{
							sectionIndex: context["sectionIndex"],
							rowIndex: context["rowIndex"]
						}],
						widgets: ["flexReadingKA"],
						animation: animationObj
					});
				}
			} 
		}
	} catch(err){
		kony.print("error in measurementReadingsPanGestureHandlerKA" + JSON.stringify(err));
	}
};



kony.servicesapp.resetRowToInitialState = function(seg) {
	try {
	    var animObj = kony.servicesapp.getTransAnimDefinition("0%");
	    frmTaskExecutionKA.segSwipeKA.animateRows({
	        rows: [{
	            sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
	            rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
	        }],
	        widgets: ["flxChildKA"],
	        animation: kony.servicesapp.getTransAnimDefinition("0%")
	    });
	    kony.servicesapp.swipedIndices = {};
	    kony.servicesapp.coords = [];
	} catch (err) {
        kony.print("error in resetRowToInitialState" + JSON.stringify(err));
    }
};
kony.servicesapp.seg_frmPan_onScrollStart_callback = function(context) {
	try {
	    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	    var taskExecutionFormControllerExtension = appContext.getFormController(kony.servicesapp.FRMTASKEXECUTIONKA).getControllerExtensionObject();
	    context = taskExecutionFormControllerExtension.getFormModelInfo("segmentInfo");
	    if (Object.keys(kony.servicesapp.swipedIndices).length > 0) {
	        frmTaskExecutionKA.segSwipeKA.animateRows({
	            rows: [{
	                sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
	                rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
	            }],
	            widgets: ["flxChildKA"],
	            animation: kony.servicesapp.getEndStateTransAnimDefinition(kony.servicesapp.coords[kony.servicesapp.coords.length - 1]+"px", "0%")
	        });
			kony.servicesapp.swipedIndices={};
	    }
	} catch (err) {
        kony.print("error in seg_frmPan_onScrollStart_callback" + JSON.stringify(err));
    }
};
kony.servicesapp.getEndStateTransAnimDefinition = function(step0left, step100left,rowresetstate) {
    var animConf1 = {
        "0": {
            "left": step0left,
            "stepConfig": {
                "timingFunction": kony.anim.LINEAR
            }
        },
        "100": {
            "left": step100left,
            "stepConfig": {
                "timingFunction": kony.anim.LINEAR
            }
        }

    };
    var transAnimDefObject = kony.ui.createAnimation(animConf1);
    return {
		definition: transAnimDefObject,
		config: {
			"duration": 0.4,
			"iterationCount": 1,
			"delay": 0,
			"fillMode": kony.anim.FILL_MODE_FORWARDS
		},
		callbacks:{
			"animationStart":function(){kony.servicesapp.isAnimationInProgress=true;},
			"animationEnd": function(){kony.servicesapp.rowreset=rowresetstate;kony.servicesapp.swipedIndices={};kony.servicesapp.coords=[];kony.servicesapp.isAnimationInProgress=false;}
		}
	};
};
kony.servicesapp.getTransAnimDefinition = function(leftVal) {
    var transAnimDef1 = {
        "100": {
            "left": leftVal
        }
    };
    var transAnimDefObject = kony.ui.createAnimation(transAnimDef1);
    return {
        definition: transAnimDefObject,
        config: {
            "duration": 1,
            "iterationCount": 1,
            "delay": 0,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
        }/*,
		callbacks:{
			"animationEnd": function(context){kony.servicesapp.rowreset=true;}
		}*/
    };
};
kony.servicesapp.getAnimationConfig = function() {
    var config = {
        "delay": 1,
        "iterationCount": 1,
        "duration": 0,
        "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    return config;
};
kony.servicesapp.timedeleteCallback = function(seguiWidget, section, row) {
	try {
      
      	kony.servicesapp.currIndices["secIndex"] = section;
	    kony.servicesapp.currIndices["rowIndex"] = row;
	    var utilitiesObj = utilities.getUtilityObj();
	    utilitiesObj.deleteRecord(kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id).getFormModel().getViewAttributeByProperty("SegTimeExpenseKA", "data")[section][1][row]);
	
     
	} catch (err) {
        kony.sdk.mvvm.log.error("error in deleteCallback : " + err);
    }
};
kony.servicesapp.timeeditCallback = function(seguiWidget, section, row) {
	try {
		kony.servicesapp.currIndices["secIndex"] = section;
	  	kony.servicesapp.currIndices["rowIndex"] = row;
		kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id).performAction("navigateToEditScreenKA", [seguiWidget, section, row]);
	} catch (err) {
        kony.sdk.mvvm.log.error("error in deleteCallback : " + err);
    }
};
kony.servicesapp.editMeasurementReadingCallback = function(seguiWidget, section, row) {
	try {
      	kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id).performAction("editReadingCallback", [seguiWidget, section, row]);
	} catch (err) {
        kony.sdk.mvvm.log.error("error in editMeasurementReadingCallback : " + err);
    }
};
kony.servicesapp.deleteMeasurementReadingCallback = function(seguiWidget, section, row) {
	try {
      	kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id).performAction("deleteReadingCallback", [seguiWidget, section, row]);
	} catch (err) {
        kony.sdk.mvvm.log.error("error in editMeasurementReadingCallback : " + err);
    }
};