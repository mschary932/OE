function animateLoginScreen() {
	LocalAuthController.preShow();//Uncomment this line to enable local auth feature..
    if (!kony.servicesapp.HASANIMATEDLOGINSCREEN) {
        frmLoginKA["lblSloganKA"].animate(
            kony.ui.createAnimation({
                "100": {
                    "opacity": kony.servicesapp.ANIMATION_OPICITY_ZERO,
                    "stepConfig": {
                        "timingFunction": kony.anim.EASIN_OUT
                    }
                },
                "0": {
                    "opacity": kony.servicesapp.ANIMATION_OPICITY_ONE,
                    "stepConfig": {
                        "timingFunction": kony.anim.EASIN_OUT
                    }
                }
            }), {
                "delay": kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_NINE,
                "fillMode": kony.anim.FILL_MODE_FORWARDS,
                "duration": kony.servicesapp.ANIMATION_DURATION_ONE
            }, {
                "animationEnd": function() {
                    kony.sdk.mvvm.log.info("DG: --- starting 2nd animation");
                    frmLoginKA["imgLogoKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "centerY": kony.servicesapp.ANIMATION_IMGLOGOKA_CENTERY,
                                "width": kony.servicesapp.ANIMATION_IMGLOGOKA_WIDTH,
                                "height": kony.servicesapp.ANIMATION_IMGLOGOKA_HEIGHT,
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            }
                        }), {
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": kony.servicesapp.ANIMATION_DURATION_ONE_DECIMAL_TWO
                        }, {
                            "animationEnd": function() {
                                frmLoginKA["imgLogoKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "centerX": null,
                                            "left": kony.servicesapp.ANIMATION_IMGLOGOKA_LEFT,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": kony.servicesapp.ANIMATION_DURATION_ZERO_DECIMAL_FIVE 
                                    }, {
                                        "animationEnd": function() {
                                            frmLoginKA["lblPoweredByKA"].animate(
                                                kony.ui.createAnimation({
                                                    "100": {
                                                        "opacity": kony.servicesapp.ANIMATION_OPICITY_ONE,
                                                        "width": kony.servicesapp.ANIMATION_LBLPOWEREDBYKA_WIDTH,
                                                        "stepConfig": {
                                                        }
                                                    }
                                                }), {
                                                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                                    "duration": kony.servicesapp.ANIMATION_DURATION_ZERO_DECIMAL_FIVE 
                                                }, {
                                                    "animationEnd": function() {
                                                        frmLoginKA["lblPoweredByKA"].isVisible = true
                                                        frmLoginKA["flxVersionKA"].top = kony.servicesapp.ANIMATION_FLXVERSIONKA_TOP;
                                                    }
                                                });
                                        }
                                    });
                              	frmLoginKA["flxInnerKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                          	"opacity":kony.servicesapp.ANIMATION_OPICITY_ONE,
											"top": kony.servicesapp.ANIMATION_FLXINNERKA_TOP_STARTING,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN
                                            }
                                        },                                        
                                      	"50": {
                                          	"opacity":kony.servicesapp.ANIMATION_OPICITY_ZERO_DECIMAL_FIVE,
											"top": kony.servicesapp.ANIMATION_FLXINNERKA_TOP_ENDING,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN
                                            }
                                        }
                                    }), {
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                    }, {
                                        "animationEnd": function() {
											
                                        }
                                    });
                                frmLoginKA["flxTouchDKA"].animate(                                  	
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": kony.servicesapp.ANIMATION_FLXTOUCHID_TOP_STARTING,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": kony.servicesapp.ANIMATION_FLXTOUCHID_TOP_ENDING,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        }
                                    }), {
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                    }, {
                                        "animationEnd": function() {											
                                          	//frmLoginKA["flxTouchDKA"].isVisible=true;
                                        }
                                    });                                
                                frmLoginKA["flxSwitchKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                          	"opacity":kony.servicesapp.ANIMATION_OPICITY_ONE,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN
                                            }
                                        }
                                    }), {
                                      	"delay": kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_NINE,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                    }, {
                                        "animationEnd": function() {
											frmLoginKA["flxSwitchKA"].isVisible=true;
                                        }
                                    });
								frmLoginKA["btnLoginKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                          	"top":kony.servicesapp.ANIMATION_BTNLOGINKA_TOP,
                                          	"opacity":kony.servicesapp.ANIMATION_OPICITY_ONE,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN
                                            }
                                        },
                                        "50": {
                                          	"opacity":kony.servicesapp.ANIMATION_OPICITY_ZERO_DECIMAL_FIVE,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN
                                            }
                                        }
                                    }), {
                                      	"delay": kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_ONE,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                    }, {
                                        "animationEnd": function() {
											frmLoginKA["btnLoginKA"].setVisibility(true);
                                        }
                                    });
                                frmLoginKA["tbxPasswordKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                          	"top":kony.servicesapp.ANIMATION_TBXPASSWORD_TOP,
                                          	"opacity":kony.servicesapp.ANIMATION_OPICITY_ONE,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN
                                            }
                                        },
                                        "50": {
                                          	"opacity":kony.servicesapp.ANIMATION_OPICITY_ZERO_DECIMAL_FIVE,
                                            "stepConfig": {
                                                "timingFunction":kony.anim.EASIN_IN
                                            }
                                        }
                                    }), {
                                        "delay":kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_TWO,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                    }, {
                                        "animationEnd": function() {
											frmLoginKA["tbxPasswordKA"].isVisible = true;
                                        }
                                    });
                                frmLoginKA["tbxUserIDKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": kony.servicesapp.ANIMATION_TBXUSERID_TOP_STARTING,
                                          	"opacity":kony.servicesapp.ANIMATION_OPICITY_ONE,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": kony.servicesapp.ANIMATION_TBXUSERID_TOP_ENDING,
                                          	"opacity":kony.servicesapp.ANIMATION_OPICITY_ZERO_DECIMAL_FIVE,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        }
                                    }), {
                                        "delay": kony.servicesapp.ANIMATION_OPICITY_ZERO_DECIMAL_FIVE,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                    }, {
                                        "animationEnd": function() {
											frmLoginKA["tbxUserIDKA"].isVisible = true;
                                        }
                                    });
                              	frmLoginKA["flxReConnectKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": kony.servicesapp.ANIMATION_FLXRECONNECT_TOP_STARTING,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": kony.servicesapp.ANIMATION_FLXRECONNECT_TOP_ENDING ,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        }
                                    }), {
                                      	"delay": kony.servicesapp.ANIMATION_DELAY_ONE,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                    }, {
                                        "animationEnd": function() {

                                        }
                                    });
                                frmLoginKA["lblTitleKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": kony.servicesapp.ANIMATION_LBLTITLEKA_TOP_STARTING,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": kony.servicesapp.ANIMATION_LBLTITLEKA_TOP_ENDING,
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        }
                                    }), {
                                        "delay": kony.servicesapp.ANIMATION_DELAY_ONE,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                    }, {
                                        "animationEnd": function() {
                                            kony.servicesapp.HASANIMATEDLOGINSCREEN = true;
                                            kony.servicesapp.HASANIMATEDSPLASHSCREEN = true;
                                            LocalAuthController.preShow();//Uncomment this line to enable local auth feature..
											if(kony.store.getItem("isTouchIDEnabled")){
												LocalAuthController.authenicateTouchId();		
											}
                                        }
                                    });
                            }
                        });
                }
            });
    } else {
      	frmLoginKA["flxInnerKA"].top = kony.servicesapp.ANIMATION_FLXINNERKA_TOP_STARTING ;
      	frmLoginKA["flxInnerKA"].height = kony.servicesapp.ANIMATION_FLXINNERKA_HEIGHT;
        frmLoginKA["lblSloganKA"].setVisibility(false);
      	frmLoginKA["tbxUserIDKA"].width = kony.servicesapp.ANIMATION_TBXUSERID_WIDTH;
      	frmLoginKA["flxSwitchKA"].width = kony.servicesapp.ANIMATION_FLXSWITCHKA_WIDTH;
      	frmLoginKA["btnLoginKA"].width = kony.servicesapp.ANIMATION_BTNLOGINKA_WIDTH ;
		frmLoginKA["imgLogoKA"].centerY = kony.servicesapp.ANIMATION_IMGLOGOKA_CENTERY;
		frmLoginKA["imgLogoKA"].width = kony.servicesapp.ANIMATION_IMGLOGOKA_WIDTH;
		frmLoginKA["imgLogoKA"].height = kony.servicesapp.ANIMATION_IMGLOGOKA_HEIGHT;
		frmLoginKA["imgLogoKA"].left = kony.servicesapp.ANIMATION_IMGLOGOKA_LEFT;
		frmLoginKA["imgLogoKA"].centerX = null;
		frmLoginKA["lblPoweredByKA"].opacity = kony.servicesapp.ANIMATION_OPICITY_ONE;
		frmLoginKA["lblPoweredByKA"].width = kony.servicesapp.ANIMATION_LBLPOWEREDBYKA_WIDTH;
		frmLoginKA["lblTitleKA"].top = kony.servicesapp.ANIMATION_LBLTITLEKA_TOP_STARTING;
		frmLoginKA["tbxUserIDKA"].top = kony.servicesapp.ANIMATION_TBXUSERID_TOP_STARTING;
		frmLoginKA["tbxPasswordKA"].top = kony.servicesapp.ANIMATION_TBXPASSWORD_TOP;
		frmLoginKA["flxSwitchKA"].top = kony.servicesapp.ANIMATION_FLXSWITCHKA_TOP;
		frmLoginKA["btnLoginKA"].top = kony.servicesapp.ANIMATION_BTNLOGINKA_TOP;
		frmLoginKA["flxTouchDKA"].top = kony.servicesapp.ANIMATION_FLXTOUCHID_TOP_STARTING;
		frmLoginKA["flxReConnectKA"].top = kony.servicesapp.ANIMATION_FLXRECONNECT_TOP_STARTING;
		frmLoginKA["flxVersionKA"].top = kony.servicesapp.ANIMATION_FLXVERSIONKA_TOP;
      	frmLoginKA["flxInnerKA"].opacity=kony.servicesapp.ANIMATION_OPICITY_ONE;
      	frmLoginKA["flxSwitchKA"].opacity = kony.servicesapp.ANIMATION_OPICITY_ONE;
      	frmLoginKA.tbxUserIDKA.opacity=kony.servicesapp.ANIMATION_OPICITY_ONE;
        frmLoginKA.tbxPasswordKA.opacity=kony.servicesapp.ANIMATION_OPICITY_ONE;
        frmLoginKA.btnLoginKA.opacity=kony.servicesapp.ANIMATION_OPICITY_ONE;      	
    }
}