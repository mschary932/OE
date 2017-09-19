$KW.konyPicker = function(elmId, settings) {
    if(settings.display == "inline" && settings.widgetModel) settings.widgetModel[elmId] = this;
    else $KG[elmId] = this;
    this.elmId = elmId;
    this.settings = settings;

    this.yOrd = null;
    this.mOrd = null;
    this.dOrd = null;
    this.iv = {};
    this.tv = {};

    this.values = null; // array of li's (index+1) or the value attribute, must be a number
    this.val = null; // selected keys concatination used for sending to the server
    this.temp = null; //Temporary Values

    this.h = null;
    this.m = null;
    this.l = null;
    this.date = new Date();
    this.uuid = this.date.getTime();
    this.move = false;
    this.target = null;
    this.start = null;
    this.stop = null;
    this.startTime = null;
    this.endTime = null;
    this.pos = null;
    this.plustap = false;
    this.minustap = false;
    this.tempRows = null;
    this.touch = $KU.isTouchSupported;
    this.START_EVENT = this.touch ? 'touchstart' : 'mousedown';
    this.MOVE_EVENT = this.touch ? 'touchmove' : 'mousemove';
    this.END_EVENT = this.touch ? 'touchend' : 'mouseup';
    this.defaults = {
        // Options
        width: '',
        height: 40,
        rows: 3,
        modal: true,
        display: 'popup', //popup or inline
        dock: '',
        disabled: false,
        showOnFocus: true,
        showValue: true,
        showLabel: true,
        wheels: null,
        theme: '',
        mode: 'scroller',
        preset: 'date',
        dateFormat: 'mm/dd/yy',
        dateOrder: 'mmddy',
        ampm: true,
        seconds: false,
        timeFormat: 'hh:ii A',
        startYear: this.date.getFullYear() - 100,
        endYear: this.date.getFullYear() + 1,
        monthNames: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        shortYearCutoff: '+10',
        monthText: 'Month',
        dayText: 'Day',
        yearText: 'Year',
        hourText: 'Hours',
        minuteText: 'Minutes',
        secText: 'Seconds',
        ampmText: '&nbsp;',
        setText: 'Set',
        cancelText: 'Cancel',
        btnClass: 'dwb',
        stepHour: 1,
        stepMinute: 1,
        stepSecond: 1,
        // Events
        beforeShow: function() {},
        onClose: function() {},
        onSelect: function() {},
        onCancel: function() {},
        formatResult: function(d, flag, inst) {
            if(!d) return;
            var out = '';
            for (var i = 0; i < d.length; i++) {
                if(inst) {
                    if(inst.settings.display == "popup") {
                        inst.picker = document.getElementById(inst.elmId+'_picker');
                    }
                }
                var uls = (inst && inst.picker) ? inst.picker.querySelectorAll('ul') : null;
                if(uls && uls.length) {
                    if(!inst.preset && isNaN(parseInt(d[i], 10))) {
                        d[i] = (uls[i].querySelectorAll('li[value="'+d[i]+'"]')[0]) ? uls[i].querySelectorAll('li[value="'+d[i]+'"]')[0].getAttribute('val') : uls[i].querySelectorAll('li.val_'+d[i])[0].getAttribute('val');
                    }
                    var lis = uls[i].querySelectorAll('li');
                    d[i] = parseInt(d[i], 10);
                    var li = null;
                    if(inst.preset) {
                       li = lis[d[i]];
                    } else {
                        li = (d[i] == 0) ? lis[d[i]] : lis[d[i]-1];
                    }
                    //if(!inst.preset && d[i] == 0) ? lis[d[i]] : lis[d[i]-1];
                    if(li && typeof li.getAttribute === 'function') {
                        if(flag) {
                            out += (i > 0 ? ' ' : '') + li.getAttribute('text');
                        } else {
                            out += (i > 0 ? ' ' : '') + li.getAttribute('value');
                        }
                    }
                } else {
                    out += (i > 0 ? ' ' : '') + d[i];
                }
            }
            return out;
        },
        parseValue: function(val, inst) {
            var w = inst.settings.wheels,
                val = val.split(' '),
                ret = [],
                j = 0;
            if(!w) return;
            for (var i=IndexJL; i < w.length; i++) {
                var tempVal = inst.wheelDataValueByText(w[i], [val[j]]);
                if (tempVal) {
                    ret.push(tempVal);
                } else {
                    // Select first value from wheel
                    ret.push(w[i][IndexJL][IndexJL]);
                }
                j++;
            }
            return ret;
        },
        validate: function() {
            return true;
        }
    };

    this.init();
};

