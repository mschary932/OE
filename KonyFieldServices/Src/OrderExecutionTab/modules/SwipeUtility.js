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

kony.servicesapp.taskExecutionResourcesListPanGestureHandler = function(commonWidget, gestureInfo, context) {
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controllerExtension = appContext.getFormController("frmTaskExecutionTabKA").getControllerExtensionObject();
	var currentController = appContext.getFormController(kony.application.getCurrentForm().id);
    var currentControllerExtension = currentController.getControllerExtensionObject();
	var formModel = currentController.getFormModel();
    try {
		if(!kony.servicesapp.isAnimationInProgress){ 
			var selRecord = formModel.getViewAttributeByProperty("segResourcesKA", "selectedItems")[0];
			var status = selRecord.Status_id;
			if (kony.servicesapp.swipedIndices["rowIndex"] != context["rowIndex"] && kony.servicesapp.swipedIndices["secIndex"] != context["sectionIndex"]) {
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
							widgets: ["flexContainerKA"],
							animation: animationObj
						});
					} else {
						animationObj = kony.servicesapp.getTransAnimDefinition("-33.33%");
						animationObj["callbacks"]={"animationStart":function(){kony.servicesapp.isAnimationInProgress=true;kony.servicesapp.currIndices["secIndex"]=context["sectionIndex"];kony.servicesapp.currIndices["rowIndex"] = context["rowIndex"];},"animationEnd":function(){kony.servicesapp.coords=[]; kony.servicesapp.swipedIndices["rowIndex"] = context["rowIndex"];kony.servicesapp.rowreset=true;
						kony.servicesapp.swipedIndices["secIndex"] = context["sectionIndex"];kony.servicesapp.isAnimationInProgress=false;}
						};
						segInfo.animateRows({
							rows: [{
								sectionIndex: context["sectionIndex"],
								rowIndex: context["rowIndex"]
							}],
							widgets: ["flexContainerKA"],
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
						widgets: ["flexContainerKA"],
						animation: animationObj
					});
				}
			} 
		}
	} catch (err) {
        kony.print("error in orderListPanGestureHandlerKA" + JSON.stringify(err));
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
	        widgets: ["flexContainerKA"],
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
	            widgets: ["flexContainerKA"],
	            animation: kony.servicesapp.getEndStateTransAnimDefinition(kony.servicesapp.coords[kony.servicesapp.coords.length - 1]+"px", "0%")
	        });
			kony.servicesapp.swipedIndices={};
	    }
	} catch (err) {
        kony.print("error in seg_frmPan_onScrollStart_callback" + JSON.stringify(err));
    }
};
kony.servicesapp.getEndStateTransAnimDefinition = function(step0left, step100left,rowresetstate) {
	alert("In swipee Utility");
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
		alert("In swipee Utility222");

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