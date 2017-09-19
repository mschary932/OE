kony.sdk.mvvm.backGroundSyncInProgress = false;
kony.sdk.mvvm.syncStartPoint = 0;
kony.sdk.mvvm.syncEndPoint = 0;
kony.sdk.mvvm.previousForm = undefined;
var lblSyncBarKA = new kony.ui.Label({
    "id": "lblSyncBarKA",
    "top": "0dp",
    "left": "0dp",
    "width": "0%",
    "height": "100%",
    "minWidth": "0%",
    "maxWidth": "100%",
    "zIndex": 25,
    "isVisible": true,
    "text": " ",
    "skin": "sknLblSyncBarKA"
}, {
    "padding": [0, 0, 0, 0],
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "marginInPixel": false,
    "paddingInPixel": false,
    "containerWeight": 0
}, {
    "textCopyable": false
});
var flxHorizontalAnimationaKA = new kony.ui.FlexContainer({
    "id": "flxHorizontalAnimationaKA",
    "top": "6%",
    "left": "0%",
    "width": "100%",
    "height": "1%",
    "zIndex": 25,
    "isVisible": true,
    "clipBounds": true,
    "Location": "[0,27]",
    "skin": "slFbox",
    "layoutType": kony.flex.FREE_FORM
}, {
    "padding": [0, 0, 0, 0]
}, {});
flxHorizontalAnimationaKA.setDefaultUnit(kony.flex.DP);
flxHorizontalAnimationaKA.add(lblSyncBarKA);
var lblSync = new kony.ui.Label({
    "id": "lblSync",
    "top": "3%",
    "bottom": "0%",
    "width": "60%",
    "height": "4%",
    "centerX": "50%",
    "zIndex": 25,
    "isVisible": true,
    "text": " ",
    "skin": "startManualSync"
}, {
    "padding": [0, 0, 0, 0],
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "marginInPixel": false,
    "paddingInPixel": false,
    "containerWeight": 0
}, {
    "textCopyable": false
});
var animDefinition = {};
var animConfig = {};

function startSyncAnimation(startPoint, endPoint, duration) {
    try {
        var currentForm = kony.application.getCurrentForm();
        if (currentForm && currentForm.lblSync) currentForm.remove(lblSync);
        if (currentForm.id != "frmLoginKA" && currentForm.id != "frmOrdersViewsKA" && currentForm.id != "frmTenantKA" && currentForm.id != "frmFSLoginKA") if (!currentForm.flxHorizontalAnimationaKA) {
            currentForm.addAt(flxHorizontalAnimationaKA, 100);
        }
        if (!kony.sdk.mvvm.previousForm) kony.sdk.mvvm.previousForm = currentForm;
        kony.sdk.mvvm.backGroundSyncInProgress = true;
        currentForm.lblSyncBarKA.animate(animationDefinition(startPoint, endPoint), animationConfig(duration), {
            animationEnd: startAnimationCallBack
        });

        function startAnimationCallBack() {
            kony.sdk.mvvm.backGroundSyncInProgress = true;
            kony.sdk.mvvm.syncStartPoint = kony.sdk.mvvm.syncEndPoint;
        }
    } catch (error) {
        kony.sdk.mvvm.log.error("==startSyncAnimation==>" + error);
    }
}

