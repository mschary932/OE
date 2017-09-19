function frmFSLoginPreShowKA(eventobject) {
    return p2kwiet1234563580185_frmFSLoginKA_preshow_seq0(eventobject);
}

function p2kwiet1234563580185_frmFSLoginKA_preshow_seq0(eventobject) {
    if (!kony.servicesapp.isAppLaunchedFirstTime) animateInitScreen();
    frmFSLoginKA.lblVersionNumberKA.text = kony.servicesapp.constants.getServiceConstantsObj().getValue("VERSION_NUMBER");
    frmFSLoginKA.lblBuildNoKA.text = kony.servicesapp.constants.getServiceConstantsObj().getValue("BUILD_NUMBER");
}