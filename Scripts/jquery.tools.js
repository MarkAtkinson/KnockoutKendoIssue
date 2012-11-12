/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 * 
 * scrollable/scrollable.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */ (function (a) {
    a.tools = a.tools || {
        version: "v1.2.7"
    }, a.tools.scrollable = {
        conf: {
            activeClass: "active",
            circular: !1,
            clonedClass: "cloned",
            disabledClass: "disabled",
            easing: "swing",
            initialIndex: 0,
            item: "> *",
            items: ".items",
            keyboard: !0,
            mousewheel: !1,
            next: ".next",
            prev: ".prev",
            size: 1,
            speed: 400,
            vertical: !1,
            touch: !0,
            wheelSpeed: 0
        }
    };

    function b(a, b) {
        var c = parseInt(a.css(b), 10);
        if (c) return c;
        var d = a[0].currentStyle;
        return d && d.width && parseInt(d.width, 10)
    }
    function c(b, c) {
        var d = a(c);
        return d.length < 2 ? d : b.parent().find(c)
    }
    var d;

    function e(b, e) {
        var f = this,
            g = b.add(f),
            h = b.children(),
            i = 0,
            j = e.vertical;
        d || (d = f), h.length > 1 && (h = a(e.items, b)), e.size > 1 && (e.circular = !1), a.extend(f, {
            getConf: function () {
                return e
            },
            getIndex: function () {
                return i
            },
            getSize: function () {
                return f.getItems().size()
            },
            getNaviButtons: function () {
                return n.add(o)
            },
            getRoot: function () {
                return b
            },
            getItemWrap: function () {
                return h
            },
            getItems: function () {
                return h.find(e.item).not("." + e.clonedClass)
            },
            move: function (a, b) {
                return f.seekTo(i + a, b)
            },
            next: function (a) {
                return f.move(e.size, a)
            },
            prev: function (a) {
                return f.move(-e.size, a)
            },
            begin: function (a) {
                return f.seekTo(0, a)
            },
            end: function (a) {
                return f.seekTo(f.getSize() - 1, a)
            },
            focus: function () {
                d = f;
                return f
            },
            addItem: function (b) {
                b = a(b), e.circular ? (h.children().last().before(b), h.children().first().replaceWith(b.clone().addClass(e.clonedClass))) : (h.append(b), o.removeClass("disabled")), g.trigger("onAddItem", [b]);
                return f
            },
            seekTo: function (b, c, k) {
                b.jquery || (b *= 1);
                if (e.circular && b === 0 && i == -1 && c !== 0) return f;
                if (!e.circular && b < 0 || b > f.getSize() || b < -1) return f;
                var l = b;
                b.jquery ? b = f.getItems().index(b) : l = f.getItems().eq(b);
                var m = a.Event("onBeforeSeek");
                if (!k) {
                    g.trigger(m, [b, c]);
                    if (m.isDefaultPrevented() || !l.length) return f
                }
                var n = j ? {
                    top: -l.position().top
                } : {
                    left: -l.position().left
                };
                i = b, d = f, c === undefined && (c = e.speed), h.animate(n, c, e.easing, k || function () {
                    g.trigger("onSeek", [b])
                });
                return f
            }
        }), a.each(["onBeforeSeek", "onSeek", "onAddItem"], function (b, c) {
            a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) {
                b && a(f).on(c, b);
                return f
            }
        });
        if (e.circular) {
            var k = f.getItems().slice(-1).clone().prependTo(h),
                l = f.getItems().eq(1).clone().appendTo(h);
            k.add(l).addClass(e.clonedClass), f.onBeforeSeek(function (a, b, c) {
                if (!a.isDefaultPrevented()) {
                    if (b == -1) {
                        f.seekTo(k, c, function () {
                            f.end(0)
                        });
                        return a.preventDefault()
                    }
                    b == f.getSize() && f.seekTo(l, c, function () {
                        f.begin(0)
                    })
                }
            });
            var m = b.parents().add(b).filter(function () {
                if (a(this).css("display") === "none") return !0
            });
            m.length ? (m.show(), f.seekTo(0, 0, function () {}), m.hide()) : f.seekTo(0, 0, function () {})
        }
        var n = c(b, e.prev).click(function (a) {
            a.stopPropagation(), f.prev()
        }),
            o = c(b, e.next).click(function (a) {
                a.stopPropagation(), f.next()
            });
        e.circular || (f.onBeforeSeek(function (a, b) {
            setTimeout(function () {
                a.isDefaultPrevented() || (n.toggleClass(e.disabledClass, b <= 0), o.toggleClass(e.disabledClass, b >= f.getSize() - 1))
            }, 1)
        }), e.initialIndex || n.addClass(e.disabledClass)), f.getSize() < 2 && n.add(o).addClass(e.disabledClass), e.mousewheel && a.fn.mousewheel && b.mousewheel(function (a, b) {
            if (e.mousewheel) {
                f.move(b < 0 ? 1 : -1, e.wheelSpeed || 50);
                return !1
            }
        });
        if (e.touch) {
            var p = {};
            h[0].ontouchstart = function (a) {
                var b = a.touches[0];
                p.x = b.clientX, p.y = b.clientY
            }, h[0].ontouchmove = function (a) {
                if (a.touches.length == 1 && !h.is(":animated")) {
                    var b = a.touches[0],
                        c = p.x - b.clientX,
                        d = p.y - b.clientY;
                    f[j && d > 0 || !j && c > 0 ? "next" : "prev"](), a.preventDefault()
                }
            }
        }
        e.keyboard && a(document).on("keydown.scrollable", function (b) {
            if (!(!e.keyboard || b.altKey || b.ctrlKey || b.metaKey || a(b.target).is(":input"))) {
                if (e.keyboard != "static" && d != f) return;
                var c = b.keyCode;
                if (j && (c == 38 || c == 40)) {
                    f.move(c == 38 ? -1 : 1);
                    return b.preventDefault()
                }
                if (!j && (c == 37 || c == 39)) {
                    f.move(c == 37 ? -1 : 1);
                    return b.preventDefault()
                }
            }
        }), e.initialIndex && f.seekTo(e.initialIndex, 0, function () {})
    }
    a.fn.scrollable = function (b) {
        var c = this.data("scrollable");
        if (c) return c;
        b = a.extend({}, a.tools.scrollable.conf, b), this.each(function () {
            c = new e(a(this), b), a(this).data("scrollable", c)
        });
        return b.api ? c : this
    }
})(jQuery);