$KW.konyPicker.prototype = {
    picker: null

  , setDefaults: function(o) {
        $KU.extend(o, this.defaults);
    }

  , enable: function() {
        this.settings.disabled = false;
        var ips = document.querySelectorAll('input, select, button, textarea');
        ips.forEach(function(el) {
            el.disabled = false;
        });
    }

  , disable: function() {
        this.settings.disabled = true;
        var ips = document.querySelectorAll('input, select, button, textarea');
        ips.forEach(function(el) {
            el.disabled = true;
        });
    }

  , scroll: function(t, val, time, orig, index) {
        var that = this;

        t.setAttribute('style', (time ? ('-'+vendor + '-transition:all ' + time.toFixed(1) + 's ease-out;') : '') + ($KU.has3d ? ('-'+vendor + '-transform:translate3d(0,' + (val * this.h) + 'px,0);') : ('top:' + (val * this.h) + 'px;')));

        function getVal(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        }

        if(time) {
            var i = 0;
            clearInterval(this.iv[index]);

            this.iv[index] = setInterval(function() {
                i += 0.1;
                t.setAttribute('pos', Math.round(getVal(i, orig, val - orig, time)));
                if (i >= time) {
                    clearInterval(that.iv[index]);
                    t.setAttribute('pos', val);
                    if(that.settings.display == "inline" && that.settings.widgetModel && that.values[index] != that.temp[index]) {
                        var componentIndex = index+IndexJL;
                        $KW.PickerView.eventHandler(componentIndex, that, that.settings.widgetModel);
                    }
                }
            }, 100);

            // Show +/- buttons
            clearTimeout(this.tv[index]);

            this.tv[index] = setTimeout(function() {
                if(!$KU.hasClassName(t, 'dwa')) {
                    var dwwl = $KU.closestElement(t, 'class', 'dwwl');
                    var dwwb = dwwl.querySelectorAll('.dwwb');
                    //$(dwwb).fadeIn('fast'); //TODO::
                }
            }, time * 1000);
        } else {
            t.setAttribute('pos', val);
        }
    }

  , formatDate: function(format, date, settings) {
        if (!date) return null;
        //var s = $.extend({}, this.settings, settings), //Do not delete this line
        var s = $KU.extend({}, this.settings, settings),
            // Check whether a format character is doubled
            look = function(m) {
                var n = 0;
                while (i + 1 < format.length && format.charAt(i + 1) == m) { n++; i++; };
                return n;
            },
            // Format a number, with leading zero if necessary
            f1 = function(m, val, len) {
                var n = '' + val;
                if (look(m))
                    while (n.length < len)
                        n = '0' + n;
                return n;
            },
            // Format a name, short or long as requested
            f2 = function(m, val, s, l) {
                return (look(m) ? l[val] : s[val]);
            },
            output = '',
            literal = false;
        for (var i = 0; i < format.length; i++) {
            if (literal)
                if (format.charAt(i) == "'" && !look("'"))
                    literal = false;
                else
                    output += format.charAt(i);
            else
                switch (format.charAt(i)) {
                    case 'd':
                        output += f1('d', date.getDate(), 2);
                        break;
                    case 'D':
                        output += f2('D', date.getDay(), s.dayNamesShort, s.dayNames);
                        break;
                    case 'o':
                        output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                        break;
                    case 'm':
                        output += f1('m', date.getMonth() + 1, 2);
                        break;
                    case 'M':
                        output += f2('M', date.getMonth(), s.monthNamesShort, s.monthNames);
                        break;
                    case 'y':
                        output += (look('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                        break;
                    case 'h':
                        var h = date.getHours();
                        output += f1('h', (h > 12 ? (h - 12) : (h == 0 ? 12 : h)), 2);
                        break;
                    case 'H':
                        output += f1('H', date.getHours(), 2);
                        break;
                    case 'i':
                        output += f1('i', date.getMinutes(), 2);
                        break;
                    case 's':
                        output += f1('s', date.getSeconds(), 2);
                        break;
                    case 'a':
                        output += date.getHours() > 11 ? 'pm' : 'am';
                        break;
                    case 'A':
                        output += date.getHours() > 11 ? 'PM' : 'AM';
                        break;
                    case "'":
                        if (look("'"))
                            output += "'";
                        else
                            literal = true;
                        break;
                    default:
                        output += format.charAt(i);
                }
        }
        return output;
    }

  , parseDate: function(format, value, settings) {
        var def = new Date();
        if (!format || !value) return def;
        value = (typeof value == 'object' ? value.toString() : value + '');
            //var s = $.extend({}, this.settings, settings), //Do not delete this line
        var s = $KU.extend({}, this.settings, settings),
            year = def.getFullYear(),
            month = def.getMonth() + 1,
            day = def.getDate(),
            doy = -1,
            hours = def.getHours(),
            minutes = def.getMinutes(),
            seconds = def.getSeconds(),
            ampm = -1,
            literal = false,
            // Check whether a format character is doubled
            lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            },
            // Extract a number from the string value
            getNumber = function(match) {
                lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 :
                    (match == 'y' ? 4 : (match == 'o' ? 3 : 2))));
                var digits = new RegExp('^\\d{1,' + size + '}');
                var num = value.substr(iValue).match(digits);
                if (!num)
                    throw 'Missing number at position ' + iValue;
                iValue += num[0].length;
                return parseInt(num[0], 10);
            },
            // Extract a name from the string value and convert to an index
            getName = function(match, s, l) {
                var names = (lookAhead(match) ? l : s);
                for (var i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
                        iValue += names[i].length;
                        return i + 1;
                    }
                }
                throw 'Unknown name at position ' + iValue;
            },
            // Confirm that a literal character matches the string value
            checkLiteral = function() {
                if (value.charAt(iValue) != format.charAt(iFormat))
                    throw 'Unexpected literal at position ' + iValue;
                iValue++;
            },
            iValue = 0;
         for (var iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal)
                if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                    literal = false;
                else
                    checkLiteral();
            else
                switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D':
                        getName('D', s.dayNamesShort, s.dayNames);
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', s.monthNamesShort, s.monthNames);
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case 'H':
                        hours = getNumber('H');
                        break;
                    case 'h':
                        hours = getNumber('h');
                        break;
                    case 'i':
                        minutes = getNumber('i');
                        break;
                    case 's':
                        seconds = getNumber('s');
                        break;
                    case 'a':
                        ampm = getName('a', ['am', 'pm'], ['am', 'pm']) - 1;
                        break;
                    case 'A':
                        ampm = getName('A', ['am', 'pm'], ['am', 'pm']) - 1;
                        break;
                    case "'":
                        if (lookAhead("'"))
                            checkLiteral();
                        else
                            literal = true;
                        break;
                    default:
                        checkLiteral();
                }
        }
        if (year < 100)
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= s.shortYearCutoff ? 0 : -100);
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                var dim = 32 - new Date(year, month - 1, 32).getDate();
                if (day <= dim)
                    break;
                month++;
                day -= dim;
            } while (true);
        }
        hours = (ampm == -1) ? hours : ((ampm && hours < 12) ? (hours + 12) : (!ampm && hours == 12 ? 0 : hours));
        //if (ampm && hours < 12) hours += 12;
        var date = new Date(year, month - 1, day, hours, minutes, seconds);
        if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
            throw 'Invalid date'; // E.g. 31/02/*
        return date;
    }

  , parseValue: function(val) {
        if(this.preset) {
            var result = [];
            if(this.settings.preset == 'date') {
                try {
                    var d = this.parseDate(this.settings.dateFormat, val, this.settings);
                } catch (e) {
                    var d = new Date();
                };

                result[this.yOrd] = d.getFullYear();
                result[this.mOrd] = d.getMonth();
                result[this.dOrd] = d.getDate();
            } else if(this.settings.preset == 'time') {
                try {
                    var d = this.parseDate(this.settings.timeFormat, val, this.settings);
                } catch (e) {
                    var d = new Date();
                };

                var hour = d.getHours();
                result[0] = (this.settings.ampm) ? (hour > 12 ? (hour - 12) : (hour == 0 ? 12 : hour)) : hour;
                result[1] = d.getMinutes();
                if(this.settings.seconds) {
                    result[2] = d.getSeconds();
                }
                if(this.settings.ampm) {
                    result[this.settings.seconds ? 3 : 2] = hour > 11 ? 'PM' : 'AM';
                }
            } else if(this.settings.preset == 'datetime') {
                try {
                    var d = this.parseDate(this.settings.dateFormat + ' ' + this.settings.timeFormat, val, this.settings);
                } catch (e) {
                    var d = new Date();
                };

                var hour = d.getHours();
                result[this.yOrd] = d.getFullYear();
                result[this.mOrd] = d.getMonth();
                result[this.dOrd] = d.getDate();
                result[3] = (this.settings.ampm) ? (hour > 12 ? (hour - 12) : (hour == 0 ? 12 : hour)) : hour;
                result[4] = d.getMinutes();
                if(this.settings.seconds) {
                    result[5] = d.getSeconds();
                }
                if(this.settings.ampm) {
                    result[this.settings.seconds ? 6 : 5] = hour > 11 ? 'PM' : 'AM';
                }
            }
            return result;
        }
        return this.settings.parseValue(val, this);
    }

  , setValue: function(input) {
        if(input == undefined) {
            input = true;
        }
        var v = this.formatResult(true);
        this.val = this.formatResult(false);
        if(this.temp) this.values = this.temp.slice(0); //console.log(this.val); console.log(this.values);
        if(this.settings.display == "popup") {
            var elm = document.getElementById(this.elmId);
            if(input && elm) {
                if(elm.tagName === 'INPUT' || elm.tagName === 'SELECT' || elm.tagName === 'TEXTAREA') {
                    elm.value = v;
                    $KU.fireEvent(elm, 'change');
                } else {
                    elm.innerText = v;
                    $KW.ListBox.eventHandler(null, elm, null);
                }
            }
        }
    }

  , getDate: function() {
        var d = this.values;
        if (this.settings.preset == 'date')
            return new Date(d[this.yOrd], d[this.mOrd], d[this.dOrd]);
        if (this.settings.preset == 'time') {
            var hour = (this.settings.ampm) ? ((d[this.settings.seconds ? 3 : 2] == 'PM' && (d[0] - 0) < 12) ? (d[0] - 0 + 12) : (d[this.settings.seconds ? 3 : 2] == 'AM' && (d[0] == 12) ? 0 : d[0])) : d[0];
            return new Date(1970, 0, 1, hour, d[1], this.settings.seconds ? d[2] : null);
        }
        if (this.settings.preset == 'datetime') {
            var hour = (this.settings.ampm) ? ((d[this.settings.seconds ? 6 : 5] == 'PM' && (d[3] - 0) < 12) ? (d[3] - 0 + 12) : (d[this.settings.seconds ? 6 : 5] == 'AM' && (d[3] == 12) ? 0 : d[3])) : d[3];
            return new Date(d[this.yOrd], d[this.mOrd], d[this.dOrd], hour, d[4], this.settings.seconds ? d[5] : null);
        }
    }

  , setDate: function(d, input) {
        if (this.settings.preset.match(/date/i)) {
            this.temp[this.yOrd] = d.getFullYear();
            this.temp[this.mOrd] = d.getMonth();
            this.temp[this.dOrd] = d.getDate();
        }
        if (this.settings.preset == 'time') {
            var hour = d.getHours();
            this.temp[0] = (this.settings.ampm) ? (hour > 12 ? (hour - 12) : (hour == 0 ? 12 : hour)) : hour;
            this.temp[1] = d.getMinutes();
            if(this.settings.seconds) {
                this.temp[2] = d.getSeconds();
            }
            if(this.settings.ampm) {
                this.temp[this.settings.seconds ? 3 : 2] = hour > 11 ? 'PM' : 'AM';
            }
        }
        if (this.settings.preset == 'datetime') {
            var hour = d.getHours();
            this.temp[3] = (this.settings.ampm) ? (hour > 12 ? (hour - 12) : (hour == 0 ? 12 : hour)) : hour;
            this.temp[4] = d.getMinutes();
            if(this.settings.seconds) {
                this.temp[5] = d.getSeconds();
            }
            if(this.settings.ampm) {
                this.temp[this.settings.seconds ? 6 : 5] = hour > 11 ? 'PM' : 'AM';
            }
        }
        this.setValue(input);
    }

  , formatResult: function(flag) {
        var d = this.temp;
        if(this.preset) {
            if(this.settings.preset == 'date') {
                return this.formatDate(this.settings.dateFormat, new Date(d[this.yOrd], d[this.mOrd], d[this.dOrd]), this.settings);
            }
            else if(this.settings.preset == 'datetime') {
                var hour = (this.settings.ampm) ? ((d[this.settings.seconds ? 6 : 5] == 'PM' && (d[3] - 0) < 12) ? (d[3] - 0 + 12) : (d[this.settings.seconds ? 6 : 5] == 'AM' && (d[3] == 12) ? 0 : d[3])) : d[3];
                return this.formatDate(this.settings.dateFormat + ' ' + this.settings.timeFormat, new Date(d[this.yOrd], d[this.mOrd], d[this.dOrd], hour, d[4], this.settings.seconds ? d[5] : null), this.settings);
            }
            else if(this.settings.preset == 'time') {
                var hour = (this.settings.ampm) ? ((d[this.settings.seconds ? 3 : 2] == 'PM' && (d[0] - 0) < 12) ? (d[0] - 0 + 12) : (d[this.settings.seconds ? 3 : 2] == 'AM' && (d[0] == 12) ? 0 : d[0])) : d[0];
                return this.formatDate(this.settings.timeFormat, new Date(1970, 0, 1, hour, d[1], this.settings.seconds ? d[2] : null), this.settings);
            }
        }
        return this.settings.formatResult(d, flag, this);
    }

  , validate: function(i) {
        //If target is month, show/hide days
        if(this.preset && this.settings.preset.match(/date/i) && ((i == this.yOrd) || (i == this.mOrd) || (i == -1))) {
            var days = 32 - new Date(this.temp[this.yOrd], this.temp[this.mOrd], 32).getDate() - 1;
            var day = this.picker.querySelectorAll('ul')[this.dOrd];

            var lis = day.querySelectorAll('li');
            for(var i=0; i<lis.length; i++) {
                if(lis[i] && lis[i].style) {
                    if(i <= days) lis[i].style.display = '';
                    else lis[i].style.display = 'none';
                }
            }
            if(this.temp[this.dOrd] > days) {
                this.scroll(day, this.m - days - 1);
                //this.temp[this.dOrd] = $('li:eq(' + days + ')', day).data('val');
                this.temp[this.dOrd] = parseInt(lis[days].getAttribute('val'), 10);
            }
        } else {
            this.settings.validate(i);
        }
    }

  , getSelectedKeys: function() {
        var ret = [];
        if(ret && this.settings.wheels) {
            if(IndexJL) ret.push(null);
            for(var i=0; i<this.values.length; i++) {
                ret.push(this.settings.wheels[i+IndexJL][this.values[i]+IndexJL][0+IndexJL]);
            }
        }
        return (ret.length > IndexJL) ? ret : null;
    }

  , getSelectedKeyValues: function() {
        var ret = [];
        if(ret && this.settings.wheels) {
            if(IndexJL) ret.push(null);
            for(var i=0; i<this.values.length; i++) {
                if(this.settings.widgetModel.masterdatamap) {
                    var compdata = this.settings.widgetModel.masterdatamap[i+IndexJL][0+IndexJL];
                    //var compkey = this.settings.widgetModel.masterdatamap[i+IndexJL][1+IndexJL];
                    //var compvalue = this.settings.widgetModel.masterdatamap[i+IndexJL][2+IndexJL];
                    ret.push(compdata[this.values[i]+IndexJL]);
                } else {
                    ret.push(this.settings.widgetModel.masterdata[i+IndexJL][this.values[i]+IndexJL]);
                }
            }
        }
        return (ret.length > IndexJL) ? ret : null;
    }

  , setSelectedKeys: function(keys) {
        this.values = (!IndexJL) ? [] : [null];
        this.temp = (!IndexJL) ? [] : [null];
        if(keys === null) {
            for(var i=IndexJL; i<this.settings.wheels.length; i++) {
                this.values.push(0);
                this.values.push(0);
            }
        } else {
            var uls = (this.picker) ? this.picker.querySelectorAll('.dww ul') : null;
            for(var i=IndexJL; i<keys.length; i++) {
                var data = this.settings.wheels[i];
                for(var j=IndexJL; j<(data.length-1); j++) {
                    if(data[j][0+IndexJL] == keys[i]) {
                        var x = j - IndexJL;
                        this.values.push(x);
                        this.temp.push(x);
                        if(uls) this.scroll(uls[i - IndexJL], this.m - (x < 0 ? 0 : x) - 1);
                    }
                }
            }
        }
    }

  , wheelDataIndexByTextValue: function(data, val) {
        for(var c=0; c<data.length; c++) {
            if(data[c] !== null) {
                if(data[c][2] == val || data[c][1] == val || c == val) {
                    return c;
                }
            }
        }
        return null;
    }

  , wheelDataValueByText: function(data, text) {
        for(var c=IndexJL; c<data.length; c++) {
            if(data[c][2] == text) {
                return data[c][1];
            }
        }
        return null;
    }

  , wheelDataTextByValue: function(data, value) {
        for(var c=0; c<data.length; c++) {
            if(data[c] !== null) {
                if(data[c][1] == value) {
                    return data[c][2];
                }
            }
        }
        return null;
    }

  , hide: function() {
        if(this.visible) {
            this.picker.style.display = 'none';
            this.picker.previousSibling.style.display = 'none';
            this.picker.previousSibling.removeAttribute('dummy');
            this.visible = false;
        }
    }

  , show: function() {
        if(!this.visible) {
            document.getElementById(this.elmId).blur();
            if(this.settings.modal === false || this.settings.display === 'inline') {
                this.picker.previousSibling.style.display = 'none';
            } else {
                this.picker.previousSibling.style.display = 'block';
                this.picker.previousSibling.setAttribute('dummy', 'dummy');
            }
            this.picker.style.display = 'block';
            this.visible = true;
            this.position();
            //Set to the this.values data
            var uls = this.picker.querySelectorAll('.dww ul');
            for(var i=0; i<uls.length; i++) {
                var x = '', lis = null;
                if(!this.preset) {
                    for(var wk in this.settings.wheels[i]) {
                        this.values[i] = this.wheelDataIndexByTextValue(this.settings.wheels[i][wk], this.values[i]);
                        break;
                    }
                }
                lis = uls[i].querySelectorAll('li.val_'+this.values[i]);
                var x = $KU.elementIndex(lis[0]);
                while ((x < 0) && (--this.values[i] >= 0)) {
                    var li = uls[i].querySelectorAll('li.val_'+this.values[i])[0];
                    x = $KU.elementIndex(li);
                }
                this.scroll(uls[i], this.m - (x < 0 ? 0 : x) - 1);
            }

            //Set value text
            if(!this.preset) {
                var dwv = this.picker.querySelectorAll('.dwv');
                var formattedRes = this.settings.formatResult(this.values, true, this);
                dwv[0].innerHTML = (formattedRes) ? formattedRes : "";
            }
        }
    }

  , position: function() {
        if(!this.picker || !this.picker.previousSibling) return;
        var ww = window.innerWidth || document.body.clientWidth
          , wh = window.innerHeight || document.body.clientHeight
          , w
          , h;
        w = this.picker.offsetWidth;
        h = this.picker.offsetHeight;

        if(this.settings.dock == 'bottom') { //isIDevice, isAndroid
            this.picker.style.top = '';
            this.picker.style.left = '0px'; //this.picker.style.left = (st+(wh-h)/2)+'px';
            this.picker.style.bottom = '0px';
        } else {
            this.picker.style.top = ((wh-h)/2)+'px';
            this.picker.style.left = ((ww-w)/2)+'px';
        }

        this.picker.previousSibling.style.height = (window.innerHeight || document.body.clientHeight) + 'px';
    }

  , calculate: function(t, val, anim, orig) {
        var i = parseInt(t.getAttribute('index'), 10);
        val = val > (this.m - 1) ? (this.m - 1) : val;
        val = val < (this.m - this.l) ? (this.m - this.l) : val;

        //Call scroll with animation (calc animation time)
        this.scroll(t, val, anim ? (val == orig ? 0.1 : Math.abs((val - orig) * 0.1)) : 0, orig, i);

        //Set selected scroller value
        this.temp[i] = parseInt(t.querySelectorAll('li')[(this.m - 1 - val)].getAttribute('val'), 10) - IndexJL;

        //Validate
        this.validate(i);

        //Set value text
        var dwv = this.picker.querySelectorAll('.dwv')
          , res = (this.preset) ? this.formatResult(false) : this.formatResult(true);

        for(var i=0; i<dwv.length; i++) {
            dwv[i].innerHTML = (res) ? res : "";
        }
    }

  , getY: function(e) {
        return this.touch ? e.touches[0].pageY : e.pageY;
    }

  , plus: function(t) {
        if(this.plustap) {
            var p = parseFloat(t.getAttribute('pos'))
              , val = p - 1;

            val = val < (this.m - this.l) ? (this.m - 1) : val;
            this.calculate(t, val);
        } else {
            clearInterval(this.plustap);
        }
    }

  , minus: function(t) {
        if(this.minustap) {
            var p = parseFloat(t.getAttribute('pos'))
              , val = p + 1;

            val = val > (this.m - 1) ? (this.m - this.l) : val;
            this.calculate(t, val);
        } else {
            clearInterval(this.minustap);
        }
    }

  , dwwlAttachMouseScroll: function(e, elm, inst) {
        kony.events.preventDefault(e);
        e = e.originalEvent;
        var delta = e.wheelDelta ? (e.wheelDelta / 120) : (e.detail ? (-e.detail / 3) : 0);
        var t = elm.querySelectorAll('ul')[0];
        var p = parseFloat(t.getAttribute('pos'));
        var val = Math.round(p + delta);
        inst.l = t.querySelectorAll('li').length;
        inst.calculate(t, val);
    }

  , dwwlAttachStart: function(e, elm, inst) {
        if(!inst.move && inst.settings.mode == 'scroller') {
            kony.events.preventDefault(e);
	    kony.events.stopPropagation(e);
            inst.move = true;
            inst.target = elm.querySelectorAll('ul')[0];
            inst.pos = parseFloat(inst.target.getAttribute('pos'));
            inst.l = $KU.filterElements(inst.target.querySelectorAll('li'), 'visible').length;
            inst.start = inst.getY(e);
            inst.startTime = new Date(); //inst.date;
            inst.stop = inst.start;
            inst.scroll(inst.target, inst.pos);
        }
    }

  , dwb_dwwbAttachStart: function(e, elm, inst) {
        $KU.addClassName(elm, 'dwb-a');
    }

  , dwwbpAttachStart: function(e, elm, inst) {
            kony.events.preventDefault(e);
	    kony.events.stopPropagation(e);

        var closest = $KU.closestElement(elm, 'class', 'dwwl');
        var t = null;
        if(closest) {
            t = closest.querySelectorAll('ul')[0];
        }
        inst.l = $KU.filterElements(t.querySelectorAll('li'), 'visible').length;
        clearInterval(inst.plustap);
        inst.plustap = setInterval(function() {inst.plus(t);}, 200);
        inst.plus(t);
    }

  , dwwbmAttachStart: function(e, elm, inst) {
            kony.events.preventDefault(e);
	    kony.events.stopPropagation(e);

        var closest = $KU.closestElement(elm, 'class', 'dwwl');
        var t = null;
        if(closest) {
            t = closest.querySelectorAll('ul')[0];
        }
        inst.l = $KU.filterElements(t.querySelectorAll('li'), 'visible').length;
        clearInterval(inst.minustap);
        inst.minustap = setInterval(function() {inst.minus(t);}, 200);
        inst.minus(t);
    }

  , resetSizes: function() {
        var qs = this.picker.querySelectorAll('.dwwl');
        for(var j=0; j<qs.length; j++) {
            qs[j].style.height = (this.settings.rows * this.h) + 'px';
        }

        qs = this.picker.querySelectorAll('.dww');
        for(var j=0; j<qs.length; j++) {
            //qs[j].style.width = (qs[j].parentNode.offsetWidth < this.settings.width) ? this.settings.width+'px' : qs[j].parentNode.offsetWidth+'px';
            qs[j].style.width = (this.settings.width) ? this.settings.width+'px' : '';
        }

        qs = this.picker.querySelectorAll('.dwbc a');
        for(var j=0; j<qs.length; j++) {
            qs[j].setAttribute('class', this.settings.btnClass);
        }

        qs = this.picker.querySelectorAll('.dww li, .dwwb');
        for(var j=0; j<qs.length; j++) {
            qs[j].style.height = this.h+'px';
            qs[j].style.lineHeight = this.h+'px';
        }

        qs = this.picker.querySelectorAll('ul');
        for(var j=0; j<qs.length; j++) {
            var pos = parseInt(qs[j].getAttribute('pos'), 10);

            if(this.settings.rows > this.tempRows) {
                //qs[j].setAttribute('pos', pos+1);
                this.scroll(qs[j], pos+1);
            } else if(this.settings.rows < this.tempRows) {
                //qs[j].setAttribute('pos', pos-1);
                this.scroll(qs[j], pos-1);
            }

            //pos = parseInt(qs[j].getAttribute('pos'), 10);
            this.tempRows = this.settings.rows;
        }
    }
	
  , init: function() {
        var that = this;
        if(this.settings.display == 'popup') document.getElementById(this.elmId).blur();

        //Mode dependent defaults
        if(this.settings.mode == 'clickpick') {
            this.settings.height = 50;
            this.settings.rows = 3;
        }
        if($KU.isIDevice) {
            this.settings.height = 30;
            //this.settings.rows = 3;
        }
        if(this.settings.display == 'inline') {
            this.settings.dock = '';
            this.settings.modal = false;
            if(this.settings.widgetModel && this.settings.widgetModel.selectedkeys) {
                this.setSelectedKeys(this.settings.widgetModel.selectedkeys);
            }
        }

        this.setDefaults(this.settings);

        if($KU.isTablet) {
            this.settings.rows = 5;
        } else {
            this.settings.rows = (this.settings.mode == 'scroller' && (window.orientation === 0 || window.orientation === 180)) ? 5 : 3;
        }
        this.tempRows = this.settings.rows;
        var ty = this.settings.dateOrder.search(/y/i),
            tm = this.settings.dateOrder.search(/m/i),
            td = this.settings.dateOrder.search(/d/i);
        this.yOrd = ty < tm ? (ty < td ? 0 : 1) : (ty < td ? 1 : 2);
        this.mOrd = tm < ty ? (tm < td ? 0 : 1) : (tm < td ? 1 : 2);
        this.dOrd = td < ty ? (td < tm ? 0 : 1) : (td < tm ? 1 : 2);
        this.preset = (this.settings.wheels === null && this.settings.display == "popup");

        this.picker = document.createElement('div');
        this.picker.id = (this.settings.display == 'popup') ? this.elmId + '_picker' : this.elmId;
        if(this.settings.context && this.settings.context.tabpaneID) this.picker.setAttribute("ktabpaneid", this.settings.context.tabpaneID);
        if(this.settings.widgetModel) {
            this.picker.setAttribute("kformname", this.settings.widgetModel.pf);
            this.picker.setAttribute("kwidgettype", this.settings.widgetModel.wType);
            if(this.settings.widgetModel.margin) this.picker.style.margin = $KU.joinArray(this.settings.widgetModel.margin, "% ") + "%";
            if(this.settings.widgetModel.padding) this.picker.style.padding = $KU.joinArray(this.settings.widgetModel.padding, "% ") + "%";
            
            if(this.settings.widgetModel.isvisible === false) this.picker.style.display = "none";
        }
        if(this.settings.display == 'popup') this.picker.style.minWidth = '300px';
        if(this.settings.display == 'inline') this.picker.style.position = 'static';
        if(this.settings.dock) {
            this.picker.style.width = '100%';
        }
        this.picker.className = (this.settings.theme) ? 'dw '+this.settings.theme : 'dw';

        if(this.preset) {
            //Create preset wheels
            this.settings.wheels = new Array();
            if(this.settings.preset.match(/date/i)) {
                var w = {};
                for (var k = 0; k < 3; k++) {
                    if (k == this.yOrd) {
                        w[this.settings.yearText] = {};
                        for (var i = this.settings.startYear; i <= this.settings.endYear; i++)
                            w[this.settings.yearText][i] = this.settings.dateOrder.search(/yy/i) < 0 ? i.toString().substr(2, 2) : i.toString();
                    }
                    else if (k == this.mOrd) {
                        w[this.settings.monthText] = {};
                        for (var i = 0; i < 12; i++)
                            w[this.settings.monthText][i] =
                                (this.settings.dateOrder.search(/MM/) < 0 ?
                                (this.settings.dateOrder.search(/M/) < 0 ?
                                (this.settings.dateOrder.search(/mm/) < 0 ? (i + 1) : (i < 9) ? ('0' + (i + 1)) : (i + 1)) : this.settings.monthNamesShort[i]) : this.settings.monthNames[i]);
                    }
                    else if (k == this.dOrd) {
                        w[this.settings.dayText] = {};
                        for (var i = 1; i < 32; i++)
                            w[this.settings.dayText][i] = this.settings.dateOrder.search(/dd/i) < 0 ? i : (i < 10) ? ('0' + i) : i;
                    }
                }
                this.settings.wheels.push(w);
            }
            if(this.settings.preset.match(/time/i)) {
                this.settings.stepHour = (this.settings.stepHour < 1) ? 1 : parseInt(this.settings.stepHour);
                this.settings.stepMinute = (this.settings.stepMinute < 1) ? 1 : parseInt(this.settings.stepMinute);
                this.settings.stepSecond = (this.settings.stepSecond < 1) ? 1 : parseInt(this.settings.stepSecond);
                var w = {};
                w[this.settings.hourText] = {};
                for (var i = (this.settings.ampm ? 1 : 0); i < (this.settings.ampm ? 13 : 24); i += this.settings.stepHour)
                    w[this.settings.hourText][i] = (i < 10) ? ('0' + i) : i;
                w[this.settings.minuteText] = {};
                for (var i = 0; i < 60; i += this.settings.stepMinute)
                    w[this.settings.minuteText][i] = (i < 10) ? ('0' + i) : i;
                if (this.settings.seconds) {
                    w[this.settings.secText] = {};
                    for (var i = 0; i < 60; i += this.settings.stepSecond)
                        w[this.settings.secText][i] = (i < 10) ? ('0' + i) : i;
                }
                if (this.settings.ampm) {
                    w[this.settings.ampmText] = {};
                    w[this.settings.ampmText]['AM'] = 'AM';
                    w[this.settings.ampmText]['PM'] = 'PM';
                }
                this.settings.wheels.push(w);
            }
        } else if(this.settings.display == "inline") {
            this.settings.wheels = this.settings.widgetModel.masterdata;
        }

        this.picker.innerHTML  = '<div class="dwv">&nbsp;</div>';
        var showActionButtons = (this.settings.display == "inline") ? " display:none;" : "";
        this.picker.innerHTML += '<div class="dwbc" style="clear:both;'+showActionButtons+'"><span class="dwbw dwb-s"><a id="'+this.picker.id+'_dw_set" href="#">'+this.settings.setText+'</a></span><span class="dwbw dwb-c"><a id="'+this.picker.id+'_dw_cancel" href="#">'+this.settings.cancelText+'</a></span></div>';
        if(this.settings.display == "inline") this.picker.querySelectorAll('.dwv')[0].style.display = "none";

        if(this.settings.display == "inline") this.settings.renderTo = null;
        else if(this.settings.display == "popup") this.settings.renderTo = (this.settings.renderTo) ? this.settings.renderTo : document.getElementsByTagName('body')[0];
        var overlay = document.createElement('div'); overlay.className = 'dwo';
        if(this.settings.modal === false) {
            overlay.style.display = 'none';
            overlay.setAttribute('dummy', 'dummy');
        }

		if(this.settings.renderTo) {
            this.settings.renderTo.appendChild(overlay);
            this.settings.renderTo.appendChild(this.picker);
        }

        this.h = this.settings.height;
        this.m = Math.round(this.settings.rows / 2);

        //Create wheels containers
        this.createComponents();
    }

  , createComponents: function(masterdata, inst) {
        var that = (inst) ? inst : this;
        if(masterdata) {
            that.settings.wheels = masterdata;
            that.settings.widgetModel.masterdata = masterdata;
        }
        if(!that.settings.wheels) return;
        var sub = (that.settings.display == "inline") ? 1 : 0;
        var dwcCSS = that.picker.querySelectorAll('.dwc');
        for(var i=0; i<dwcCSS.length; i++) {
            dwcCSS[i].parentNode.removeChild(dwcCSS[i]);
        }
        that.widths = [];
        //Resetting properties effected by the master data change
        if(that.settings.display == "popup") {
            that.val = null;
            var elm = document.getElementById(that.elmId);
            if((elm && (elm.tagName === 'INPUT' || elm.tagName === 'DIV') && that.val !== null && (that.val != elm.value || that.val != elm.innerText)) || that.values === null) {
                if(elm) {
                    if(elm.tagName === 'INPUT') {
                        that.temp = that.parseValue(elm.value);
                    } else if(elm.tagName === 'DIV') {
                        that.temp = that.parseValue('');//this.temp = this.parseValue(elm.innerText);
                    } else {
                        that.temp = that.parseValue('');
                    }
                } else {
                    that.temp = that.parseValue('');
                }
            } else {
                that.temp = that.values.slice(0);
            }
        }
        else if(that.settings.display == "inline" && that.settings.widgetModel && that.settings.widgetModel.masterdata && !that.settings.widgetModel.selectedkeys) {
            that.values = [];
            that.temp = [];
            for(var m=IndexJL; m<that.settings.widgetModel.masterdata.length; m++) {
                that.values.push(0);
                that.temp.push(0);
            }
        }
        that.setValue(false);
        //Build the markup
        for(var i=IndexJL; i<that.settings.wheels.length; i++) {
            var dwc = document.createElement('div');
            var cls = 'dwc';
            cls = (that.settings.mode != 'scroller') ? cls+' dwpm' : cls+'';
            cls = (that.settings.showLabel) ? cls+'' : cls+' dwhl';
            dwc.className = cls;
            if(!that.preset && that.settings.wheels.length == 1+IndexJL) {
                dwc.style.cssFloat = 'none';
            } else if(!that.preset && that.settings.widgetModel) {
                var tempWidth = that.settings.wheels[i][(that.settings.wheels[i].length-sub)] - 2;
                that.widths.push(tempWidth);
                dwc.style.width = tempWidth+"%";
            }
            dwc.innerHTML = '<div class="dwwc dwrc"><div class="clear" style="clear:both;"></div></div>';

            var dwbcCSS = that.picker.querySelectorAll('.dwbc');
            for(var j=0; j<dwbcCSS.length; j++) {
                dwbcCSS[j].parentNode.insertBefore(dwc, dwbcCSS[j]);
            }

            //Create wheels
			var to1 = dwc.querySelectorAll('.dwwc .clear');
			for(var t=0; t<to1.length; t++) {
				var w = document.createElement('div');
				w.className = 'dwwl dwrc';
				w.innerHTML = (that.settings.mode != 'scroller') ? '<div class="dwwb dwwbp">+</div><div class="dwwb dwwbm">&ndash;</div>' : '';
				//w.innerHTML += '<div class="dwl">' + label + '</div>';
				w.innerHTML += '<div class="dww dwrc"><ul></ul><div class="dwwo"></div></div><div class="dwwol"></div>';
				to1[t].parentNode.insertBefore(w, to1[t]);
			}
			//Create wheel values
			for(var j=IndexJL; j<(that.settings.wheels[i].length-sub); j++) {
				var uls = w.querySelectorAll('ul');
				for(var u=0; u<uls.length; u++) {
					var optValue = $KU.isArray(that.settings.wheels[i][j]) ? that.settings.wheels[i][j][0+IndexJL] : that.settings.wheels[i][j];
					var optText = $KU.isArray(that.settings.wheels[i][j]) ? that.settings.wheels[i][j][1+IndexJL] : that.settings.wheels[i][j];
					if(optText.toLowerCase().indexOf("i18n.getlocalizedstring") != -1)
						optText = $KU.getI18NValue(optText);
					
					if(typeof optText === 'string' || typeof optText === 'number' || typeof optText === 'boolean') {
						uls[u].innerHTML += '<li class="val_' + j + '" val="' + j + '" value="'+optValue+'" text="'+optText+'">' + optText + '</li>';
					}
				}
			}
        }

        //Set scrollers to position
        var uls = this.picker.querySelectorAll('.dww ul');
        for(var i=0; i<uls.length; i++) {
            uls[i].setAttribute('index', i);
            var x = '', lis = null;
            if(!this.preset) {
                for(var wk=IndexJL; wk<this.settings.wheels[i+IndexJL].length; wk++) {
                    lis = uls[i].querySelectorAll('li.val_'+this.wheelDataIndexByTextValue(this.settings.wheels[i+IndexJL][wk], this.temp[i]));
                    break;
                }
            } else {
                lis = uls[i].querySelectorAll('li.val_'+this.temp[i]);
            }
            var x = $KU.elementIndex(lis[0]);
            while ((x < 0) && (--that.temp[i] >= 0)) {
                var li = uls[i].querySelectorAll('li.val_'+that.temp[i])[0];
                x = $KU.elementIndex(li);
            }
            that.scroll(uls[i], this.m - (x < 0 ? 0 : x) - 1);
        }

        //Set value text
        var dwvCSS = this.picker.querySelectorAll('.dwv');
        for(var i=0; i<dwvCSS.length; i++) {
            var dwvRes = (this.preset) ? this.formatResult(false) : this.formatResult(true);
            dwvCSS[i].innerHTML = (dwvRes) ? dwvRes : "";
        }

        //Initial validate
        if(that.settings.wheels) that.validate(-1);

        that.visible = true;
        that.position();

        if(inst) {
            that.registerEvents(inst);
        } else {
            that.registerEvents();
            that.registerEvents(inst);
        }
        that.resetSizes();
    }

  , registerEvents: function(inst) {
        var that = this; //(inst) ? inst : this;

        if(inst) { //Registering events programetically
            if(that.settings.display == "popup") {
                var dw_set = that.picker.querySelectorAll('#'+that.picker.id+'_dw_set')[0];
                var dw_cancel = that.picker.querySelectorAll('#'+that.picker.id+'_dw_cancel')[0];
                dw_set.onclick = function() {
                    that.setValue();
                    that.settings.onSelect(that.val, that);
                    if(that.settings.display == "popup") that.hide();
                    return false;
                };
                dw_cancel.onclick = function() {
                    that.settings.onCancel(that.val, that);
                    if(that.settings.display == "popup") that.hide();
                    return false;
                };
            }

            var dwwlCSStemp = that.picker.querySelectorAll('.dwwl'), dwwlCSS = [];
            for(var i=0; i<dwwlCSStemp.length; i++) {dwwlCSS.push(dwwlCSStemp[i]);}
            dwwlCSS.forEach(function(elm) {
                kony.events.addEventListener(elm, 'mousewheel', function(e) {that.dwwlAttachMouseScroll(e, this, that)}, false);
                kony.events.addEventListener(elm, that.START_EVENT, function(e) {
				    that.dwwlAttachStart(e, this, that);
                }, false);
            });

            var dwb_dwwbCSStemp = that.picker.querySelectorAll('.dwb, .dwwb'), dwb_dwwbCSS = [];
            for(var i=0; i<dwb_dwwbCSStemp.length; i++) {dwb_dwwbCSS.push(dwb_dwwbCSStemp[i]);}
            dwb_dwwbCSS.forEach(function(elm) {
                kony.events.addEventListener(elm, that.START_EVENT, function(e) {
                    that.dwb_dwwbAttachStart(e, this, that);
                }, false);
            });

            var dwwbpCSStemp = that.picker.querySelectorAll('.dwwbp'), dwwbpCSS = [];
            for(var i=0; i<dwwbpCSStemp.length; i++) {dwwbpCSS.push(dwwbpCSStemp[i]);}
            dwwbpCSS.forEach(function(elm) {
                kony.events.addEventListener(elm, that.START_EVENT, function(e) {
                    that.dwwbpAttachStart(e, this, that)
                }, false);
            });

            var dwwbmCSStemp = that.picker.querySelectorAll('.dwwbm'), dwwbmCSS = [];
            for(var i=0; i<dwwbmCSStemp.length; i++) {dwwbmCSS.push(dwwbmCSStemp[i]);}
            dwwbmCSS.forEach(function(elm) {
                kony.events.addEventListener(elm, that.START_EVENT, function(e) {
                    that.dwwbmAttachStart(e, this, that)
                }, false);
            });
        } else {
            kony.events.addEventListener(document, that.MOVE_EVENT, function(e) {
                if(that.move) {
                    kony.events.preventDefault(e);
					kony.events.stopPropagation(e);
                    that.stop = that.getY(e);
                    var val = that.pos + (that.stop - that.start) / that.h;
                    val = val > (that.m - 1 + 1) ? (that.m - 1 + 1) : val;
                    val = val < (that.m - that.l - 1) ? (that.m - that.l - 1) : val;
                    that.scroll(that.target, val);
                }
            }, false);

            kony.events.addEventListener(document, that.END_EVENT, function(e) {
                if(that.move) {
                    kony.events.preventDefault(e);
	    	    kony.events.stopPropagation(e);
                    $KU.removeClassName(that.target, 'dwa');
                    var time = new Date() - that.startTime, val = that.pos + (that.stop - that.start) / that.h;
                    val = val > (that.m - 1 + 1) ? (that.m - 1 + 1) : val;
                    val = val < (that.m - that.l - 1) ? (that.m - that.l - 1) : val;

                    if(time < 300) {
                        var speed = (that.stop - that.start) / time;
                        var dist = (speed * speed) / (2 * 0.0006);
                        if(that.stop - that.start < 0) {
                            dist = -dist;
                        }
                    } else {
                        var dist = that.stop - that.start;
                    }
                    that.calculate(that.target, Math.round(that.pos + dist / that.h), true, Math.round(val));
                    that.move = false;
                    that.target = null;
                }
                clearInterval(that.plustap);
                clearInterval(that.minustap);
                that.plustap = false;
                that.minustap = false;
                $KU.removeClassNames(document.querySelectorAll('.dwb-a'), 'dwb-a');
            }, false);
        }

        if(that.settings.display == "popup" && !inst) {
            var windowChangeEvent = ($KU.isAndroid) ? 'resize' : 'orientationchange';
            kony.events.addEventListener(window, windowChangeEvent, function() {
                if($KU.isTablet) {
                    that.settings.rows = 5;
                } else {
                    that.settings.rows = (that.settings.mode == 'scroller' && (window.orientation === 0 || window.orientation === 180)) ? 5 : 3;
                }
                that.m = Math.round(that.settings.rows / 2);
                that.resetSizes();
                that.position();
            }, false);
        }
    }
};