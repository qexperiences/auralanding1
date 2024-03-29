(function(e) {
    e.fn.niceselect = function() {
        return this.each(function(t, n) {
            var r = e(this).attr("name");
            var i = e(this);
            var s = t;
            var o = false;
            var u = "";
            var a = "radio";
            var f = "";
            var l = "";
            var c = "";
            var h = "Select";
            if (i.attr("multiple") !== undefined) {
                o = true;
                u = "[]";
                a = "checkbox"
            }
            if (e(this).attr("class") !== undefined) {
                var l = e(this).attr("class")
            }
            if (i.find('[value="placeholder"]').length > 0) {
                h = i.find('[value="placeholder"]').html()
            }
            if (typeof i.attr("required") != "undefined") {
                f = "required"
            }
            i.wrap('<div class="select-style ' + l + '"/>');
            e('<span class="selectcon">&nbsp;</span>').insertBefore(i);
            e('<div class="niceselect ' + r + '" data-multi="' + o + '"><p class="top">' + h + '</p><div class="value-wrapper"></div></div>').insertBefore(this);
            if (i.find("optgroup").length > 0) {
                i.find("optgroup").each(function(t, n) {
                    i.siblings(".niceselect").children(".value-wrapper").append('<div class="opt opt' + t + '"><span class="optTitle">' + e(n).attr("label") + "</span></div>");
                    e(n).find("option").each(function(n, s) {
                        var o;
                        if (e(this).val() == "") {
                            o = e(this).html()
                        } else {
                            o = e(this).val()
                        }
                        var l = e(this).html();
                        c = "";
                        if (typeof e(this).attr("selected") != "undefined") {
                            c = "checked";
                            i.siblings(".niceselect").find("p.top").html(l)
                        }
                        i.siblings(".niceselect").find(".opt" + t).append('<div class="values"><input type="' + a + '"  ' + f + " " + c + ' style=" pointer-events: none;" name="' + r + u + '" value="' + o + '" data-text="' + l + '" id="' + n + r + n + '" /> <label class="nice-label" >' + l + "</label></div>")
                    })
                })
            } else {
                i.find("option").each(function(t, n) {
                    var s = e(this);
                    var o;
                    if (e(this).val() == "") {
                        o = e(this).html()
                    } else {
                        o = e(this).val()
                    }
                    var l = e(this).html();
                    c = "";
                    if (typeof e(this).attr("selected") != "undefined") {
                        c = "checked";
                        i.siblings(".niceselect").find("p.top").html(l)
                    }
                    i.siblings(".niceselect").children(".value-wrapper").append('<div class="values"><input type="' + a + '" ' + f + " " + c + ' style=" pointer-events: none;" name="' + r + u + '" value="' + o + '" data-text="' + l + '" id="' + t + r + t + '" /> <label class="nice-label" >' + l + "</label></div>")
                })
            }
            i.remove();
            i.attr("name", "blobla");
            e("body").on("click", function() {
                e(".niceselect .value-wrapper").hide();
                e(".select-style").removeClass("active")
            });
            e("body").on("click", ".niceselect", function(t) {
                t.stopImmediatePropagation();
                if (e(this).parent().hasClass("active")) {
                    e(this).find(".value-wrapper").hide();
                    e(this).parent().removeClass("active");
                    console.log("here")
                } else {
                    e(this).children(".value-wrapper").show();
                    e(this).parent().addClass("active")
                }
            });
            e("body").on("click", ".niceselect .value-wrapper .values", function(t) {
                t.stopImmediatePropagation();
                var n = e(this).find("input");
                var r = e(this).parent().parent();
                if (r.attr("data-multi") == "true") {
                    if (e(this).hasClass("active")) {
                        e(this).removeClass("active")
                    } else {
                        e(this).addClass("active")
                    }
                } else {
                    e(this).parent().parent().find("input[checked]").removeAttr("checked");
                    e(this).parent().parent().find(".active").removeClass("active");
                    if (e(this).hasClass("active")) {
                        e(this).removeClass("active")
                    } else {
                        e(this).addClass("active")
                    }
                    e(".niceselect .value-wrapper").hide();
                    e(".select-style").removeClass("active")
                }
                n.prop("checked", !n.prop("checked"));
                n.trigger("change")
            });
            e("body").on("click", ".niceselect .value-wrapper .values label", function(e) {
                e.preventDefault()
            });
            e("body").on("change", ".niceselect .values input", function(t) {
                var n = e(this).closest(".niceselect");
                if (n.attr("data-multi") == "true") {
                    var r = n.find("input:checked").length;
                    n.find("p.top").html(r + " Selected")
                } else {
                    n.find("p.top").html(e(this).attr("data-text"))
                }
            });
            var p = "";
            e("body").on("keypress", function(t) {
                if (e(".value-wrapper").is(":visible")) {
                    var n;
                    e(".value-wrapper .highlight").removeClass("highlight");
                    clearInterval(n);
                    p = p + String.fromCharCode(t.which);
                    if (p.length == 1) {
                        p = p.toUpperCase()
                    }
                    var r = e(".value-wrapper:visible").find("label:contains(" + p + ")").first();
                    e(r).parent().addClass("highlight");
                    if (e(".value-wrapper:visible").find(".highlight").length > 0) {
                        e(".value-wrapper:visible").stop().scrollTop(e(".value-wrapper:visible").scrollTop() + e(".highlight").position().top)
                    }
                    n = setTimeout(function() {
                        p = ""
                    }, 500)
                }
            })
        })
    }
})(jQuery)