function endAnimation(startPoint, endPoint, duration, message, refreshSyncCallBack) {
    try {
        var currentForm = kony.application.getCurrentForm();
        if (currentForm.id != "frmLoginKA" && currentForm.id != "frmOrdersViewsKA" && currentForm.id != "frmTenantKA" && currentForm.id != "frmFSLoginKA") if (!currentForm.flxHorizontalAnimationaKA) {
            currentForm.addAt(flxHorizontalAnimationaKA, 100);
        }
        kony.sdk.mvvm.previousForm = currentForm;
        currentForm.lblSyncBarKA.animate(animationDefinition(startPoint, endPoint), animationConfig(duration), {
            animationEnd: stopAnimationCallBack
        });

        function stopAnimationCallBack() {
            var currentForm = kony.application.getCurrentForm();
            var previousForm = kony.sdk.mvvm.previousForm;
            if (currentForm && currentForm.flxHorizontalAnimationaKA) {
                currentForm.lblSyncBarKA.width = "0%";
                currentForm.remove(flxHorizontalAnimationaKA);
            }
            if (previousForm && previousForm.flxHorizontalAnimationaKA) {
                previousForm.lblSyncBarKA.width = "0%";
                previousForm.remove(flxHorizontalAnimationaKA);
            }
            kony.sdk.mvvm.backGroundSyncInProgress = false;
            kony.sdk.mvvm.syncStartPoint = 0;
            kony.sdk.mvvm.syncEndPoint = 0;
            if (currentForm.id != "frmLoginKA" && currentForm.id != "frmOrdersViewsKA" && currentForm.id != "frmTenantKA" && currentForm.id != "frmFSLoginKA") {
                if (!currentForm.lblSync) {
                    currentForm.addAt(lblSync, 101);
                    currentForm.lblSync.text = message;
                    currentForm.lblSync.animate(showMessageDefinition(), showMessageConfig(), {
                        animationEnd: syncMessageCallBack
                    });
                }
            } else {
                refreshSyncCallBack();
            }
        }

        function showMessageDefinition() {
            var showSyncMessageDef = {
                0: {
                    "isVisible": true,
                    "left": 0
                },
                100: {
                    "isVisibile": false,
                    "left": 0
                }
            };
            var createSyncMessageDef = kony.ui.createAnimation(showSyncMessageDef);
            return createSyncMessageDef;
        }

        function showMessageConfig() {
            var showSyncMessageConfig = {
                "duration": 2,
                "iterationCount": 1,
                "delay": 0,
                "fillMode": kony.anim.FILL_MODE_FORWARDS
            };
            return showSyncMessageConfig;
        }

        function syncMessageCallBack() {
            kony.print("---------------------------------------------------->resetPage: " + kony.sdk.mvvm.syncStartPoint + ", " + kony.sdk.mvvm.syncEndPoint);
            var currentForm = kony.application.getCurrentForm();
            var previousForm = kony.sdk.mvvm.previousForm;
            if (currentForm && currentForm.flxHorizontalAnimationaKA) {
                currentForm.lblSyncBarKA.width = "0%";
                currentForm.remove(flxHorizontalAnimationaKA);
            }
            if (previousForm && previousForm.flxHorizontalAnimationaKA) {
                previousForm.lblSyncBarKA.width = "0%";
                previousForm.remove(flxHorizontalAnimationaKA);
            }
            kony.sdk.mvvm.backGroundSyncInProgress = false;
            kony.sdk.mvvm.syncStartPoint = 0;
            kony.sdk.mvvm.syncEndPoint = 0;
            if (currentForm && currentForm.lblSync) currentForm.remove(lblSync);
            if (previousForm && previousForm.lblSync) previousForm.remove(lblSync);
            kony.sdk.mvvm.previousForm = undefined;
            resetSyncSkin();
            refreshSyncCallBack();
        }
    } catch (error) {
        kony.sdk.mvvm.log.error("==endAnimation==>" + error);
    }
}

function resetSyncSkin() {
    try {
        if (frmOrderListKA.btnManualSyncKA) {
            frmOrderListKA.btnManualSyncKA.skin = "sknBtnSyncKA";
        }
        if (frmHamburgerMenuWOKA.btnManualSyncKA) {
            frmHamburgerMenuWOKA.btnManualSyncKA.skin = "sknBtnSyncKA";
        }
    } catch (error) {
        kony.sdk.mvvm.log.error("==resetSyncSkin==>" + error);
    }
}

function setSyncInProgressSkin() {
    try {
        if (frmOrderListKA.btnManualSyncKA) {
            frmOrderListKA.btnManualSyncKA.skin = "sknBtnManualSyncInProgressKA";
        }
        if (frmHamburgerMenuWOKA.btnManualSyncKA) {
            frmHamburgerMenuWOKA.btnManualSyncKA.skin = "sknBtnManualSyncInProgressKA";
        }
    } catch (error) {
        kony.sdk.mvvm.log.error("==setSyncInProgressSkin==>" + error);
    }
}

function animationDefinition(startPoint, endPoint) {
    animDefinition = {
        0: {
            "width": startPoint + "%",
            "left": 0
        },
        100: {
            "width": endPoint + "%",
            "left": 0
        }
    };
    var createStopAnimationDef = kony.ui.createAnimation(animDefinition);
    return createStopAnimationDef;
}

function animationConfig(duration) {
    config = {
        "duration": duration,
        "iterationCount": 1,
        "delay": 0,
        "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    return config;
}

function preShowSyncAnimCall() {
    if (kony.sdk.mvvm.backGroundSyncInProgress == true) {
        kony.print("inside");
        var previousForm = kony.sdk.mvvm.previousForm;
        if (previousForm) {
            var flexRef = previousForm.flxHorizontalAnimationaKA;
            if (flexRef) {
                flexRef.removeFromParent();
                kony.print("removed from " + previousForm.id);
            }
            if (previousForm && previousForm.lblSync) {
                previousForm.remove(lblSync);
            }
        }
        var currentForm = kony.application.getCurrentForm();
        if (currentForm.id != "frmLoginKA" && currentForm.id != "frmOrdersViewsKA" && currentForm.id != "frmTenantKA" && currentForm.id != "frmFSLoginKA") {
            if (!currentForm.flxHorizontalAnimationaKA) {
                currentForm.addAt(flexRef, 100);
                kony.print("added to " + currentForm.id);
            }
            kony.sdk.mvvm.previousForm = currentForm;
        }
    } else {
        var currentForm = kony.application.getCurrentForm();
        if (currentForm && currentForm.flxHorizontalAnimationaKA) {
            currentForm.remove(flxHorizontalAnimationaKA);
        }
        if (currentForm && currentForm.lblSync) {
            currentForm.remove(lblSync);
        }
    }
}