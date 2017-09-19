function frmHamburgerMenuItem0OnClickKA(eventobject) {
    return AS_FlexContainer_9e819e2a656b4b64a5da471e4045fde4(eventobject);
}

function AS_FlexContainer_9e819e2a656b4b64a5da471e4045fde4(eventobject) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
    kony.servicesapp.showFormOrderList();
}