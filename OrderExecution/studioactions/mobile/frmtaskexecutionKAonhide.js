function frmtaskexecutionKAonhide(eventobject) {
    return p2kwiet1234563580554_frmTaskExecutionKA_onhide_seq0(eventobject);
}

function p2kwiet1234563580554_frmTaskExecutionKA_onhide_seq0(eventobject) {
    try {
        kony.timer.cancel("SecondTimer");
    } catch (e) {
        kony.sdk.mvvm.log.error("error in Blogic cancelTimer : " + e);
    }
}