//Type your code here
var hasAnimatedSplashScreen = false;

function animateInitScreen() {
    if (!hasAnimatedSplashScreen) {
        frmFSLoginKA["lblSloganKA"].animate(
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
                //frmFSLoginKA["lblSloganKA"].isVisible = "false";
                frmFSLoginKA["imgLogoKA"].animate(
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
                        frmFSLoginKA["imgLogoKA"].animate(
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
                                frmFSLoginKA["lblPoweredByKA"].animate(
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
                                        frmFSLoginKA["lblPoweredByKA"].isVisible = true
                                    }
                                });
                            }
                        });
                        frmFSLoginKA["btnManualSetupKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "396dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "426dp",
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
                        frmFSLoginKA["lblOptionKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "361dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "391dp",
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
                        frmFSLoginKA["flxQRCodeKA"].animate(
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
                        frmFSLoginKA["lblTitleKA"].animate(
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
                                hasAnimatedSplashScreen = true;
                                hasAnimatedLoginScreen = true;
                            }
                        });
                    }
                });
            }
        });
    } else {
        frmFSLoginKA["imgLogoKA"].centerY = "93%";
        frmFSLoginKA["imgLogoKA"].width = "65dp";
        frmFSLoginKA["imgLogoKA"].height = "20dp";
        frmFSLoginKA["imgLogoKA"].left = "54%";
        frmFSLoginKA["imgLogoKA"].centerX = null;
        frmFSLoginKA["lblPoweredByKA"].opacity = 1;
        frmFSLoginKA["lblPoweredByKA"].width = "90dp";
        frmFSLoginKA["btnManualSetupKA"].top = "396dp";
        frmFSLoginKA["lblOptionKA"].top = "361dp";
        frmFSLoginKA["flxQRCodeKA"].top = "136dp";
        frmFSLoginKA["lblTitleKA"].top = "81dp";
        frmFSLoginKA["lblSloganKA"].setVisibility(false);
    }
}