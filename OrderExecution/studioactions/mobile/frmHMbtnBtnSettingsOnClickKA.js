function frmHMbtnBtnSettingsOnClickKA(eventobject) {
    return AS_Button_afa724e60afe4d09a5469ae95a1d92e6(eventobject);
}

function AS_Button_afa724e60afe4d09a5469ae95a1d92e6(eventobject) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
    frmSettingsKA.show();
}