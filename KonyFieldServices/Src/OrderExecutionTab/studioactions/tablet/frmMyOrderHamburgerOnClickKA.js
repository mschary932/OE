function frmMyOrderHamburgerOnClickKA(eventobject) {
    return AS_Button_9e2b00a8c95641cbae0e87bb10c98b85(eventobject);
}

function AS_Button_9e2b00a8c95641cbae0e87bb10c98b85(eventobject) {
    if ((frmMyOrderListTabKA.flxMainMenuKA.isVisible == false)) {
        frmMyOrderListTabKA.flxMainMenuKA["isVisible"] = true;
    } else {
        frmMyOrderListTabKA.flxMainMenuKA["isVisible"] = false;
    }
}