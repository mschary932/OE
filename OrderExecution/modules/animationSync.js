var lblSyncBarKA = new kony.ui.Label({
    "id": "lblSyncBarKA",
    "top": "75%",
    "left": "0%",
    "width": "100%",
    "height": "25%",
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
var lblSyncPathBarKA = new kony.ui.Label({
    "id": "lblSyncPathBarKA",
    "top": "75%",
    "bottom": "0%",
    "width": "100%",
    "height": "25%",
    "centerX": "50%",
    "zIndex": 25,
    "isVisible": true,
    "text": " ",
    "skin": "sknLblSyncPathBarKA"
}, {
    "padding": [0, 0, 0, 0],
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "marginInPixel": false,
    "paddingInPixel": false,
    "containerWeight": 0
}, {
    "textCopyable": false
});
var lblSync = new kony.ui.Label({
    "id": "lblSync",
    "top": "-4%",
    "bottom": "0%",
    "width": "100%",
    "height": "65%",
    "centerX": "50%",
    "zIndex": 25,
    "isVisible": true,
    "text": "",
    "skin": "sknLblFFFFFFCN17KA"
}, {
    "padding": [0, 0, 0, 0],
    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
    "marginInPixel": false,
    "paddingInPixel": false,
    "containerWeight": 0
}, {
    "textCopyable": false
});
var flxHorizontalAnimationaKA = new kony.ui.FlexContainer({
    "id": "flxHorizontalAnimationaKA",
    "top": "4.8%",
    "left": "0%",
    "width": "100%",
    "height": "2.2%",
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
flxHorizontalAnimationaKA.add(lblSync);
flxHorizontalAnimationaKA.add(lblSyncPathBarKA);
flxHorizontalAnimationaKA.add(lblSyncBarKA);
kony.servicesapp.startSyncAnimation = function(startPoint,endPoint,duration){
	try {
		kony.sdk.mvvm.log.info("==kony.servicesapp.startSyncAnimation==>");
        var utilitiesObj = utilities.getUtilityObj();
      	var currentForm = kony.application.getCurrentForm();
        if(currentForm && currentForm.flxHorizontalAnimationaKA){
			currentForm.remove(flxHorizontalAnimationaKA);
		}
        if(kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id] && kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id]["processBar"]){
			if (!currentForm.flxHorizontalAnimationaKA){
				flxHorizontalAnimationaKA.lblSyncBarKA.skin = "sknLblSyncBarKA";
				flxHorizontalAnimationaKA.lblSyncBarKA.width = "5%";
           		currentForm.addAt(flxHorizontalAnimationaKA, 100);
              	currentForm.lblSync.text = utilitiesObj.geti18nValueKA("i18n.common.sync.syncingKA");//Syncing
				if(kony.servicesapp.FORMSONHIDEUPDATED.indexOf(currentForm.id) == -1){
					kony.servicesapp.FORMSONHIDEUPDATED.push(currentForm.id);
					var tempOnHide = currentForm.onHide;
					currentForm.onHide = function(){
						if(tempOnHide && typeof(tempOnHide) == "function"){
							tempOnHide();
						}			
						if(currentForm.flxHorizontalAnimationaKA){
							currentForm.remove(flxHorizontalAnimationaKA);
						}
					}
				}				
        	}
		}        	
        if(!kony.servicesapp.PREVIOUSFORM)
        	kony.servicesapp.PREVIOUSFORM = currentForm;
        kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
		if(currentForm.lblSyncBarKA){
			currentForm.lblSyncBarKA.animate(kony.servicesapp.animationDefinition(startPoint,endPoint), kony.servicesapp.animationConfig(duration), {
				animationEnd: startAnimationCallBack
			});
		}        
        function startAnimationCallBack() {
        	kony.servicesapp.BACKGROUNDSYNCINPROGRESS = true;
        	kony.servicesapp.SYNCSTARTPOINT = kony.servicesapp.SYNCENDPOINT;
        }
	} catch (error) {
        kony.sdk.mvvm.log.error("==kony.servicesapp.startSyncAnimation==>" + error);
    }
}
kony.servicesapp.endAnimation = function(startPoint,endPoint,duration,message, refreshSyncCallBack){
	try {
		kony.sdk.mvvm.log.info("==kony.servicesapp.endAnimation==>");
        var currentForm = kony.application.getCurrentForm();
        if(kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id] && kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id]["processBar"]){
			if (!currentForm.flxHorizontalAnimationaKA){
           		currentForm.addAt(flxHorizontalAnimationaKA, 100);
        	}
		}        	
        kony.servicesapp.PREVIOUSFORM = currentForm;
		if(currentForm.lblSyncBarKA){
			currentForm.lblSyncBarKA.animate(kony.servicesapp.animationDefinition(startPoint,endPoint), kony.servicesapp.animationConfig(duration),{
				animationEnd: stopAnimationCallBack
			});
		}        
        function stopAnimationCallBack() {
          	kony.sdk.mvvm.log.info("==stopAnimationCallBack==>");
          	var utilitiesObj = utilities.getUtilityObj();
        	var currentForm = kony.application.getCurrentForm();
            var previousForm =  kony.servicesapp.PREVIOUSFORM;
            kony.servicesapp.BACKGROUNDSYNCINPROGRESS = false;
            kony.servicesapp.SYNCSTARTPOINT = 0;
			kony.servicesapp.SYNCENDPOINT = 0;          
            if(kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id] && kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id]["processBar"]){
        		if (!currentForm.flxHorizontalAnimationaKA){
					kony.servicesapp.PREVIOUSFORM = currentForm;
           			currentForm.addAt(flxHorizontalAnimationaKA, 100);
                }
             	currentForm.lblSync.text = message;
              	if(message == utilitiesObj.geti18nValueKA("i18n.common.sync.syncFailedKA")){					
                	currentForm.lblSyncBarKA.skin = "sknLblSyncFailBarKA";
              	}else{
                	currentForm.lblSyncBarKA.skin = "sknLblSyncBarKA";
              	}
              	try{
                	kony.timer.schedule("syncMsgTimer", syncMessageCallBack, 3, false);
              	}catch(e){
					kony.sdk.mvvm.log.info("==syncMsgTimer Timer Error==>");
              	}        		
        	}else{
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
                "duration": 3,
                "iterationCount": 1,
                "delay": 0,
                "fillMode": kony.anim.FILL_MODE_FORWARDS
            };
            return showSyncMessageConfig;

        }
        function syncMessageCallBack() {
            kony.sdk.mvvm.log.info("==syncMessageCallBack==>resetPage: "+kony.servicesapp.SYNCSTARTPOINT+", "+kony.servicesapp.SYNCENDPOINT);
            var currentForm = kony.application.getCurrentForm();  
            var previousForm =  kony.servicesapp.PREVIOUSFORM;
            if (currentForm && currentForm.flxHorizontalAnimationaKA){
              	currentForm.lblSyncBarKA.width = "0%";
            	currentForm.remove(flxHorizontalAnimationaKA);
            }
            if (previousForm && previousForm.flxHorizontalAnimationaKA){ 
              	previousForm.lblSyncBarKA.width = "0%";
            	previousForm.remove(flxHorizontalAnimationaKA);
            }
            kony.servicesapp.BACKGROUNDSYNCINPROGRESS = false;
            kony.servicesapp.SYNCSTARTPOINT = 0;
			kony.servicesapp.SYNCENDPOINT = 0;
			try {
				kony.timer.cancel("syncMsgTimer");
			} catch (e) {
				kony.sdk.mvvm.log.error("error in Blogic cancelTimer : " + e);
			}
            if(currentForm && currentForm.flxHorizontalAnimationaKA){
				currentForm.remove(flxHorizontalAnimationaKA);
			}
			if(previousForm && previousForm.flxHorizontalAnimationaKA){
				previousForm.remove(flxHorizontalAnimationaKA);
			}
			refreshSyncCallBack();
        }
    } catch (error) {
        kony.sdk.mvvm.log.error("==kony.servicesapp.endAnimation==>" + error);
    }
}
kony.servicesapp.resetSyncSkin = function(){
	try{
		kony.sdk.mvvm.log.info("==kony.servicesapp.resetSyncSkin==>");
		if(frmOrderListKA.btnManualSyncKA){
			frmOrderListKA.btnManualSyncKA.skin="sknBtnSyncKA";
		}
		if(frmHamburgerMenuWOKA.btnManualSyncKA){
			frmHamburgerMenuWOKA.btnManualSyncKA.skin="sknBtnSyncKA";
		}
		if(frmPendingOrderListKA.btnManualSyncKA){
			frmPendingOrderListKA.btnManualSyncKA.skin="sknBtnSyncKA";
		}
	} catch (error) {
        kony.sdk.mvvm.log.error("==kony.servicesapp.resetSyncSkin==>" + error);
    }
}
kony.servicesapp.setSyncInProgressSkin = function(){
	try{
		kony.sdk.mvvm.log.info("==kony.servicesapp.setSyncInProgressSkin==>");
		if(frmOrderListKA.btnManualSyncKA){
			frmOrderListKA.btnManualSyncKA.skin="sknBtnManualSyncInProgressKA";
		}
		if(frmHamburgerMenuWOKA.btnManualSyncKA){
			frmHamburgerMenuWOKA.btnManualSyncKA.skin="sknBtnManualSyncInProgressKA";
		}
		if(frmPendingOrderListKA.btnManualSyncKA){
			frmPendingOrderListKA.btnManualSyncKA.skin="sknBtnSyncKA";
		}
	} catch (error) {
        kony.sdk.mvvm.log.error("==kony.servicesapp.setSyncInProgressSkin==>" + error);
    }
}
kony.servicesapp.animationDefinition = function(startPoint,endPoint){
	var animDefinition = {
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
kony.servicesapp.animationConfig = function(duration){
	config = {
		"duration": duration,
        "iterationCount": 1,
        "delay": 0,
        "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    return config;
}
kony.servicesapp.preShowSyncAnimCall = function(){
	try{
		kony.sdk.mvvm.log.info("==kony.servicesapp.preShowSyncAnimCall==>");
		if(kony.servicesapp.BACKGROUNDSYNCINPROGRESS == true){
			kony.sdk.mvvm.log.info("inside");
			var previousForm = kony.servicesapp.PREVIOUSFORM;
			if(previousForm){
				var flexRef = previousForm.flxHorizontalAnimationaKA;
				if(flexRef){
					flexRef.removeFromParent();
					kony.sdk.mvvm.log.info("removed from "+ previousForm.id);
				}
			}
			var currentForm = kony.application.getCurrentForm();
			if(kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id] && kony.servicesapp.FORMS_SYNC_PROGRESS_BAR[currentForm.id]["processBar"]){
				if(!currentForm.flxHorizontalAnimationaKA){
					currentForm.addAt(flexRef, 100);
					kony.sdk.mvvm.log.info("added to "+ currentForm.id);
				}
				kony.servicesapp.PREVIOUSFORM = currentForm;
			}
		}else{
			var currentForm = kony.application.getCurrentForm();
			if(currentForm && currentForm.flxHorizontalAnimationaKA){
				currentForm.remove(flxHorizontalAnimationaKA);
			}
		}	
	}catch (error){
        kony.sdk.mvvm.log.error("==kony.servicesapp.preShowSyncAnimCall==>" + error);
    }
}		
