//For iphone

//#ifdef iphone
var initiPhoneTransitions = function(){
	try{
	
		var horizontalMoveInMoveOutDuration = 0.4; // in seconds
		var verticalMoveInMoveOutDuration = 0.5; // in seconds
	
		flowTransitions = {
			"#DEFINED":true,
			"DEFAULT_FORWARD_TRANSITION":{
				"out": {
							"transitionDirection": "none", 
							"transitionEffect": "transitionPush",
							 "transitionDuration":0.5,
							 "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT 
						},
		         "in": {
		         			"transitionDirection": "fromRight", 
		         			"transitionEffect": "transitionPush", 
		         			"transitionDuration":0.5, 
		         			"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT 
		         		}
			},
			"DEFAULT_BACKWARD_TRANSITION" : {
				"out":{
						"transitionDuration":0.5,
						"transitionDirection": "none",
						"transitionEffect": "transitionPush",
						"transitionCurve":constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect": "transitionPush",
					"transitionCurve":constants.TRANSITION_CURVE_EASEINOUT
				}
			},
			"POPUP_DEFAULT_TRANSITION":{
				"out":{"transitionDuration": verticalMoveInMoveOutDuration, "transitionDirection": "fromBottom", "transitionEffect": "transitionPush", "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT },
				"in":{ "transitionDuration": verticalMoveInMoveOutDuration, "transitionDirection": "fromBottom", "transitionEffect": "transitionPush", "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT }
			},
			"frmFirstLoginVA":{
				"in":{ "transitionDuration": horizontalMoveInMoveOutDuration, "transitionDirection": "fromLeft", "transitionEffect": "transitionFade", "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT }
			},
			"btnCompleteKA":{            	
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "none",
					"transitionEffect":"transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromBottom",
					"transitionEffect": "transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}				 
            },
			"btnLoginVA":{
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
			"btnAddVA":{
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
			"btnBack":{
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
			"btnCros":{
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
			"frmStartUpVA":{
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
				"vbxInfoVA":{
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
				}
			},
			
			"frmAppInfoVA":{
				"segAppInfoVA":{
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
				}
			},
			"InfoToLogin":{
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
			
			"segAssetListVA":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect":"transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect": "transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"List1ToList2":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect":"transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect": "transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"List2ToList1":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect":"transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect": "transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"ListToDetail":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect":"transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect": "transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"DetailToList":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect":"transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect": "transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"DetailToTask":{
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
			"TaskToDetail":{
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
			"SegAppMenuVA":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect":"transitionMoveOut",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect": "transitionMoveInCustom",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"Step1ToStep2":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect":"transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect": "transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
			"Step2ToStep1":{
				"out":{
					"transitionDuration":0.5,
					"transitionDirection": "fromRight",
					"transitionEffect":"transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				},
				"in":{
					"transitionDuration":0.5,
					"transitionDirection": "fromLeft",
					"transitionEffect": "transitionPush",
					"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
				}        
			},
						
			"ListOfAssets":{
				"out":{"transitionDirection": "fromRight", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT},
				"in":{"transitionDirection": "fromLeft", "transitionEffect": "transitionFade", "transitionDuration": horizontalMoveInMoveOutDuration, "transitionCurve": constants.TRANSITION_CURVE_EASEINOUT}
			},
			"btnLogoutKA" : {
				"out":{
						"transitionDirection": "none",
						"transitionEffect": "none", 
						"transitionDuration":0.5,
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					},
				"in":{
						"transitionDirection": "fromRight", 
						"transitionEffect": "transitionFlip", 
						"transitionDuration":0.5,
						"transitionCurve": constants.TRANSITION_CURVE_EASEINOUT
					}
			}	
		}
		
		return flowTransitions;
		
	} catch(exception) {
		kony.print("Exception in initiPhoneTransitions:" + JSON.stringify(exception));
	}
}
//#endif
