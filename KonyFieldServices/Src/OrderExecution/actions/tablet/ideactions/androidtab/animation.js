//Type your code here
var hasAnimatedSplashScreen = false;

function animateSplashScreen() {
    if (!hasAnimatedSplashScreen) {
        frmTenantKA["lblSloganKA"].animate(
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
                //frmTenantKA["lblSloganKA"].isVisible = "false";
                frmTenantKA["imgLogoKA"].animate(
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
                        frmTenantKA["imgLogoKA"].animate(
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
                                frmTenantKA["lblPoweredByKA"].animate(
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
                                        frmTenantKA["lblPoweredByKA"].isVisible = true
                                    }
                                });
                            }
                        });
                        frmTenantKA["btnConnectKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "top": "246dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            },
                            "50": {
                                "top": "276dp",
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
                        frmTenantKA["tbxCRMTenantURLKA"].animate(
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
                        frmTenantKA["tbxCRMTenantNameKA"].animate(
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
                        frmTenantKA["lblTitleKA"].animate(
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
                            }
                        });
                    }
                });
            }
        });
    }
}