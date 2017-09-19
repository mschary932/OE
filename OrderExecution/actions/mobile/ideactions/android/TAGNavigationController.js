var TAG = TAG || {}
TAG.NC = new function() {
    /*********************Private Methods********************************************************/
    try {
        var formStack = [];
        var eventObject = null;
        var flowTransitions = [];
        var curPopup = null;
        var flowPopups = [];
        var popupStack = [];

        function handleException(contextName, exception) {
            kony.print("Exception in " + contextName + ":" + JSON.stringify(exception));
        }
        //updates the form stack
        function updateFormStack(targetFormId) {
            // add/remove the form from stack of flow forms for android only
            kony.print("############### formStack ##### ::  " + formStack);
            //var prevFrmId = kony.application.getPreviousForm().id;
            var curFrmId = kony.application.getCurrentForm().id;
            if (formStack.length <= 0) {
                kony.print("###### Pushing the current form " + curFrmId);
                formStack.push(curFrmId);
                formStack.push(targetFormId);
                return;
            }
            var curFormInd = formStack.indexOf(targetFormId);
            // handle the navigational stack only if this is not an exception form like T&C
            kony.print("######curFormInd ::::::::::::::::" + curFormInd);
            if (curFormInd >= 0) {
                // truncate the array to this length
                kony.print("#################### Inside applyFormTransitions -> popping the elements out of the array until previous form curFormInd ----> " + curFormInd);
                formStack.length = curFormInd + 1;
                kony.print("############### formStack AFTER POP::  " + formStack);
            } else {
                kony.print("################### Inside applyFormTransitions -> adding new form id to the array of forms");
                formStack.push(targetFormId);
                kony.print("############### formStack AFTER PUSH ::  " + formStack);
            }
        }
        // Returns the id of the event object after stripping off trailing numbers
        function getEventObjectId() {
            try {
                var eventId = "";
                if (eventObject !== undefined && eventObject !== null) {
                    eventId = eventObject.id;
                    if (eventId !== undefined && eventId !== "") {
                        eventId = eventId.replace(/\d*$/g, "");
                    }
                    kony.print("##### eventObject Id :- " + eventId);
                } else {
                    kony.print("##### No event is registered");
                }
                return eventId;
            } catch (exception) {
                kony.print("edodo" + exception.message);
                handleException("getEventObjectId", exception);
            }
        }

        function resetEventObject() {
            eventObject = null;
        }

        function getTransitions(transitionsDefinition) {
            try {
                var curTransitions = {};
                if (transitionsDefinition["out"] != null) {
                    curTransitions.out = transitionsDefinition["out"];
                }
                if (transitionsDefinition["in"] != null) {
                    curTransitions. in = transitionsDefinition["in"];
                }
                return curTransitions;
            } catch (exception) {
                kony.print("exctsssieaaa3" + exception.message);
                handleException("getTransitions", exception);
            }
        }
        //sets the transition effect for current and target forms
        function setFlowTransition(toFrmObj) {
            try {
                if (flowTransitions["#DEFINED"] == null) {
                    // no need to apply any transitions
                    kony.print("##### NO Transtions to Apply ######");
                    return;
                }
                var curTransitions = {};
                var frmFromTransition = {};
                var frmToTransition = {};
                var defaultTransition = true;
                var curForm = kony.application.getCurrentForm();
                var curFormId = curForm.id;
                var targetFormId = toFrmObj.id;
                kony.print("##### Current form Id is #################" + curFormId);
                kony.print("##### Target Form Id is ################" + targetFormId)
                var eventId = getEventObjectId();
                if (flowTransitions[eventId] != null) {
                    kony.print("##### Applying WIDGET Level Definition for Transition Animation #####");
                    defaultTransition = false;
                    if (flowTransitions[eventId][targetFormId] != null) {
                        kony.print("##### Applying Destination Specific, WIDGET Level Definition for Transition Animation ##########");
                        curTransitions = getTransitions(flowTransitions[eventId][targetFormId]);
                    } else {
                        curTransitions = getTransitions(flowTransitions[eventId]);
                    }
                } else if (flowTransitions[curFormId] != null && flowTransitions[curFormId][eventId] != null) {
                    if (flowTransitions[curFormId][eventId][targetFormId] != null) {
                        defaultTransition = false;
                        kony.print("##### Applying Destination Specific, FORM Level Definition for Transition Animation ##########");
                        curTransitions = getTransitions(flowTransitions[curFormId][eventId][targetFormId]);
                    } else {
                        kony.print("##### Applying FORM-WIDGET Level Definition for Transition Animation #####");
                        defaultTransition = false;
                        curTransitions = getTransitions(flowTransitions[curFormId][eventId]);
                    }
                } else if (flowTransitions[targetFormId] != null && flowTransitions[targetFormId]["#DEFAULT"] != null && flowTransitions[targetFormId]["#DEFAULT"]["in"] != null) {
                    defaultTransition = false;
                    kony.print("##### Applying FORM Level #DEFAULT Definition based on Target Form #####");
                    curTransitions = getTransitions(flowTransitions[targetFormId]["#DEFAULT"]);
                }
                if (defaultTransition) {
                    // check if this form is already navigated to in the flow
                    // this is automatically done in iOS
                    if (formStack.indexOf(targetFormId) >= 0) {
                        // this is a form alread navigated to in the flow
                        // apply default "back" transition
                        kony.print("############### Inside setFlowTransition -> Applying back transition as navigating to a previous form");
                        curTransitions = getTransitions(flowTransitions["DEFAULT_BACKWARD_TRANSITION"]);
                    } else {
                        // forward transition
                        kony.print("############### Inside setFlowTransition -> Applying forward transition as navigating to a new form");
                        curTransitions = getTransitions(flowTransitions["DEFAULT_FORWARD_TRANSITION"]);
                    }
                }
                //kony.print("########## frmFromTransition :- " + JSON.stringify(curTransitions.out));
                //kony.print("########## frmToTransition :- " + JSON.stringify(curTransitions.in));
                toFrmObj.inTransitionConfig = curTransitions["in"];
                curForm.outTransitionConfig = curTransitions.out;
            } catch (exception) {
                kony.print("exctsssie3" + exception.message);
                handleException("setFlowTransition", exception);
            }
        }
        //Returns true if Android API version is greater than or equal to 11
        function isHighEndAndroid() {
            try {
                return (gblAPKLevel >= 11);
            } catch (exception) {
                handleException("isHighEndAndroid", exception);
            }
        }
    } catch (err) {
        kony.print("NavigationController InitializationError: " + err.message);
    }
    /*********************Public Methods********************************************************/
    var controller = {};
    controller.initTransitions = function() {
        flowTransitions = initAndroidTransitions(flowTransitions);
        kony.print("######Flow Transitions:" + JSON.stringify(flowTransitions))
    }
    controller.applyFormTransitions = function(frmObj) {
        try {
            var curFrmId = kony.application.getCurrentForm().id;
            var targetFormId = frmObj.id;
            kony.print("################# Inside applyFormTransitions -> START: " + targetFormId);
            // if we are navigating to current form, then don't do anything
            kony.print("################# Inside navigate from: " + curFrmId + " -> " + targetFormId);
            if (curFrmId == targetFormId) {
                kony.print("################# Inside applyFormTransitions -> Form is SAME");
                return;
            }
            //navigating to a different form than current form
            setFlowTransition(frmObj);
            updateFormStack(targetFormId);
            resetEventObject();
            kony.print("#################### Inside applyFormTransitions -> END");
        } catch (exception) {
            kony.print("navigationexception" + exception.message);
            handleException("applyFormTransitions", exception);
        }
    }
    controller.registerEvent = function(eventObj) {
        try {
            if (eventObj == null || eventObj == undefined) {
                kony.print("########## Ignoring the event as eventObj is undefined or null.");
                return;
            }
            // set tbe global variable for future use during transitions
            kony.print("########## Registering the event for widget : " + eventObj.id);
            eventObject = eventObj
            kony.print("########## Event Object inside registerEvent : " + eventObject.id);
        } catch (exception) {
            kony.print("exctie3" + exception.message);
            handleException("registerEvent", exception);
        }
    }
    controller.cbDeviceBackClick = function() {
        try {
            var prevForm = getGlobalValue(formStack[formStack.length - 2]);
            if (prevForm == null || prevForm == undefined) {
                kony.print("########## Could not retrieve previous form from formstack");
                controller.applyFormTransitions(kony.application.getPreviousForm());
            } else {
                kony.print("########## Retrieved previous form from formstack");
                controller.applyFormTransitions(prevForm);
            }
        } catch (exception) {
            kony.print("excti" + exception.message);
            handleException("cbDeviceBackClick", exception);
        }
    }
    controller.initializePopup = function(popupRef) {
        try {
            popupRef.inTransitionConfig = flowTransitions["POPUP_DEFAULT_TRANSITION"]["in"];
            popupRef.outTransitionConfig = flowTransitions["POPUP_DEFAULT_TRANSITION"]["out"];
            popupRef.containerHeight = 100;
            popupRef.containerHeightReference = constants.HEIGHT_BY_DEVICE_REFERENCE;
        } catch (exception) {
            kony.print("excti3" + exception.message);
            handleException("initializePopup", exception);
        }
    }
    controller.navigateToPopup = function(popupObj) {
        try {
            if (flowPopups.indexOf(popupObj.id) == -1) {
                kony.print("############### Inside navigateToPopup -> this is not in flowPopups");
                popupObj.show();
                if (curPopup != null) {
                    kony.print("############### Inside navigateToPopup -> dismissing the popup:" + curPopup.id);
                    curPopup.dismiss();
                    curPopup = null;
                }
                return;
            }
            if (curPopup == null) {
                // first popup being displayed in the flow
                popupStack.push(popupObj.id);
                if (flowTransitions["#DEFINED"] != null && flowTransitions["POPUP_FLOW_START"] != null && flowTransitions["POPUP_FLOW_START"]["in"] != null) {
                    popupObj.inTransitionConfig = flowTransitions["POPUP_FLOW_START"]["in"];
                }
                popupObj.show();
                curPopup = popupObj;
                return;
            } else {
                var popupIndex = popupStack.indexOf(popupObj.id);
                if (popupIndex !== -1) {
                    // going back to a visited popup
                    popupStack.length = popupIndex + 1;
                    if (flowTransitions["#DEFINED"] != null && flowTransitions["POPUP_FLOW_BACKWARD"] != null) {
                        if (flowTransitions["POPUP_FLOW_BACKWARD"]["in"] != null) {
                            popupObj.inTransitionConfig = flowTransitions["POPUP_FLOW_BACKWARD"]["in"];
                            kony.print("############### popupObj.inTransitionConfig:" + popupObj.inTransitionConfig);
                        }
                        if (flowTransitions["POPUP_FLOW_BACKWARD"]["out"] != null) {
                            curPopup.outTransitionConfig = flowTransitions["POPUP_FLOW_BACKWARD"]["out"];
                            kony.print("############### curPopup.outTransitionConfig:" + curPopup.outTransitionConfig);
                        }
                    }
                } else {
                    // navigating to a new popup
                    popupStack.push(popupObj.id);
                    if (flowTransitions["#DEFINED"] != null && flowTransitions["POPUP_FLOW_FORWARD"] != null) {
                        if (flowTransitions["POPUP_FLOW_FORWARD"]["in"] != null) {
                            popupObj.inTransitionConfig = flowTransitions["POPUP_FLOW_FORWARD"]["in"];
                            kony.print("############### popupObj.inTransitionConfig:" + popupObj.inTransitionConfig);
                        }
                        if (flowTransitions["POPUP_FLOW_FORWARD"]["out"] != null) {
                            curPopup.outTransitionConfig = flowTransitions["POPUP_FLOW_FORWARD"]["out"];
                            kony.print("############### curPopup.outTransitionConfig:" + curPopup.outTransitionConfig);
                        }
                    }
                }
                popupObj.show();
                curPopup = popupObj;
                return;
            }
        } catch (exception) {
            kony.print("1111" + excpetion.message);
            handleException("navigateToPopup", exception);
        }
    }
    return controller;
}
var getGlobalValue = function(varName) {
        return this[varName];
    }