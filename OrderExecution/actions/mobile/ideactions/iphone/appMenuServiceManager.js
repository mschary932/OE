var AppMenuServiceManager = Class(AppInitServiceMangerInterface, {
    constructor: function() {},
    fetch: function(successcallback, errorCallback) {
        var uiConfigProvider = kony.sdk.mvvm.KonyApplicationContext.getUIConfigDataProvider();
        uiConfigProvider.getAppMenuJson(appMenuSuccessCallback, appMenuErrorCallback);
    },
    apply: function(applicationProperties, successcallback, errorCallback) {
        var appMenuObject = {},
            isAppMenuFound = false;
        if (applicationProperties !== undefined) {
            for (var i = 0; i < applicationProperties.length; i++) {
                if (applicationProperties[i].key === kony.sdk.mvvm.constants["APP_MENU_KEY"]) {
                    var value = applicationProperties[i].value;
                    var channelName = kony.sdk.mvvm.Utils.getChannelName();
                    if (value !== null && value !== undefined && value.hasOwnProperty(channelName) && value[channelName].hasOwnProperty("data")) {
                        appMenuObject["focusskin"] = value["focusskin"];
                        appMenuObject["skin"] = value["skin"];
                        appMenuObject["wType"] = value["Appmenu"];
                        appMenuObject["data"] = value[channelName]["data"];
                        isAppMenuFound = true;
                        break;
                    }
                }
            }
        }
        if (isAppMenuFound) {
            try {
                //var appMenuObject = response.appmenu;
                var appmenuData = appMenuObject;
                response = appMenuObject;
                var isSyncEnabled = false;
                if (kony.sdk.mvvm.KonyApplicationContext.SESSION_TOKEN === undefined || kony.sdk.mvvm.KonyApplicationContext.SESSION_TOKEN === "") {
                    isSyncEnabled = true;
                } else {
                    isSyncEnabled = kony.sdk.mvvm.KonyApplicationContext.SESSION_TOKEN.isTenantSyncEnabled;
                }
                if (appmenuData && appmenuData.hasOwnProperty("data") && appmenuData.data.length > 0) {
                    var appMenuActionsSpecified = true;
                    var appMenuActionNotSpecifiedCount = 0;
                    var appMenuSkin = appmenuData["skin"];
                    var appMenuFocusSkin = appmenuData["focusskin"];
                    //var appMenuWType = appmenuData["wType"];  (Not using right now) 
                    var appMenuData = appmenuData.data;
                    var appMenuItems = appMenuData;
                    var appMenuItemsLen = appMenuData.length;
                    var appMenu = [];
                    var moreAppMenuArr = [];
                    var appMenuArrCount = 0,
                        actionForThirdItem = "";
                    var syncActionFlag, type, isIpadIphone = false,
                        rowClickedInAppMenuPopup = false;
                    var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
                    if (platFormName === kony.sdk.mvvm.Platforms["IPHONE"] || platFormName === kony.sdk.mvvm.Platforms["IPAD"]) {
                        isIpadIphone = true;
                    }
                    for (var i = 0; i < appMenuItemsLen; i++) {
                        var appMenuItem = [];
                        var item = appMenuData[i];
                        syncActionFlag = false;
                        var img;
                        appMenuItem.push(item["id"]);
                        appMenuItem.push(item["title"]);
                        img = item.icon["default"];
                        appMenuItem.push(img);
                        if (item.hasOwnProperty("navigateTo") && item.navigateTo.length === 2) {
                            var navigateToOrAction = item.navigateTo;
                            var typeIndex = navigateToOrAction[0].indexOf("||");
                            type = navigateToOrAction[0].substring(typeIndex + 2);
                            var actionFn = "";
                            var actionObj = getActionForType(type, navigateToOrAction);
                            actionFn = actionObj.actionFnStr;
                            if (appMenuArrCount === 3) actionForThirdItem = actionFn;
                            syncActionFlag = actionObj.syncActionFlag;
                            var canPush = isActionSyncRelated(type, syncActionFlag);
                            if (isIpadIphone) {
                                var selectedImageMap = undefined;
                                var selectedImage;
                                var deviceInfo = kony.os.deviceInfo();
                                kony.sdk.mvvm.log.info("Device Info --- ", deviceInfo);
                                if (deviceInfo.osversion >= 7 && item.hasOwnProperty("menuPSPs") && item.menuPSPs.hasOwnProperty(platFormName)) {
                                    selectedImage = item.menuPSPs[platFormName].imageSelected;
                                    selectedImageMap = {
                                        "selectedImage": selectedImage
                                    };
                                }
                                appMenuItem.push(eval.call(null, actionFn));
                                if (selectedImageMap !== undefined) {
                                    appMenuItem.push(selectedImageMap);
                                }
                                if (appMenuArrCount >= 3) { //Fixing app menu items to the max of 4 for iphone
                                    if (canPush) {
                                        appMenuItem.push(item.navigateTo);
                                        moreAppMenuArr.push(appMenuItem);
                                    }
                                } else {
                                    if (canPush) {
                                        appMenuArrCount += 1;
                                        appMenu.push(appMenuItem);
                                    }
                                }
                            } else {
                                appMenuItem.push(eval.call(null, actionFn));
                                if (canPush) {
                                    appMenuArrCount += 1;
                                    appMenu.push(appMenuItem);
                                }
                            }
                            kony.sdk.mvvm.log.info("AppMenu object ------ ", appMenuItem);
                        } else {
                            appMenuActionNotSpecifiedCount += 1;
                            var actionFun = "(function(){return});"
                            appMenuItem.push(eval.call(null, actionFun));
                            appMenu.push(appMenuItem);
                        }
                    }
                    if (appMenuActionNotSpecifiedCount === appMenuItemsLen) {
                        appMenuActionsSpecified = false;
                    }
                    if (appMenuActionsSpecified) {
                        if (isIpadIphone && moreAppMenuArr.length === 1) {
                            var y = moreAppMenuArr[0].slice(0, 4);
                            var finalItem = y;
                            appMenu.push(finalItem);
                        } else if (isIpadIphone && moreAppMenuArr.length >= 1) {
                            var remainingAppMenuItems = moreAppMenuArr;

                            function moreItems() {
                                createMoreFormForAppMenuIphone(remainingAppMenuItems);
                            }
                            var appMenuItemMore = [];
                            appMenuItemMore[0] = "moreBtnIdAppMenu";
                            appMenuItemMore[1] = "More";
                            appMenuItemMore[2] = "appmore.png";
                            appMenuItemMore[3] = moreItems;
                            appMenu.push(appMenuItemMore);
                        }
                        kony.sdk.mvvm.log.info("Final app menu ----- ", appMenu);
                        if (appMenuSkin === null || appMenuSkin === "") appMenuSkin = "skn1"; //default values
                        if (appMenuFocusSkin === null || appMenuFocusSkin === "") appMenuFocusSkin = "fcskn1"; //default values
                        kony.application.setAppMenu(appMenu, appMenuSkin, appMenuFocusSkin);
                    }
                    //Calling dismissLoadingScreen before successcallback as errors in successcallback resulting in the app infinitely showing loading screen
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    successcallback({
                        "appmenu": appMenuObject,
                        "appProps": applicationProperties
                    }); //IF appmenu is set, sending appmenu object in callback
                    var loadAppMenuEndTS = new Date();
                    kony.sdk.mvvm.Utils.perftimecal("Loading AppMenu Data >>", "Loading AppMenu Data dismiss >>", loadAppMenuTS, loadAppMenuEndTS);

                    function createMoreFormForAppMenuIphone(newappMenuItems) {
                        //Order of items in each newappmenuitems is [id, title, img, actionClosure, {selectedImage-optional}, navigateToOrAction]
                        if (appMenuIphonePopup === undefined) {
                            moresegTmpltAppMenu();
                            appMenuIphonePopupCreate();
                        }
                        var segData = [];
                        var appMenuItemLen = newappMenuItems.length;
                        for (var i = 0; i < appMenuItemLen; i++) {
                            var obj = {};
                            obj["imgAppMenuiPhone0101"] = newappMenuItems[i][2];
                            obj["lblAppMenuIphone0101"] = newappMenuItems[i][1];
                            if (newappMenuItems[i].length === 6) { //Selectedimage is added in the item then length becomes 6
                                obj["navigateTo"] = [newappMenuItems[i][5][0], newappMenuItems[i][5][1]];
                            } else obj["navigateTo"] = [newappMenuItems[i][4][0], newappMenuItems[i][4][1]];
                            segData.push(obj);
                        }
                        appMenuIphonePopup.segAppmenuIphone0101.data = segData;
                        appMenuIphonePopup.show();
                    }

                    function isActionSyncRelated(type, syncActionFlag) {
                        var flag = true;
                        if (type === "action") {
                            if (syncActionFlag) {
                                if (!isSyncEnabled) {
                                    flag = false;
                                }
                            }
                        }
                        return flag;
                    }

                    function onAppMenuIphoneRowClick() {
                        rowClickedInAppMenuPopup = true;
                        var selectedItem = appMenuIphonePopup.segAppmenuIphone0101.selectedItems[0];
                        var navigateToOrAction = selectedItem.navigateTo;
                        var typeIndex = navigateToOrAction[0].indexOf("||");
                        var type = navigateToOrAction[0].substring(typeIndex + 2);
                        var actionObj = getActionForType(type, navigateToOrAction);
                        var actionFn = actionObj.actionFnStr;
                        eval.call(null, actionFn)();
                        appMenuIphonePopup.dismiss();
                    }

                    function moresegTmpltAppMenu() {
                        var segTmpltBasicProps = {
                            "id": "segTmpltAppMenuIphone",
                            "isVisible": true,
                            "orientation": constants.BOX_LAYOUT_VERTICAL,
                            "position": constants.BOX_POSITION_AS_NORMAL
                        };
                        var segTmpltLayoutProps = {
                            "padding": [0, 0, 0, 0],
                            "paddingInPixel": false,
                            "margin": [0, 0, 0, 0],
                            "marginInPixel": false,
                            "percent": true,
                            "layoutAlignment": constants.BOX_LAYOUT_ALIGN_FROM_LEFT,
                            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                            "containerWeight": 100,
                            "vExpand": false
                        };
                        segTmpltAppMenuIphone = new kony.ui.Box(segTmpltBasicProps, segTmpltLayoutProps, {
                            "bounces": false
                        });
                        var tmpltHboxBasicProps = {
                            "id": "tmpltHboxSegAppMenu0101",
                            "skin": "slHbox",
                            "isVisible": true,
                            "orientation": constants.BOX_LAYOUT_HORIZONTAL,
                            "position": constants.BOX_POSITION_AS_NORMAL
                        };
                        var tmpltHboxLayoutProps = {
                            "padding": [0, 0, 0, 0],
                            "paddingInPixel": false,
                            "margin": [0, 0, 0, 0],
                            "marginInPixel": false,
                            "percent": true,
                            "layoutAlignment": constants.BOX_LAYOUT_ALIGN_FROM_LEFT,
                            "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
                            "containerWeight": 100,
                            "vExpand": false
                        };
                        var tmpltHboxSegAppMenu0101 = new kony.ui.Box(tmpltHboxBasicProps, tmpltHboxLayoutProps, {});
                        var imgBasicProps = {
                            "id": "imgAppMenuiPhone0101",
                            "isVisible": true,
                            "onDownloadComplete": null,
                            "src": "imagedrag.png"
                        };
                        var imgLayoutProps = {
                            "padding": [2, 2, 2, 2],
                            "paddingInPixel": false,
                            "margin": [1, 1, 1, 1],
                            "marginInPixel": false,
                            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                            "containerWeight": 15,
                            "widgetAlignment": constants.WIDGET_ALIGN_CENTER
                        };
                        var imgAppMenuiPhone0101 = new kony.ui.Image2(imgBasicProps, imgLayoutProps, {});
                        var lblBasicProps = {
                            "id": "lblAppMenuIphone0101",
                            "skin": "lblNormal",
                            "text": "Label",
                            "isVisible": true
                        };
                        var lblLayoutProps = {
                            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                            "containerWeight": 85,
                            "padding": [1, 1, 1, 1],
                            "paddingInPixel": false,
                            "margin": [1, 1, 1, 1],
                            "marginInPixel": false,
                            "hExpand": true,
                            "vExpand": false
                        };
                        var lblAppMenuIphone0101 = new kony.ui.Label(lblBasicProps, lblLayoutProps, {});
                        tmpltHboxSegAppMenu0101.add(imgAppMenuiPhone0101, lblAppMenuIphone0101);
                        segTmpltAppMenuIphone.add(tmpltHboxSegAppMenu0101);
                    }

                    function onHideAppMenuPopupCallBck() {
                        if (!rowClickedInAppMenuPopup) {
                            kony.sdk.mvvm.log.info("More items popup got dismissed - appmenu");
                            kony.application.getCurrentForm().show();
                        }
                        rowClickedInAppMenuPopup = false;
                    }

                    function addWidgetsappMenuIphonePopup() {
                        var basicSegProps = {
                            "id": "segAppmenuIphone0101",
                            "rowSkin": "seg2Normal",
                            "rowFocusSkin": "seg2Focus",
                            "sectionHeaderSkin": "sliPhoneSegmentHeader",
                            "widgetDataMap": {
                                "tmpltHboxSegAppMenu0101": "tmpltHboxSegAppMenu0101",
                                "imgAppMenuiPhone0101": "imgAppMenuiPhone0101",
                                "lblAppMenuIphone0101": "lblAppMenuIphone0101"
                            },
                            "rowTemplate": segTmpltAppMenuIphone,
                            "isVisible": true,
                            "data": [{
                                "imgAppMenuiPhone0101": "imagedrag.png",
                                "lblAppMenuIphone0101": "Label"
                            }],
                            "separatorRequired": true,
                            "separatorThickness": 1,
                            "separatorColor": "E9E9E900",
                            "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
                            "onRowClick": onAppMenuIphoneRowClick,
                            "screenLevelWidget": false,
                            "groupCells": false,
                            "retainSelection": false,
                            "needPageIndicator": true,
                            "pageOnDotImage": "pageOnDot.png",
                            "pageOffDotImage": "pageOffDot.png",
                            "onSwipe": null,
                            "showScrollbars": false,
                            "scrollingEvents": {},
                            "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR
                        };
                        var layoutSegProps = {
                            "margin": [0, 0, 0, 0],
                            "marginInPixel": false,
                            "padding": [0, 0, 0, 0],
                            "paddingInPixel": false,
                            "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                            "containerWeight": 100
                        };
                        var segAppmenuIphone0101 = new kony.ui.SegmentedUI2(basicSegProps, layoutSegProps, {});
                        //Creating the ScrollBox.
                        var scrollBoxForAppMenuPopup = new kony.ui.ScrollBox({
                            "id": "scrollBoxForAppMenuPopup",
                            "isVisible": true,
                            "orientation": constants.BOX_LAYOUT_VERTICAL,
                            "scrollDirection": constants.SCROLLBOX_SCROLL_VERTICAL,
                            "showScrollbars": true,
                            "enableScrollByPage": false
                        }, {
                            "percent": true,
                            "margin": [0, 0, 0, 0],
                            "padding": [2, 2, 2, 2],
                            "containerHeight": 80,
                            "containerHeightReference": constants.CONTAINER_HEIGHT_BY_FORM_REFERENCE,
                            "marginInPixel": false,
                            "paddingInPixel": false,
                            "containerWeight": 100
                        }, {
                            "bounces": false
                        });
                        scrollBoxForAppMenuPopup.add(segAppmenuIphone0101);
                        var hboxMorePopup = new kony.ui.Box({
                            "id": "hboxMorePopup",
                            "isVisible": true,
                            "orientation": constants.BOX_LAYOUT_HORIZONTAL
                        }, {
                            "containerWeight": 100,
                            "percent": true,
                            "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
                            "margin": [0, 0, 0, 0],
                            "padding": [0, 0, 0, 0],
                            "vExpand": false,
                            "marginInPixel": false,
                            "paddingInPixel": false,
                            "layoutType": constants.CONTAINER_LAYOUT_BOX
                        }, {});
                        hboxMorePopup.add(scrollBoxForAppMenuPopup);
                        appMenuIphonePopup.add(hboxMorePopup);
                    };

                    function appMenuIphonePopupCreate() {
                        var popupBasicProps = {
                            "id": "appMenuIphonePopup",
                            "title": "More",
                            "isModal": false,
                            "transparencyBehindThePopup": 30,
                            "addWidgets": addWidgetsappMenuIphonePopup,
                            onHide: onHideAppMenuPopupCallBck
                        };
                        var popupLayoutProps = {
                            containerWeight: 90,
                            padding: [2, 2, 2, 2]
                        };
                        appMenuIphonePopup = new kony.ui.Popup(popupBasicProps, popupLayoutProps, {
                            "bounces": false
                        });
                    };

                    function getActionForType(type, navigateToOrAction) {
                        var syncActionFlag = false;
                        var typeIndex = navigateToOrAction[0].indexOf("||");
                        var actionFn = "";
                        actionFn = "(function(){" + "try {";
                        if (type === "form") {
                            var formName = navigateToOrAction[0].substring(0, typeIndex);
                            var callBacks = kony.sdk.mvvm.util.getAppMenuCallbacks(type, formName);
                            actionFn += "if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance()) {" + "var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();" + "if(typeof " + callBacks.datacallback + " !== undefined && (typeof " + callBacks.datacallback + " === 'function')){var viewController = INSTANCE.navigationController.getViewController(\"" + formName + "\");viewController.registerDataCallback(" + callBacks.datacallback + ");}" + "INSTANCE.navigationController.navigateTo(\"" + formName + "\", null," + callBacks.errorcallback + ");" + "}"
                        } else if (type === "action") {
                            var action = navigateToOrAction[0].substring(0, typeIndex);
                            var callBacks = kony.sdk.mvvm.util.getAppMenuCallbacks(type, action);
                            switch (action) {
                            case "refreshApp":
                                actionFn += "kony.sdk.mvvm.KonyApplicationContext.refreshApp();"
                                break;
                            case "logout":
                                actionFn += "kony.sdk.mvvm.KonyApplicationContext.logout(success, error);function success(succ){ alert(\"Logout successful\");" + kony.sdk.mvvm.LoginPageId + ".show();}; function error(err){kony.sdk.mvvm.print(\"ERROR logout\"+err.toString());}"
                                break;
                            case "rollbackSync":
                                syncActionFlag = true;
                                actionFn += "kony.sdk.mvvm.APPLOGINDETAILS[\"syncoption\"] = 'rollbackAfterLogin';kony.sdk.mvvm.authenticateWithStoredCredentials(" + callBacks.sucesscallback + "," + callBacks.errorcallback + ");";
                                break;
                            case "sync":
                                syncActionFlag = true;
                                actionFn += "kony.sdk.mvvm.APPLOGINDETAILS[\"syncoption\"] = '';kony.sdk.mvvm.authenticateWithStoredCredentials(" + callBacks.sucesscallback + "," + callBacks.errorcallback + ");";
                                break;
                            case "syncmetadata":
                                syncActionFlag = true;
                                actionFn += "kony.sdk.mvvm.APPLOGINDETAILS[\"syncoption\"] = 'metadataSync';kony.sdk.mvvm.authenticateWithStoredCredentials(" + callBacks.sucesscallback + "," + callBacks.errorcallback + ");";
                                break;
                            default:
                                actionFn += "alert(\"Action not defined\");"
                                break;
                            }
                        }
                        actionFn += "} catch(err) {" + "kony.print(\"ERROR - \"+ err.toString());" + "alert(\" ERROR - \"+err.toString());" + "}" + "});";
                        kony.sdk.mvvm.print(actionFn);
                        var obj = {};
                        obj.actionFnStr = actionFn;
                        obj.syncActionFlag = syncActionFlag;
                        return obj;
                    }
                } else {
                    kony.sdk.mvvm.log.info("App Menu not defined");
                    kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                    //successcallback();
                    successcallback({
                        "appProps": applicationProperties
                    });
                }
            } catch (err) {
                if (err instanceof Error) throw new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_CREATING_APPMENU, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_CREATING_APPMENU + " : " + err.name + " : " + err.message);
                else if (err instanceof kony.sdk.mvvm.Exception) throw err;
                else throw new kony.sdk.mvvm.Exception(err.code, err.message + ", " + err.toString());
            }
        } else {
            //TODO: return whole applicationprops to suuccesscallback
            successcallback({
                "appProps": applicationProperties
            });
        }
    },
    execute: function(success, error, params) {
        success();
    }
});