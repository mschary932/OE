function frmOrderListMapOnclickKA(eventobject, location) {
    return AS_Map_80a7b03f79b4409fb5b64d57928faec5(eventobject, location);
}

function AS_Map_80a7b03f79b4409fb5b64d57928faec5(eventobject, location) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
}