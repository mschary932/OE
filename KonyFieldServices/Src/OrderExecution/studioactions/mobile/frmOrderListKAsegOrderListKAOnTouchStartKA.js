function frmOrderListKAsegOrderListKAOnTouchStartKA(eventobject, x, y) {
    return AS_Segment_3eb7e2dc964e49329af7664d3fb32ed7(eventobject, x, y);
}

function AS_Segment_3eb7e2dc964e49329af7664d3fb32ed7(eventobject, x, y) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
}