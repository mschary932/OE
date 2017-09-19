function orderxecutionpostappinit(params) {
    kony.modules.loadFunctionalModule("librarymodules");
    kony.modules.loadFunctionalModule("preloadviews");
    kony.modules.loadFunctionalModule("preloadmodules");
    kony.modules.loadFunctionalModule("init");
    kony.modules.loadFunctionalModule("appjsmodules1");
    kony.modules.loadFunctionalModule("appjsmodules2");
    kony.application.setApplicationBehaviors({
        "retainSpaceOnHide": false,
        "hideDefaultLoadingIndicator": true
    });
    return LoginController.postAppInit();
}