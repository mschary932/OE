var hamburgerMenu = Class({
    $statics: {
        IS_MENU_SHOWN: false,
        IS_ANIMATION_INPROGRESS: false,
        MENU_WIDTH: "80%",
        FORM_LEFT_MARGIN: "0%",
        ANIMATION_DURATION: 0.2,
        ITERATION_COUNT: 1,
        DELAY: 0,
        FILLMODE: kony.anim.FILL_MODE_FORWARDS
    },
    getAnimationConfig: function() {
        hamburgerMenu.IS_ANIMATION_INPROGRESS = true;
        var config = {
            "duration": hamburgerMenu.ANIMATION_DURATION,
            "iterationCount": hamburgerMenu.ITERATION_COUNT,
            "delay": hamburgerMenu.DELAY,
            "fillMode": hamburgerMenu.FILLMODE
        };
        return config;
    },
    getAnimationObject: function(marginParam) {
        var animDefinition = {
            "100": {
                "left": marginParam
            }
        };
        animDef = kony.ui.createAnimation(animDefinition);
        return animDef;
    },
    execute: function() {
        var scopeObj = this;
        var lclMenu = frmHamburgerMenuWOKA;
        var lclForm = frmOrderListKA;
        if (!hamburgerMenu.IS_MENU_SHOWN && !hamburgerMenu.IS_ANIMATION_INPROGRESS) {
            var endCallBack = function() {
                    lclForm.flexMainKA.forceLayout();
                    hamburgerMenu.IS_MENU_SHOWN = true;
                    hamburgerMenu.IS_ANIMATION_INPROGRESS = false;
                }
            scopeObj.showHamburgerMenu(lclMenu, endCallBack);
        } else if (!hamburgerMenu.IS_ANIMATION_INPROGRESS) {
            var endCallBack = function() {
                    if (lclForm.flexMenuContainerKA) {
                        lclForm.flexMenuContainerKA.left = "-80%";
                        var lclMenuRef = lclForm.flexMenuContainerKA;
                        lclMenuRef.removeFromParent();
                        lclMenu.add(lclMenuRef);
                        lclForm.flexMainKA.forceLayout();
                        hamburgerMenu.IS_MENU_SHOWN = false;
                        hamburgerMenu.IS_ANIMATION_INPROGRESS = false;
                    }
                }
            scopeObj.hideHamburgerMenu(endCallBack);
        }
    },
    showHamburgerMenu: function(lclMenu, endCallBack) {
        var scopeObj = this;
        var menuFlexRef = lclMenu.flexMenuContainerKA;
        var formName = kony.application.getCurrentForm();
        if (menuFlexRef) {
            menuFlexRef.removeFromParent();
            formName.add(menuFlexRef);
            formName.flexMenuContainerKA.left = hamburgerMenu.FORM_LEFT_MARGIN;
            formName.flexMainKA.animate(scopeObj.getAnimationObject(hamburgerMenu.MENU_WIDTH), scopeObj.getAnimationConfig(), {
                animationStart: function() {},
                animationEnd: endCallBack
            });
        }
    },
    hideHamburgerMenu: function(endCallBack) {
        var scopeObj = this;
        if (frmOrderListKA.flexMainKA) {
            frmOrderListKA.flexMainKA.animate(scopeObj.getAnimationObject(hamburgerMenu.FORM_LEFT_MARGIN), scopeObj.getAnimationConfig(), {
                animationStart: function() {},
                animationEnd: endCallBack
            });
        }
    }
});