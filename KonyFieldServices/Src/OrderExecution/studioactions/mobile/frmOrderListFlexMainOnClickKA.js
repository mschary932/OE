function frmOrderListFlexMainOnClickKA(eventobject) {
    return AS_FlexContainer_71eaabef77f1447aaeca981ff0416d4a(eventobject);
}

function AS_FlexContainer_71eaabef77f1447aaeca981ff0416d4a(eventobject) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
}