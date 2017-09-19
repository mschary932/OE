function frmHamburgerMenuItem1OnClickKA(eventobject) {
    return AS_FlexContainer_4260087a6944430dafa352383dc28eff(eventobject);
}

function AS_FlexContainer_4260087a6944430dafa352383dc28eff(eventobject) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
    kony.servicesapp.showPendingOrderListKA();
}