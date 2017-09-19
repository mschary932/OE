function animateInitScreen() {
    if(!kony.servicesapp.HASANIMATEDSPLASHSCREEN){
        frmFSLoginKA["lblSloganKA"].animate(
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
                frmFSLoginKA["imgLogoKA"].animate(
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
                            frmFSLoginKA["imgLogoKA"].animate(
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
                                        frmFSLoginKA["lblPoweredByKA"].animate(
                                            kony.ui.createAnimation({
                                                "100": {
                                                    "opacity": kony.servicesapp.ANIMATION_OPICITY_ONE,
                                                  	"width" : kony.servicesapp.ANIMATION_LBLPOWEREDBYKA_WIDTH,
                                                    "stepConfig": {
                                                    }
                                                }
                                            }), {
                                                "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                                "duration": kony.servicesapp.ANIMATION_DURATION_ZERO_DECIMAL_FIVE 
                                            }, {
                                                "animationEnd": function() {
                                                    frmFSLoginKA["lblPoweredByKA"].isVisible = true;
                                                    frmFSLoginKA["flxVersionKA"].top = kony.servicesapp.ANIMATION_FLXVERSIONKA_TOP;
                                                }
                                            });
                                    }
                                });
                            frmFSLoginKA["btnManualSetupKA"].animate(
                                kony.ui.createAnimation({
                                    "100": {
                                        "top": kony.servicesapp.ANIMATION_BTNMANUALSETUP_TOP_STARTING,
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "50": {
                                        "top": kony.servicesapp.ANIMATION_BTNMANUALSETUP_TOP_ENDING,
                                        "stepConfig": {
                                            "timingFunction": kony.anim.LINEAR
                                        }
                                    }
                                }), {
                                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                    "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                }, {
                                    "animationEnd": function() {
                                    }
                                });                                        
                            frmFSLoginKA["lblOptionKA"].animate(
                                kony.ui.createAnimation({
                                    "100": {
                                        "top": kony.servicesapp.ANIMATION_LBLOPTION_TOP_STARTING,
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "50": {
                                        "top": kony.servicesapp.ANIMATION_LBLOPTION_TOP_ENDING,
                                        "stepConfig": {
                                            "timingFunction": kony.anim.LINEAR
                                        }
                                    }
                                }), {
                                    "delay": kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_ONE,
                                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                    "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                }, {
                                    "animationEnd": function() {

                                    }
                                });
                          		frmFSLoginKA["flxInnerFlxKA"].animate(
                                kony.ui.createAnimation({
                                    "100": {
                                        "top": kony.servicesapp.ANIMATION_FLXINNER_TOP_STARTING,
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "50": {
                                        "top": kony.servicesapp.ANIMATION_FLXINNER_TOP_ENDING,
                                        "stepConfig": {
                                            "timingFunction": kony.anim.LINEAR
                                        }
                                    }
                                }), {
                                    "delay": kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_TWO,
                                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                    "duration": kony.servicesapp.ANIMATION_DURATION_ONE
                                }, {
                                    "animationEnd": function() {
										kony.servicesapp.HASANIMATEDSPLASHSCREEN = true;
                                        kony.servicesapp.HASANIMATEDLOGINSCREEN = true;
                                    }
                                });
                        }
                    });
            }
        });
    }else{
    	frmFSLoginKA["imgLogoKA"].centerY = kony.servicesapp.ANIMATION_IMGLOGOKA_CENTERY;
		frmFSLoginKA["imgLogoKA"].width = kony.servicesapp.ANIMATION_IMGLOGOKA_WIDTH;
		frmFSLoginKA["imgLogoKA"].height = kony.servicesapp.ANIMATION_IMGLOGOKA_HEIGHT;
		frmFSLoginKA["imgLogoKA"].left = kony.servicesapp.ANIMATION_IMGLOGOKA_LEFT;
		frmFSLoginKA["imgLogoKA"].centerX = null;
		frmFSLoginKA["lblPoweredByKA"].opacity = kony.servicesapp.ANIMATION_OPICITY_ONE;
		frmFSLoginKA["lblPoweredByKA"].width = kony.servicesapp.ANIMATION_LBLPOWEREDBYKA_WIDTH;
		frmFSLoginKA["btnManualSetupKA"].top = kony.servicesapp.ANIMATION_BTNMANUALSETUP_TOP_STARTING;
		frmFSLoginKA["lblOptionKA"].top = kony.servicesapp.ANIMATION_LBLOPTION_TOP_STARTING;
      	frmFSLoginKA["flxInnerFlxKA"].top = kony.servicesapp.ANIMATION_FLXINNER_TOP_STARTING;
      	frmFSLoginKA["flxInnerFlxKA"].height = kony.servicesapp.ANIMATION_FLXINNERKA_HEIGHT;
		frmFSLoginKA["lblTitleKA"].top = kony.servicesapp.ANIMATION_LBLTITLE_TOP;
		frmFSLoginKA["lblSloganKA"].setVisibility(false);
      	frmFSLoginKA["flxVersionKA"].top = kony.servicesapp.ANIMATION_FLXVERSIONKA_TOP;
    }
}