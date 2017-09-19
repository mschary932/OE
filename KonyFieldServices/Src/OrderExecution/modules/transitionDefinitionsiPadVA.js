//For ipad

//#ifdef ipad
var initiPadTransitions = function(){
	try{
	
		var horizontalMoveInMoveOutDuration = 0.5; // in seconds
		var verticalMoveInMoveOutDuration = 0.4; // in seconds
	
		flowTransitions = {
			"#DEFINED":true,
			"DEFAULT_FORWARD_TRANSITION":{
				"out": {"transitionDirection": "none", "transitionEffect": "none", "transitionDuration": horizontalMoveInMoveOutDuration,"transitionCurve":constants.TRANSITION_CURVE_EASEINOUT },
		         "in": {"transitionDirection": "none", "transitionEffect": "none", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve":constants.TRANSITION_CURVE_EASEINOUT }
			},
			"DEFAULT_BACKWARD_TRANSITION" : {
				"out":{"transitionDuration":horizontalMoveInMoveOutDuration,"transitionDirection": "none","transitionEffect": "none","transitionCurve":constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDuration":horizontalMoveInMoveOutDuration,"transitionDirection": "none","transitionEffect": "none","transitionCurve":constants.TRANSITION_CURVE_EASEINOUT}
			},
			"POPUP_DEFAULT_TRANSITION":{
				"out":{"transitionDuration": verticalMoveInMoveOutDuration, "transitionDirection": "fromBottom", "transitionEffect": "transitionMoveOut", "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT },
				"in":{ "transitionDuration": verticalMoveInMoveOutDuration, "transitionDirection": "fromBottom", "transitionEffect": "transitionMoveInCustom", "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT }
			},
			
			"frmFirstLoginVA":{
				"in":{ "transitionDuration": horizontalMoveInMoveOutDuration, "transitionDirection": "fromLeft", "transitionEffect": "transitionFade", "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT }
			},
			
			"btnAppInfoVA":{
					"out":{
						"transitionDuration":0.5,
						"transitionDirection": "fromRight",
						"transitionEffect":"transitionFlip",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					},
					"in":{
						"transitionDuration":0.5,
						"transitionDirection": "fromRight",
						"transitionEffect": "transitionFlip",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					}        
			},
			"InfoToLogin":{
					"out":{
						"transitionDuration":0.5,
						"transitionDirection": "fromLeft",
						"transitionEffect":"transitionFlip",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					},
					"in":{
						"transitionDuration":0.5,
						"transitionDirection": "fromLeft",
						"transitionEffect": "transitionFlip",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					}        
			},
			"btnAddVA":{
					"out":{
						"transitionDuration":0.5,
						"transitionDirection": "fromTop",
						"transitionEffect":"transitionMoveIn",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					},
					"in":{
						"transitionDuration":0.5,
						"transitionDirection": "fromBottom",
						"transitionEffect": "transitionMoveIn",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					}        
			},
			"InspectionToAsset":{
					"out":{
						"transitionDuration":0.5,
						"transitionDirection": "fromLeft",
						"transitionEffect":"transitionFade",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					},
					"in":{
						"transitionDuration":0.5,
						"transitionDirection": "fromLeft",
						"transitionEffect": "transitionFade",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					}        
			},
			"AssetToInspection":{
					"out":{
						"transitionDuration":0.5,
						"transitionDirection": "fromLeft",
						"transitionEffect":"transitionFade",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					},
					"in":{
						"transitionDuration":0.5,
						"transitionDirection": "fromLeft",
						"transitionEffect": "transitionFade",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					}        
			},
			"frmLoginVA":{
				"btnResetPassVA":{
					"out":{
						"transitionDuration":0.5,
						"transitionDirection": "fromRight",
						"transitionEffect":"transitionFlip",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					},
					"in":{
						"transitionDuration":0.5,
						"transitionDirection": "fromRight",
						"transitionEffect": "transitionFlip",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					}        
				}
			},
			"ViewChange":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect":"transitionFlip",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect": "transitionFlip",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"DetailToTask":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromTop",
					"transitionEffect":"transitionMoveIn",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromBottom",
					"transitionEffect": "transitionMoveIn",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"TaskToDetail":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromBottom",
					"transitionEffect":"transitionMoveIn",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromTop",
					"transitionEffect": "transitionMoveIn",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"ListToAdd":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromTop",
					"transitionEffect":"transitionMoveOut",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromBottom",
					"transitionEffect": "transitionMoveInCustom",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"AddToList":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromBottom",
					"transitionEffect":"transitionMoveOut",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromTop",
					"transitionEffect": "transitionMoveInCustom",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"ToEdit":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromTop",
					"transitionEffect":"transitionMoveOut",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromBottom",
					"transitionEffect": "transitionMoveInCustom",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"FromEdit":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromBottom",
					"transitionEffect":"transitionMoveOut",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromTop",
					"transitionEffect": "transitionMoveInCustom",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"ListToDetail":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect":"transitionMoveOut",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect": "transitionMoveInCustom",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"DetailToList":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect":"transitionMoveOut",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect": "transitionMoveIn",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"InFormVisibilityChange":{
					"out":{
						"transitionDuration":0.5,
						"transitionDirection": "fromLeft",
						"transitionEffect":"transitionFade",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					},
					"in":{
						"transitionDuration":0.5,
						"transitionDirection": "fromLeft",
						"transitionEffect": "transitionFade",
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					}        
			},			
			"ListOfAssets":{
				"out":{"transitionDirection": "fromRight", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromLeft", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			},
			"PopoverFade":{
				"out":{"transitionDirection": "fromRight", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromLeft", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			},
			"btnHeaderLoginVA":{
				"out":{"transitionDirection": "fromLeft", "transitionEffect": "transitionFlip", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromLeft", "transitionEffect": "transitionFlip", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			},
			"btnBackNew":{
				"out":{"transitionDirection": "fromRight", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromRight", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			},
			"SegInfoVA":{
				"out":{"transitionDirection": "fromRight", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromRight", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			},
			
			"btnLogOut":{
				"out":{"transitionDirection": "fromRight", "transitionEffect": "transitionMoveOut", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromRight", "transitionEffect": "transitionMoveInCustom", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			},
			"btnMenuVA":{
				"out":{"transitionDirection": "fromRight", "transitionEffect": "transitionMoveOut", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromRight", "transitionEffect": "transitionMoveInCustom", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			},
			"SegAppMenuVA":{
				"out":{"transitionDirection": "fromRight", "transitionEffect": "transitionMoveOut", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromRight", "transitionEffect": "transitionMoveInCustom", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			},
			"btnLogoutVA" : {
				"out":{"transitionDirection": "fromLeft", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromRight", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			}	
		}
		
		return flowTransitions;
		
	} catch(exception) {
		kony.print("Exception in initiPhoneTransitions:" + JSON.stringify(exception));
	}
}
//#endif
