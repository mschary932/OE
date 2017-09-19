var htmlrunner,
    resultdir,
    page,
    fs;
var system = require('system');
phantom.injectJs("lib/utils/core.js")
console.log("phantom js args length ---->>>> "+system.args.length+" JSON Obj : "+JSON.stringify(system.args));
if (system.args.length < 3 ) {
    console.log("Usage: phantom_test_runner.js HTML_RUNNER RESULT_DIR");
    phantom.exit(1);
} else {
	htmlrunner = system.args[1];
	resultdir = system.args[2];
 
    console.log("htmlRunner >>>>>>"+htmlrunner);

    page = require("webpage").create();
    fs = require("fs");
    // Echo the output of the tests to the Standard Output
    page.onConsoleMessage = function(msg, source, linenumber) {
        console.log(msg);
    };

    page.onResourceError = function(resourceError) {
        page.reason = resourceError.errorString;
        page.reason_url = resourceError.url;
        console.log("phantom page error - "+ JSON.stringify(resourceError));
    };

    page.open(htmlrunner, function(status) {
        if (status === "success") {
        	utils.core.waitfor(function() { // wait for this to be true
                return page.evaluate(function() {
					return typeof(jasmine.phantomjsXMLReporterPassed) !== "undefined";
                });
            }, function() { // once done...
                // Retrieve the result of the tests
                var f = null, i, len;
                    suitesResults = page.evaluate(function(){
                    return jasmine.phantomjsXMLReporterResults;
                });
                
                // Save the result of the tests in files
                for ( i = 0, len = suitesResults.length; i < len; ++i ) {
                    try {
                        f = fs.open(resultdir + '/' + suitesResults[i]["xmlfilename"], "w");
                        f.write(suitesResults[i]["xmlbody"]);
                        f.close();
                    } catch (e) {
                        console.log(e);
                        console.log("phantomjs> Unable to save result of Suite '"+ suitesResults[i]["xmlfilename"] +"'");
                    }
                }
                
                // Return the correct exit status. '0' only if all the tests passed
                phantom.exit(page.evaluate(function(){
                    return jasmine.phantomjsXMLReporterPassed ? 0 : 1; //< exit(0) is success, exit(1) is failure
                }));
            }, function() { // or, once it timesout...
					phantom.exit(1);
            },20*60*1000);
        } else {
            console.log("phantomjs> Could not load '" + htmlrunner + "'.");
            phantom.exit(1);
        }
    });
}
