var hasAnimatedLoginScreen = false;

function animateLoginScreen() {
    LocalAuthController.preShow(); //Uncomment this line to enable local auth feature..
    if (!hasAnimatedLoginScreen) {
        frmLoginKA["lblSloganKA"].animate(
        kony.ui.createAnimation({
            "100": {
                "opacity": 0,
                "stepConfig": {
                    "timingFunction": kony.anim.EASIN_OUT
                }
            },
            "0": {
                "opacity": 1,
                "stepConfig": {
                    "timingFunction": kony.anim.EASIN_OUT
                }
            }
        }), {
            "delay": 0.9,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": function() {
                kony.print("DG: --- starting 2nd animation");
                //frmLoginKA["lblSloganKA"].isVisible = "false";
                frmLoginKA["imgLogoKA"].animate(
                kony.ui.createAnimation({
                    "100": {
                        "centerY": "93%",
                        "width": "65dp",
                        "height": "20dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASIN_IN_OUT
                        }
                    }
                }), {
                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                    "duration": 1.2
                }, {
                    "animationEnd": function() {
                        frmLoginKA["imgLogoKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "centerX": null,
                                "left": "54%",
                                "stepConfig": {
                                    "timingFunction": kony.anim.LINEAR
                                }
                            }
                        }), {
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": 0.5
                        }, {
                            "animationEnd": function() {
                                frmLoginKA["lblPoweredByKA"].animate(
                                kony.ui.createAnimation({
                                    "100": {
                                        "opacity": 1,
                                        "width": "90dp",
                                        "stepConfig": {}
                                    }
                                }), {
                                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                    "duration": 0.5
                                }, {
                                    "animationEnd": function() {
                                        frmLoginKA["lblPoweredByKA"].isVisible = true
                                        frmLoginKA["lblVersionNumberKA"].top = "95%";
                                    }
                                });
                            }
                        });
                        frmLoginKA["flxReConnectKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "374dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "404dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.LINEAR
                                }
                            }
                        }), {
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": 1
                        }, {
                            "animationEnd": function() {}
                        });
                        frmLoginKA["flxTouchDKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "78%",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "474dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.LINEAR
                                }
                            }
                        }), {
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": 1
                        }, {
                            "animationEnd": function() {}
                        });
                        frmLoginKA["btnLoginKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "306dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "336dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.LINEAR
                                }
                            }
                        }), {
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": 1
                        }, {
                            "animationEnd": function() {}
                        });
                        frmLoginKA["flxSwitchKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "251dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "281dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.LINEAR
                                }
                            }
                        }), {
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": 1
                        }, {
                            "animationEnd": function() {}
                        });
                        frmLoginKA["tbxPasswordKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "183dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "213dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.LINEAR
                                }
                            }
                        }), {
                            "delay": 0.1,
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": 1
                        }, {
                            "animationEnd": function() {}
                        });
                        frmLoginKA["tbxUserIDKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "136dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "166dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.LINEAR
                                }
                            }
                        }), {
                            "delay": 0.2,
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": 1
                        }, {
                            "animationEnd": function() {}
                        });
                        frmLoginKA["lblTitleKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "81dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "111dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.LINEAR
                                }
                            }
                        }), {
                            "delay": 0.3,
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": 1
                        }, {
                            "animationEnd": function() {
                                hasAnimatedLoginScreen = true;
                                hasAnimatedSplashScreen = true;
                                LocalAuthController.preShow(); //Uncomment this line to enable local auth feature..
                                if (kony.store.getItem("isTouchIDEnabled")) {
                                    LocalAuthController.authenicateTouchId();
                                }
                            }
                        });
                    }
                });
            }
        });
    } else {
        frmLoginKA["lblSloganKA"].setVisibility(false);
        frmLoginKA["imgLogoKA"].centerY = "93%";
        frmLoginKA["imgLogoKA"].width = "65dp";
        frmLoginKA["imgLogoKA"].height = "20dp";
        frmLoginKA["imgLogoKA"].left = "54%";
        frmLoginKA["imgLogoKA"].centerX = null;
        frmLoginKA["lblPoweredByKA"].opacity = 1;
        frmLoginKA["lblPoweredByKA"].width = "90dp";
        frmLoginKA["lblTitleKA"].top = "81dp";
        frmLoginKA["tbxUserIDKA"].top = "136dp";
        frmLoginKA["tbxPasswordKA"].top = "183dp";
        frmLoginKA["flxSwitchKA"].top = "251dp";
        frmLoginKA["btnLoginKA"].top = "306dp";
        frmLoginKA["flxTouchDKA"].top = "78%";
        frmLoginKA["flxReConnectKA"].top = "374dp";
        frmLoginKA["lblVersionNumberKA"].top = "95%";
    }
}