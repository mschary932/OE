function ActionTabletPostAppInit(eventobject) {
    return AS_AppEvents_8491c5f79c4741e4826601a21c1842a1(eventobject);
}

function AS_AppEvents_8491c5f79c4741e4826601a21c1842a1(eventobject) {
    kony.modules.loadFunctionalModule("librarymodules");
    kony.modules.loadFunctionalModule("init");
    kony.modules.loadFunctionalModule("appjsmodules");
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    try {
        kony.sdk.mvvm.appInit(INSTANCE);
    } catch (err) {
        alert(err);
    }
}