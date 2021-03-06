var utilities = Class({
    $statics: {
        scopeObj: null,
        getUtilityObj: function() {
            if (utilities.scopeObj) {
                return utilities.scopeObj;
            } else {
                utilities.scopeObj = new utilities();
                return utilities.scopeObj;
            }
        }
    },
    /**
     * constructor method.
     */
    constructor: function() {
        this.buttonConfigForSubMenu = {
            "left_for_first_widget": "7.5%",
            "left_for_other_widgets": "7.5%",
            "height": "45%",
            "width": "7%",
            "centerY": "50%",
            "right_for_last_btn": "7%"
        };
        this.labelConfigForSubMenu = {
            "skin": "sknLineA0B2C3KA",
            "text": "",
            "left": "7.5%",
            "height": "53%",
            "width": "1px",
            "centerY": "50%"
        };
        this.priorityImage = {
            "Low": "priority_low.png",
            "High": "priority_high.png",
            "Medium": "priority_medium.png",
            "Critical": "priority_critical.png"
        };
        this.statusImage = {
            "Completed": "status_machine_completed_gray.png",
            "Pending": "status_machine_pending_gray.png",
            "Started": "status_machine_started_gray.png",
            "Scheduled": "status_machine_scheduled_gray.png",
            "Rejected": "status_machine_rejected_gray.png",
            "On Route": "status_machine_on_route_gray.png",
            "Paused": "status_machine_paused_gray.png",
            "Accepted": "status_machine_accepted_gray.png",
            "Cancelled": "status_machine_cancelled_gray.png"
        };
        this.headerStatusImage = {
            "Completed": "status_machine_completed.png",
            "Pending": "status_machine_pending.png",
            "Started": "status_machine_started.png",
            "Scheduled": "status_machine_scheduled.png",
            "Rejected": "status_machine_rejected.png",
            "On Route": "status_machine_on_route.png",
            "Paused": "status_machine_paused.png",
            "Accepted": "status_machine_accepted.png",
            "Cancelled": "status_machine_cancelled.png"
        };
        this.priorityMapPinImage = {
            "low": "pin_priority_low.png",
            "high": "pin_priority_high.png",
            "medium": "pin_priority_medium.png",
            "critical": "pin_priority_critical.png"
        };
        this.statusMapPinImage = {
            "created": "map_pin_created.png",
            "completed": "map_pin_completed.png",
            "started": "map_pin_started.png",
            "scheduled": "map_pin_scheduled.png",
            "rejected": "map_pin_rejected.png",
            "on route": "map_pin_on_route.png",
            "paused": "map_pin_paused.png",
            "accepted": "map_pin_accepted.png",
            "cancelled": "map_pin_canceled.png",
            "converted": "map_pin_converted.png"
        };
        this.statusMapPinImageFocus = {
            "created": "map_pin_created_focus.png",
            "completed": "map_pin_completed_focus.png",
            "started": "map_pin_started_focus.png",
            "scheduled": "map_pin_scheduled_focus.png",
            "rejected": "map_pin_rejected_focus.png",
            "on route": "map_pin_on_route_focus.png",
            "paused": "map_pin_paused_focus.png",
            "accepted": "map_pin_accepted_focus.png",
            "cancelled": "map_pin_canceled_focus.png",
            "converted": "map_pin_converted_focus.png"
        };
        this.status = {
            "Completed": "Completed",
            "Pending": "Pending",
            "Started": "Started",
            "Scheduled": "Scheduled",
            "Rejected": "Rejected",
            "On Route": "On Route",
            "Paused": "Paused",
            "Accepted": "Accepted",
            "Cancelled": "Cancelled"
        };
        this.priorityText = {
            "Low": "i18n.common.lowValueKA",
            "High": "i18n.common.highValueKA",
            "Medium": "i18n.common.mediumValueKA",
            "Critical": "i18n.common.criticalValueKA",
            "Very High": "i18n.common.veryhighValueKA"
        };
        this.statusText = {
            "Completed": "i18n.common.completedValueKA",
            "Pending": "i18n.common.pendingValueKA",
            "Started": "i18n.common.startedValueKA",
            "Scheduled": "i18n.common.scheduledValueKA",
            "Rejected": "i18n.common.rejectedValueKA",
            "On Route": "i18n.common.onrouteValueKA",
            "Paused": "i18n.common.pausedValueKA",
            "Accepted": "i18n.common.acceptedValueKA",
            "Cancelled": "i18n.common.cancelledValueKA"
        };
    },
    beautifyPhoneNumber: function(phoneNumber) { //formatting the phone number
        try {
            var index_old_no = 0;
            var beautifiedNo = "";
            while (index_old_no <= phoneNumber.length - 1) {
                if (index_old_no % 3 == 0 && index_old_no != 0 && index_old_no != phoneNumber.length - 1) {
                    beautifiedNo += "-";
                }
                beautifiedNo += phoneNumber[index_old_no];
                index_old_no++;
            }
            return beautifiedNo;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic beautifyPhoneNumber : " + err);
        }
    },
    configureSubMenu: function(viewModel, scrollId, widgets, submenu) {
        try {
            var widgetConfig;
            var dynamicBtn;
            var basicConfBtn;
            var labelConfig;
            var lbl;
            var noOfItems = widgets.length - 1;
            for (var widget = 0; widget <= noOfItems; widget++) {
                widgetConfig = widgets[widget];
                if (widgetConfig.widgetType == "button") {
                    basicConfBtn = {
                        "id": widgetConfig.id || "btn" + widget,
                        "skin": widgetConfig.skin,
                        "focusSkin": widgetConfig.focusSkin,
                        "onClick": widgetConfig.onclick,
                        "left": widgetConfig.left || (widget == 0 ? this.buttonConfigForSubMenu["left_for_first_widget"] : this.buttonConfigForSubMenu["left_for_other_widgets"]),
                        "height": widgetConfig.height || this.buttonConfigForSubMenu["height"],
                        "width": widgetConfig.width || this.buttonConfigForSubMenu["width"],
                        "centerY": widgetConfig.centerY || this.buttonConfigForSubMenu["centerY"]
                    };
                    if ((widget == noOfItems) && submenu) {
                        basicConfBtn["right"] = this.buttonConfigForSubMenu["right_for_last_btn"];
                    }
                    dynamicBtn = new kony.ui.Button(basicConfBtn, {}, {
                        showProgressIndicator: false
                    });
                    viewModel.performActionOnView(scrollId, "add", [dynamicBtn]);
                    widgetConfig = {};
                }
                if (widgetConfig.widgetType == "label" || (submenu && widget != noOfItems)) {
                    labelConfig = {
                        id: widgetConfig.id || "lbl" + widget,
                        skin: widgetConfig.skin || this.labelConfigForSubMenu["skin"],
                        text: widgetConfig.text || this.labelConfigForSubMenu["text"],
                        left: widgetConfig.left || this.labelConfigForSubMenu["left"],
                        height: widgetConfig.height || this.labelConfigForSubMenu["height"],
                        width: widgetConfig.width || this.labelConfigForSubMenu["width"],
                        centerY: widgetConfig.centerY || this.labelConfigForSubMenu["centerY"]
                    };
                    lbl = new kony.ui.Label(labelConfig, {}, {});
                    viewModel.performActionOnView(scrollId, "add", [lbl]);
                } else if (widgetConfig.widgetType == "flex") {
                    var flexContainer = new kony.ui.FlexContainer({
                        "id": widgetConfig.id,
                        "top": widgetConfig.top,
                        "left": widgetConfig.left,
                        "width": widgetConfig.width,
                        "height": widgetConfig.height,
                        "layoutType": widgetConfig.layoutType,
                        "skin": widgetConfig.skin
                    }, {}, {});
                    viewModel.performActionOnView(scrollId, "add", [flexContainer]);
                }
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic configureSubmenu : " + err);
        }
    },
    getPriorityImageKA: function(priorityValue) {
        try {
            return (this.priorityImage[priorityValue] == null ? "" : this.priorityImage[priorityValue]);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get priorityImage : " + err);
        }
    },
    getStatusImageKA: function(statusValue) { //getting status image
        try {
            return (this.statusImage[statusValue] == null ? "" : this.statusImage[statusValue]);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get getStatusImage : " + err);
        }
    },
    getpriorityMapPinImageKA: function(priorityValue, viewType) {
        try {
            if (viewType == "Priority") {
                var priorityValue = priorityValue ? priorityValue.toLowerCase() : "";
                return (this.priorityMapPinImage[priorityValue] == null ? "pin_priority_low.png" : this.priorityMapPinImage[priorityValue]);
            } else {
                return "map_pin_today.png";
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get priorityMapPinImage : " + err);
        }
    },
    getstatusMapPinImageKA: function(statusValue) {
        try {
            var statusValue = statusValue ? statusValue.toLowerCase() : "";
            return (this.statusMapPinImage[statusValue] == null ? "pin_priority_low.png" : this.statusMapPinImage[statusValue]);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get statusMapPinImage : " + err);
        }
    },
    getstatusMapPinImageFocusKA: function(statusValue) {
        try {
            var statusValue = statusValue ? statusValue.toLowerCase() : "";
            return (this.statusMapPinImageFocus[statusValue] == null ? "pin_priority_low.png" : this.statusMapPinImageFocus[statusValue]);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get getstatusMapPinImageFocusKA : " + err);
        }
    },
    getStatusKA: function(statusValue) { //getting status image
        try {
            return (this.status[statusValue] == null ? "" : this.status[statusValue]);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get getStatusKA : " + err);
        }
    },
    getPriorityOrTodayMapPinImageFocusKA: function() {
        try {
            return "mapfocuspin.png";
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get getPriorityOrTodayMapPinImageFocusKA : " + err);
        }
    },
    geti18nValueKA: function(key) {
        try {
            return kony.i18n.getLocalizedString(key);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get geti18nValueKA : " + err);
        }
    },
    getWorkingDayListKA: function() { //getting working days list
        try {
            //		var holidayList = ['6','0'];
            var holidayList = [];
            var finalDateArray = [];
            var finalArrayLength = 5;
            var lclDate = moment().add('days', -1);

            function getWeekArray(currentDate) {
                if ((finalDateArray.length < 5) && (holidayList.indexOf(currentDate.format('d')) < 0)) {
                    finalDateArray.push([moment(currentDate).format('D'), moment(currentDate).format('ddd'), currentDate]);
                    if (moment(currentDate).format('L') < moment().format('L')) {
                        getWeekArray(moment());
                    } else {
                        getWeekArray(moment(currentDate).add(1, 'days'));
                    }
                } else if (finalDateArray.length < 5) {
                    if (moment(currentDate).format('L') < moment().format('L')) {
                        getWeekArray(moment(currentDate).add(-1, 'days'))
                    } else {
                        getWeekArray(moment(currentDate).add(1, 'days'))
                    }
                } else {
                    return finalDateArray;
                }
            }
            getWeekArray(lclDate);
            return finalDateArray;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic getWorkingDayListKA : " + err);
        }
    },
    dataTruncation: function(value, num_char, num_char_trunc, appendingstring) { //Data Truncation     
        try {
            var isTruncated = false;
            if (typeof value == "string" && typeof num_char == "number" && typeof num_char_trunc == "number") {
                if (value.length > num_char) {
                    value = value.substring(0, num_char - 3);
                    value = value + appendingstring;
                    isTruncated = true;
                }
            }
            return {
                "value": value,
                "isTruncated": isTruncated
            };
        } catch (err) {
            kony.sdk.mvvm.log.error(" " + err);
        }
    },
    navigationOnGesture: function(myWidget, gestureInfo) {
        try {
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
            var controllerExtension = controller.getControllerExtensionObject();
            var descDetails = controllerExtension.getFormModelInfo(myWidget.id);
            controller = INSTANCE.getFormController("frmDescriptionDetailsKA");
            controllerExtension = controller.getControllerExtensionObject();
            controllerExtension.setFormModelInfo("descDetails", descDetails);
            if (descDetails.isTruncated) {
                controller.loadDataAndShowForm(null);
            }
        } catch (err) {
            kony.sdk.mvvm.log.error(" " + err);
        }
    },
    convertDataToGroup: function(data, header_fields) { //Grouping of data with headers on it
        try {
            //expect data is in the form of array of jsons and groupBylist is an array
            var dataOutput = [];
            var scopeObj = this;
            var header_fields_map = {};
            for (var i = 0; i < data.length; i++) {
                //header for each section which has the field value mapping
                var tempHeaderJson = {};
                var headersKey = "";
                for (var j = 0; j < header_fields.length; j++) {
                    var header_FieldValue = data[i][header_fields[j]];
                    tempHeaderJson[header_fields[j]] = header_FieldValue;
                    headersKey = headersKey + header_FieldValue + "_";
                }
                if (headersKey.length > 0) {
                    headersKey = headersKey.slice(0, headersKey.length - 1);
                    //check whether this groupValue key is already exist or not
                    if (header_fields_map[headersKey] !== undefined && header_fields_map[headersKey] !== null) {
                        var index = header_fields_map[headersKey];
                        dataOutput[index][1].push(data[i]);
                    } else {
                        //which contains the json which is the field mapping and data(another array) for that section
                        var sectionArray = [];
                        sectionArray.push(tempHeaderJson);
                        //Data Array for that particular section
                        var sectionDataArray = [];
                        sectionDataArray.push(data[i]);
                        sectionArray.push(sectionDataArray);
                        dataOutput.push(sectionArray);
                        header_fields_map[headersKey] = dataOutput.length - 1;
                    }
                }
            }
            var lclImage = "";
            var lclHeaderValue = "";
            for (var k = 0; k < dataOutput.length; k++) {
                switch (header_fields[0]) {
                case "orgStatus":
                    lclImage = scopeObj.getStatusHeaderImageKA(dataOutput[k][0][header_fields[0]]);
                    lclHeaderValue = scopeObj.getStatusTextKA(dataOutput[k][0][header_fields[0]]) + " (" + dataOutput[k][1].length + ")";
                    break;
                case "orgPriority":
                    lclImage = scopeObj.getPriorityImageKA(dataOutput[k][0][header_fields[0]]);
                    lclHeaderValue = scopeObj.getPriorityTextKA(dataOutput[k][0][header_fields[0]]) + " (" + dataOutput[k][1].length + ")";
                    break;
                }
                if (!lclHeaderValue) {
                    lclHeaderValue = scopeObj.geti18nValueKA(dataOutput[k][0][header_fields[0]]) + " (" + dataOutput[k][1].length + ")";
                }
                var headerValue = {
                    "lblHeader": lclHeaderValue,
                    "imgHeader": lclImage
                };
                dataOutput[k][0] = headerValue;
            }
            return dataOutput;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic  convertDataToGroup : " + err);
        }
    },
    getOrderAddress: function(address) { //Getting Address for Order List
        try {
            var finalAddress = "";
            if (address) {
                finalAddress += address.get("Address1") ? (address.get("Address1").trim() ? (address.get("Address1") + ", ") : "") : "";
                finalAddress += address.get("Address2") ? (address.get("Address2").trim() ? (address.get("Address2") + ", ") : "") : "";
                finalAddress += address.get("Address3") ? (address.get("Address3").trim() ? (address.get("Address3") + ", ") : "") : "";
                finalAddress += address.get("Address4") ? (address.get("Address4").trim() ? (address.get("Address4") + ", ") : "") : "";
                finalAddress += address.get("City_id") ? (address.get("City_id").trim() ? (address.get("City_id") + ", ") : "") : "";
                finalAddress += address.get("Region_id") ? (address.get("Region_id").trim() ? (address.get("Region_id") + ", ") : "") : "";
                finalAddress += address.get("ZipCode") ? (address.get("ZipCode").trim() ? (address.get("ZipCode") + ", ") : "") : "";
            }
            return finalAddress;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic  getOrderAddress : " + err);
        }
    },
    getStatusHeaderImageKA: function(statusValue) { //Getting Status Header Image
        try {
            return (this.headerStatusImage[statusValue] == null ? "" : this.headerStatusImage[statusValue]);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic  getStatusImage : " + err);
        }
    },
    showPreviousForm: function() {
        navController().goBack(true);
    },
    doNothingOnDeviceBackKA: function() {},
    getStatusTextKA: function(statusValue) {
        try {
            return (this.statusText[statusValue] == null ? "" : this.geti18nValueKA(this.statusText[statusValue]));
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get getStatusKA : " + err);
        }
    },
    getPriorityTextKA: function(priorityValue) {
        try {
            return (this.priorityText[priorityValue] == null ? "" : this.geti18nValueKA(this.priorityText[priorityValue]));
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic get getStatusKA : " + err);
        }
    },
    isObjectEmpty: function(object) {
        var isEmpty = true;
        for (keys in object) {
            isEmpty = false;
            break; // exiting since we found that the object is not empty
        }
        return isEmpty;
    },
    dateFormat: function(seconds, format) {
        var mins = "00";
        var hrs = "00";
        var secs = "00";
        if (!isNaN(seconds) && seconds > 0) {
            var mins = seconds / 60;
            var hrs = Math.floor(mins / 60) < 10 ? "0" + Math.floor(mins / 60) : Math.floor(mins / 60);
            mins = Math.floor(mins % 60) < 10 ? "0" + Math.floor(mins % 60) : Math.floor(mins % 60);
            var secs = seconds % 60;
            if (hrs > 99) {
                hrs = 99;
                mins = 59;
                secs = 59;
            }
        }
        switch (format) {
        case "HH:MM:SS":
            return hrs + ":" + mins + ":" + secs;
            break;
        case "HH:MM":
            return hrs + ":" + mins;
            break;
        }
    },
    cloneObject: function(obj) {
        try {
            var result = {};
            for (var key in obj) {
                result[key] = obj[key];
            }
            return result;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic cloneObject : " + err);
        }
    },
    roundNumber: function(value, num_of_digits) {
        return value ? +(Math.round(value + "e+" + num_of_digits) + "e-" + num_of_digits) : 0;
    },
    cloneValue: function(value) {
        try {
            var result;
            result = value;
            return result;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic cloneValue : " + err);
        }
    },
    initGesturesForForms: function() {
        var config1 = {
            fingers: 1,
            swipedistance: 50,
            swipevelocity: 10
        };
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController("frmOrderDetailsKA");
        var controllerExtension = controller.getControllerExtensionObject();
        var utilitiesObj = utilities.getUtilityObj();
        var formmodel = controller.getFormModel();
        formmodel.performActionOnView("flxLocationKA", "addGestureRecognizer", [1, config1, utilitiesObj.navigationOnGesture]);
        formmodel.performActionOnView("flxInstructionKA", "addGestureRecognizer", [1, config1, utilitiesObj.navigationOnGesture]);
        formmodel.performActionOnView("flxParentContactKA", "addGestureRecognizer", [1, config1, controllerExtension.showContactDetailsForm]);
        controller = INSTANCE.getFormController("frmTaskDetailsKA");
        controllerExtension = controller.getControllerExtensionObject();
        formmodel = controller.getFormModel();
        formmodel.performActionOnView("flexContainerInfoKA", "addGestureRecognizer", [1, config1, utilitiesObj.navigationOnGesture]);
    }
});
//Type your code here
function resourcesSegmentOnClickKA(frmName) {
    try {
        var config1 = {
            fingers: 1,
            swipedistance: 50,
            swipevelocity: 10
        };
        if (frmName == "frmTaskExecutionKA") {
            previousFormVariable = frmTaskExecutionKA;
            flexSegmentMainKA.flxDataKA.addGestureRecognizer(constants.GESTURE_TYPE_TAP, config1, navigationOnGesture);
        } else {
            if (frmName == "frmOrderResourcesListKA") {
                previousFormVariable = frmOrderResourcesListKA;
            } else if (frmName == "frmTaskResourcesKA") {
                previousFormVariable = frmTaskResourcesKA;
            }
            flxSegmentMainKA.flxDataKA.addGestureRecognizer(constants.GESTURE_TYPE_TAP, config1, navigationOnGesture);
        }
    } catch (err) {
        kony.print("==error in resourcesSegmentOnClickKA==>");
        kony.print(err.toString());
    }
}

function navigationOnGesture(myWidget, gestureInfo) {
    try {
        if (myWidget.id == "flxParentDescKA") {
            frmDescriptionDetailsKA.show();
        } else if (myWidget.id == "flxParentContactKA") {
            frmContactDetailsKA.show();
        } else if (myWidget.id == "flxContainerCheckOrderKA") {
            frmOrderCompleteCheckListKA.show();
        } else if (myWidget.id == "flxDataKA") {
            frmResourceExecutionKA.show();
        } else if (myWidget.id == "flxAddressKA") {
            frmDirectionsKA.show();
        }
    } catch (err) {
        kony.print("==error in navigationOnGesture==>");
        kony.print(err.toString());
    }
}

function onGestureHamburgerMenu(myWidget, gestureInfo) {
    try {
        if (isMenuShown) {
            if (gestureInfo.swipeDirection == 1) {
                showHideHamburgerMenuKA(frmOrderListKA, frmHamburgerMenuWOKA);
            }
        }
    } catch (err) {
        kony.print("==error in onGestureHamburgerMenu==>");
        kony.print(err.toString());
    }
}

function showHideHamburgerMenuKA(formName, hamburgerMenuName) {
    try {
        if (!isMenuShown) {
            var menuFlexRef = hamburgerMenuName.flexMenuContainerKA;
            if (menuFlexRef) {
                menuFlexRef.removeFromParent();
                formName.add(menuFlexRef);
                formName.flexMenuContainerKA.left = "0%";
                formName.flexMainKA.animate(getAnimationObject(), animConfig(), {
                    animationStart: function() {},
                    animationEnd: endCallBack
                });
            }

            function getAnimationObject() {
                var animDefinition = {
                    "100": {
                        "left": "80%"
                    }
                };
                animDef = kony.ui.createAnimation(animDefinition);
                return animDef;
            };

            function animConfig() {
                var config = {
                    "duration": 0.5,
                    "iterationCount": 1,
                    "delay": 0,
                    "fillMode": kony.anim.FILL_MODE_FORWARDS
                };
                return config;
            }

            function endCallBack() {
                formName.flexMainKA.forceLayout();
                isMenuShown = true;
            }
        } else {
            formName.flexMainKA.animate(getAnimationOutObject(), animConfigOut(), {
                animationStart: function() {},
                animationEnd: endCallBackKA
            });

            function getAnimationOutObject() {
                var animDefinition = {
                    "100": {
                        "left": "0%"
                    }
                };
                animDef = kony.ui.createAnimation(animDefinition);
                return animDef;
            };

            function animConfigOut() {
                var config = {
                    "duration": 0.5,
                    "iterationCount": 1,
                    "delay": 0,
                    "fillMode": kony.anim.FILL_MODE_FORWARDS
                };
                return config;
            }

            function endCallBackKA() {
                if (formName.flexMenuContainerKA) {
                    formName.flexMenuContainerKA.left = "-80%";
                    var lclMenuRef = formName.flexMenuContainerKA;
                    lclMenuRef.removeFromParent();
                    hamburgerMenuName.add(lclMenuRef);
                    formName.flexMainKA.forceLayout();
                    isMenuShown = false;
                }
            }
        }
    } catch (err) {
        kony.print("==error in showHideHamburgerMenuKA==>");
        kony.print(err.toString());
    }
}

function convertTimeZone(date, SourceTimeZone, RemoteTimeZone, dateFormat) {
    if ((SourceTimeZone === null || SourceTimeZone === undefined) && (RemoteTimeZone === null || RemoteTimeZone === undefined)) {
        kony.sdk.mvvm.log.info("both SourceTimeZone and RemoteTimeZone are null");
        return null;
    }
    var remoteTime = null;
    if (typeof date === "string" && date.indexOf('GMT') > -1) date = date.substr(0, date.indexOf('GMT'));
    else if (typeof date === "string" && date.indexOf('+') > -1) date = date.substr(0, date.indexOf('+'));
    if (SourceTimeZone !== undefined && SourceTimeZone !== null) date = moment.tz(date, SourceTimeZone);
    else date = moment(date);
    if (RemoteTimeZone !== undefined && RemoteTimeZone !== null) remoteTime = date.clone().tz(RemoteTimeZone)
    else remoteTime = moment(date.format()).local()
    if (dateFormat !== null && dateFormat !== undefined) remoteTime = remoteTime.format(dateFormat);
    else remoteTime = remoteTime.format();
    return remoteTime;
}