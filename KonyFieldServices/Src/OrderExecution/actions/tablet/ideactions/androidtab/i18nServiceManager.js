var i18nServiceManager = Class(AppInitServiceMangerInterface, {
    constructor: function() {},
    fetch: function(successcallback, errorCallback) {},
    apply: function(i18n, successcallback, errorCallback) {
        function decodeUnicode(str) {
            var r = /\\u([\d\w]{4})/gi;
            str = str.replace(r, function(match, grp) {
                return String.fromCharCode(parseInt(grp, 16));
            });
            str = unescape(str);
            return str;
        }
        try {
            if (i18n.properties.isI18nConfigEnabled == "true") {
                Locales = i18n.Locales;
                var tempLocale = kony.sdk.mvvm.getDeviceLocale();
                if (Locales.hasOwnProperty(tempLocale)) {
                    if (kony.i18n.isResourceBundlePresent(tempLocale)) kony.i18n.updateResourceBundle(JSON.parse(decodeUnicode(Locales[tempLocale])), tempLocale);
                    else {
                        kony.i18n.deleteResourceBundle(kony.i18n.getCurrentLocale());
                        kony.i18n.setResourceBundle(JSON.parse(decodeUnicode(Locales[tempLocale])), tempLocale);
                    }
                    kony.sdk.mvvm.log.info("Got the keys of device locale " + tempLocale + " and assigning them");
                    kony.i18n.setDefaultLocaleAsync(tempLocale, function() {}, i18nfailure);
                    kony.i18n.setCurrentLocaleAsync(tempLocale, function() {}, i18nfailure);
                } else {
                    kony.i18n.deleteResourceBundle(tempLocale);
                    if (tempLocale.indexOf("_") != -1) {
                        var countryLocale = tempLocale.split("_")[0];
                        if (Locales.hasOwnProperty(countryLocale)) {
                            if (kony.i18n.isResourceBundlePresent(countryLocale)) kony.i18n.updateResourceBundle(JSON.parse(decodeUnicode(Locales[countryLocale])), countryLocale);
                            else {
                                kony.i18n.deleteResourceBundle(kony.i18n.getCurrentLocale());
                                kony.i18n.setResourceBundle(JSON.parse(decodeUnicode(Locales[countryLocale])), countryLocale);
                            }
                            kony.sdk.mvvm.log.info("No keys found for  " + tempLocale + " And have keys for country locale. So applying keys of  " + countryLocale);
                            kony.i18n.setDefaultLocaleAsync(countryLocale, function() {}, i18nfailure);
                            kony.i18n.setCurrentLocaleAsync(countryLocale, function() {}, i18nfailure);
                            i18nsuccess();
                            return;
                        }
                    }
                    var defaultLocale = i18n.properties.defaultlocalekey;
                    if (defaultLocale && Locales.hasOwnProperty(defaultLocale)) {
                        if (kony.i18n.isResourceBundlePresent(defaultLocale)) kony.i18n.updateResourceBundle(JSON.parse(decodeUnicode(Locales[defaultLocale])), defaultLocale);
                        else {
                            kony.i18n.deleteResourceBundle(kony.i18n.getCurrentLocale());
                            kony.i18n.setResourceBundle(JSON.parse(decodeUnicode(Locales[defaultLocale])), defaultLocale);
                        }
                        kony.sdk.mvvm.log.info("No keys found for  " + tempLocale + " So assigning keys for " + defaultLocale);
                        kony.i18n.setDefaultLocaleAsync(defaultLocale, function() {}, i18nfailure);
                        kony.i18n.setCurrentLocaleAsync(defaultLocale, function() {}, i18nfailure);
                    }
                }
            }
            i18nsuccess();
        } catch (err) {
            kony.sdk.mvvm.log.info("Error occured while applying i18n");
            i18nfailure(new kony.sdk.mvvm.Exception(kony.sdk.mvvm.ExceptionCode.CD_ERROR_I18N, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_I18N + " -- " + err.message));
        }
    },
    execute: function(success, error, params) {
        success();
    }
});