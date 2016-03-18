/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Persist */

//<editor-fold defaultstate="collapsed" desc="Utils">
$.fn.serializeObject = function ()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.prependClass = function (strClass) {
    var $el = this;

    /* prepend class */
    var classes = $el.attr('class');
    if (typeof classes === "undefined") {
        classes = "";
    }
    classes = strClass + ' ' + classes;
    $el.attr('class', classes);

    return this;
};

JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string")
            obj = '"' + obj + '"';
        return String(obj);
    } else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n];
            t = typeof (v);
            if (t == "string")
                v = '"' + v + '"';
            else if (t == "object" && v !== null)
                v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

function action_form(element, v3) {
    var correcto = true;
    var entro = false;
    var str_compare = $(element).prop('type');
    do {
        var sigue = false;
        //console.log(str_compare);
        switch (str_compare) {
            case 'checkbox':
                $(element + "[value='" + v3 + "']").attr('checked', true).change();
                break;
            case 'radio':
                $(element + "[value='" + v3 + "']").attr('checked', true).change();
                break;
            case 'textarea':
            case 'select-one':
            case 'hidden':
            case 'text':
                $(element).val(v3);
                break;
            case 'undefined':

            default :
                if (!entro) {
                    element = element.slice(0, element.length - 2) + "[]']";
                    if ($(element).exists()) {
                        str_compare = $(element)[0].type;
                        str_compare = str_compare.trim();
                        sigue = true;

                    }
                    entro = true;
                } else {
                    //console.warn($(element));
                    correcto = false;
                }

                break;
        }
    } while (sigue);
    return correcto;
    //console.log($(element).prop('type'));
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Old Functions">

var hexcase = 0;
var b64pad = "";
var chrsz = 8;

function hex_md5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function b64_md5(s) {
    return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}

function str_md5(s) {
    return binl2str(core_md5(str2binl(s), s.length * chrsz));
}

function hex_hmac_md5(key, data) {
    return binl2hex(core_hmac_md5(key, data));
}

function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data));
}

function str_hmac_md5(key, data) {
    return binl2str(core_hmac_md5(key, data));
}

function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

function core_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}

function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16)
        bkey = core_md5(bkey, key.length * chrsz);

    var ipad = Array(16),
            opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}

function binl2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
    return str;
}

function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
}

function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32)
                str += b64pad;
            else
                str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}

function utf8Encode(argString) {

    if (argString === null || typeof argString === 'undefined') {
        return '';
    }

    var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = '',
            start, end, stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                    );
        } else if ((c1 & 0xF800) != 0xD800) {
            enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                    );
        } else { // surrogate pairs
            if ((c1 & 0xFC00) != 0xD800) {
                throw new RangeError('Unmatched trail surrogate at ' + n);
            }
            var c2 = string.charCodeAt(++n);
            if ((c2 & 0xFC00) != 0xDC00) {
                throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
            }
            c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
            enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                    );
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.slice(start, stringl);
    }

    return utftext;
}

function initVersion() {
    var url = "../api/versions";

    $.get(url, function (result) {
        var options = $("#version");
        $.each(result, function () {
            options.append($("<option />").val(this).text(this));
        });
    });

}

window.onload = function () {
    initVersion();
};

function generarFirmaMd5() {

    if (document.form1.clave.value == "") {
        var clave = 1111111111111111;
    } else {
        var clave = document.form1.clave.value;
    }
    if (document.form1.usuarioId.value == "") {
        var usuarioId = 2;
    } else {
        var usuarioId = document.form1.usuarioId.value;
    }
    var refVenta = document.form1.refVenta.value;
    var valor = document.form1.valor.value;
    var moneda = document.form1.moneda.value;

    var cadenaAFirmar = clave + "~" + usuarioId + "~" + refVenta + "~" + valor + "~" + moneda;

    alert("Cadena para firmar: " + utf8Encode(cadenaAFirmar));

    document.form1.firma.value = hex_md5(utf8Encode(cadenaAFirmar));

}

