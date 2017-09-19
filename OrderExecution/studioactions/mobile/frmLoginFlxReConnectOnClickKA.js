function frmLoginFlxReConnectOnClickKA(eventobject) {
    return AS_FlexContainer_7d524233ab9c4bafa678db316ae79d50(eventobject);
}

function AS_FlexContainer_7d524233ab9c4bafa678db316ae79d50(eventobject) {
    if (kony.sdk.mvvm.isNetworkAvailabile()) {
        frmFSLoginKA.show();
    }
}