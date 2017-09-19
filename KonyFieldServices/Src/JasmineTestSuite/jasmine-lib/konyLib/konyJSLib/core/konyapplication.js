kony.application = {
	
	// @New Appmenu APIs 
    createAppMenu:$KW.Appmenu && $KW.Appmenu.createappmenu,
    setCurrentAppMenu:$KW.Appmenu && $KW.Appmenu.setcurrentappmenu,
    getCurrentAppMenu:$KW.Appmenu && $KW.Appmenu.getcurrentappmenu,
    setAppMenuFocusByID:$KW.Appmenu && $KW.Appmenu.setappmenufocusbyid,
    addAppMenuItemAt:$KW.Appmenu && $KW.Appmenu.addappmenuitemat,
    removeAppMenuItemAt:$KW.Appmenu && $KW.Appmenu.removeappmenuitemat,
    setAppMenu: $KW.Appmenu && $KW.Appmenu.setappmenu,
	setAppMenuFocusIndex: $KW.Appmenu && $KW.Appmenu.setappmenufocusindex,
	showAppMenuItems: $KW.Appmenu && $KW.Appmenu.showappmenuitems,
	hideAppMenuItems: $KW.Appmenu && $KW.Appmenu.hideappmenuitems,
    //To support Bookmarking
    setBMState   : kony.bm.setBMState,
    resetBMState : kony.bm.resetBMState,
    getBMState   : kony.bm.getBMState,
    getFormId    : kony.bm.getFormId,
    addBMState   : kony.bm.addBMState,
    removeBMState: kony.bm.removeBMState,

	exit: $KI.exit,
	
	getPreviousForm: $KW.Form && $KW.Form.getPreviousForm,
	getCurrentForm: $KW.Form && $KW.Form.getCurrentForm,
	
	removeGestureRecognizerForAllForms: $KW.Widget && $KW.Widget.removegesturerecognizerforallforms,
	setGestureRecognizerForAllForms: $KW.Widget && $KW.Widget.addgesturerecognizerforallforms,
	
	getApplicationMode: $KI.os && $KI.os.getapplicationmode,
	setApplicationMode: $KI.os && $KI.os.setapplicationmode,
	setApplicationInitializationEvents: $KI.setappevents,		

	registerForIdleTimeout: $KI.appevents && $KI.appevents.registerforidletimeout,
	unregisterForIdleTimeout:$KI.appevents && $KI.appevents.unregisterforidletimeout,
	
	//Badge apis
	setApplicationBadgeValue: tobeimplemented,
	getApplicationBadgeValue: tobeimplemented,	
	setAppMenuBadgeValue: tobeimplemented,
	getAppMenuBadgeValue: tobeimplemented,
	
	appReset: $KI.appreset,
	
	setAppHeaders: $KI.setappheaders,
	setAppFooters: $KI.setappfooters,
	setApplicationCallbacks: $KI.setapplicationcallbacks,
    setApplicationBehaviors: $KI.setapplicationbehaviors,

	showLoadingScreen : $KI.window && $KI.window.showLoadingScreen,
	dismissLoadingScreen : $KI.window && $KI.window.dismissLoadingScreen,
	openURL: $KI.window.openURL
};

function tobeimplemented() {	
	console.warn("API to be implemented Yet");
}