function generarFirma() {
    if (document.form1.clave.value == "") {
        var clave = 1111111111111111;
    } else {
        var clave = document.form1.clave.value;
    }
    if (document.form1.merchantId.value == "") {
        var usuarioId = 2;
    } else {
        var usuarioId = document.form1.merchantId.value;
    }
    var refVenta = document.form1.referenceCode.value;
    var valor = document.form1.amount.value;
    var moneda = document.form1.currency.value;

    var iin = document.form1.iin.value;
    var paymentMethods = document.form1.paymentMethods.value;
    var shippingValue = document.form1.shippingValue.value;

    var cadenaAFirmar = clave + "~" + usuarioId + "~" + refVenta + "~" + valor + "~" + moneda;

    if (paymentMethods != "") {
        cadenaAFirmar = cadenaAFirmar + "~" + paymentMethods;
    }

    if (iin != "") {
        cadenaAFirmar = cadenaAFirmar + "~" + iin;
    }

    if (shippingValue != "") {
        cadenaAFirmar = cadenaAFirmar + "~" + shippingValue;
    }

    alert("Cadena para firmar: " + utf8Encode(cadenaAFirmar));

    var algoritmoFirma = document.getElementById("algoritmo").value;
    if (algoritmoFirma == "sha") {
        document.form1.firma.value = hex_sha1(utf8Encode(cadenaAFirmar));
    } else {
        document.form1.firma.value = hex_md5(utf8Encode(cadenaAFirmar));
    }
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="UI - UX Functions">
$(document).ready(function () {
    $("form").on("change", "#aplicaPagoContraEntrega", function () {
        toggle(this, ".form_contraentrega");
    });
    toggle(this, ".form_contraentrega");

    $(".form").on("change", "[name=test]", function () {
        toogle_tamplate(this);
    });
    toogle_tamplate(this);
});

function toogle_tamplate(chkbox) {
    if (chkbox.checked) {
        $("body").prependClass("orange");
    } else {
        $("body").removeClass("orange");
    }

    $("[name=test]")
            .attr("checked", chkbox.checked)
            .prop('checked', chkbox.checked);
}

function toggle(chkbox, group) {
    $(group).removeClass("inactive active");

    if (chkbox.checked) {
        $(group).addClass("active");
    } else {
        $(group).addClass("inactive");
    }
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Analytics">
(
        function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-55528054-1', 'auto');
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Form controls">


$(function () {
    // load persistent store after the DOM has loaded
    configs = [];
    KEYSTORE = "configs";
    dataForm = null;
    store = new Persist.Store(KEYSTORE, {
        domain: 'localstorage'
    });
    initConfigs();
    paintConfigs();

    $(".forms").on("click", "button.danger", function () {
        var that = $(this);
        var index = that.parents("[form-id]").eq(0).attr("form-id");
        deleteConfig(index);
    });

    $(".options").on("click", ".save", function () {
        saveConfig("[name=form1]");
        paintConfigs();
    });

    $(".forms").on("click", "button.watch", function () {
        var that = $(this);
        var index = that.parents("[form-id]").eq(0).attr("form-id");
        watchConfig(index);
    });

});

//<editor-fold defaultstate="collapsed" desc="CRUD Configs">
var initConfigs = function () {
    var val = store.get(KEYSTORE);
    configs = JSON.parse(val);
    configs = configs ? configs : [];

    $.each(configs, function (k, test) {
        for (var i in test) {
            if (test[i] === null || test[i] === undefined || !test[i]) {
                // test[i] === undefined is probably not very useful here
                delete test[i];
            }
        }
    });

    saveLocal(configs);
    console.warn(configs, "ESTOS SON LOS FORMULARIOS GUARDADOS");
};

var paintConfigs = function () {
    var dad = $(".forms");
    if (!dataForm) {
        dataForm = dad.children().eq(0).clone(true);
    }
    dad.empty();

    //console.log(data, dad);

    $.each(configs, function (k, v) {
        //dad.insertAfter("div.car_well:last").append(data);
        //data.clone().app
        dataForm.attr("form-id", k);
        $("header h2", dataForm).text(v.title);
        $("details p", dataForm).text(JSON.stringify(v, null, 2));

        dad.append(dataForm.clone());
    });

    saveLocal(configs);
};

var deleteConfig = function (index) {
    if (index > -1) {
        configs.splice(index, 1);
    }
    paintConfigs();
};

var saveConfig = function (selector) {
    var test = $(selector).serializeObject();

    for (var i in test) {
        if (test[i] === null || test[i] === undefined || !test[i]) {
            // test[i] === undefined is probably not very useful here
            delete test[i];
        }
    }

    configs.push(test);
    //$.removeCookie(KEYSTORE);
    saveLocal(configs);
};

var saveLocal = function (configs) {
    var lots_of_data = JSON.stringify(configs); // value with lots of data

    try {
        // check size of data
        if (Persist.size !== -1 && Persist.size < lots_of_data.length)
            throw new Error('too much data');
        // try and save data
        store.set(KEYSTORE, lots_of_data);
    } catch (err) {
        // display save error
        alert("Couldn't save data: " + err);
    }
};

var watchConfig = function (index) {
    var selector = "[name=form1]";
    $.each(configs[index], function (k, v) {
        action_form(selector + " " + "[name=" + k + "]", v);
    });
};

//</editor-fold>

//</editor-fold>