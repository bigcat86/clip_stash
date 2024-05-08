!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : (t.TinyDatePicker = e());
  })(this, function () {
    "use strict";
    function o() {
      var t = new Date();
      return t.setHours(0, 0, 0, 0), t;
    }
    function l(t, e) {
      return (t && t.toDateString()) === (e && e.toDateString());
    }
    function r(t, e, n) {
      var a = (t = new Date(t)).getDate(),
        o = t.getMonth() + e;
      return (
        t.setDate(1),
        t.setMonth(n ? (12 + o) % 12 : o),
        t.setDate(a),
        t.getDate() < a && t.setDate(0),
        t
      );
    }
    function i(t, e) {
      return (t = new Date(t)).setFullYear(t.getFullYear() + e), t;
    }
    function u(n) {
      return function (t) {
        return (
          (e = "string" == typeof t ? n(t) : t),
          (e = new Date(e)).setHours(0, 0, 0, 0),
          e
        );
        var e;
      };
    }
    function f(t, e, n) {
      return t < e ? e : n < t ? n : t;
    }
    function p(t, e) {
      var n = void 0;
      return function () {
        clearTimeout(n), (n = setTimeout(e, t));
      };
    }
    function h() {}
    function s() {
      for (var t = arguments, e = t[0], n = 1; n < t.length; ++n) {
        var a = t[n] || {};
        for (var o in a) e[o] = a[o];
      }
      return e;
    }
    var d = {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      today: "Today",
      clear: "Clear",
      close: "Close",
    };
    function c(t) {
      t = t || {};
      var n,
        a,
        e = u(
          (t = s(
            {
              lang: d,
              mode: "dp-modal",
              hilightedDate: o(),
              format: function (t) {
                return (
                  t.getMonth() + 1 + "/" + t.getDate() + "/" + t.getFullYear()
                );
              },
              parse: function (t) {
                var e = new Date(t);
                return isNaN(e) ? o() : e;
              },
              dateClass: function () {},
              inRange: function () {
                return !0;
              },
            },
            t
          )).parse
        );
      return (
        (t.lang = s(d, t.lang)),
        (t.parse = e),
        (t.inRange =
          ((a = (n = t).inRange),
          function (t, e) {
            return a(t, e) && n.min <= t && n.max >= t;
          })),
        (t.min = e(t.min || i(o(), -100))),
        (t.max = e(t.max || i(o(), 100))),
        (t.hilightedDate = t.parse(t.hilightedDate)),
        t
      );
    }
    var v = { left: 37, up: 38, right: 39, down: 40, enter: 13, esc: 27 };
    function g(t, e, n) {
      return (
        e.addEventListener(t, n, !0),
        function () {
          e.removeEventListener(t, n, !0);
        }
      );
    }
    var m = (function () {
      var t = window.CustomEvent;
      "function" != typeof t &&
        ((t = function (t, e) {
          e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
          var n = document.createEvent("CustomEvent");
          return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n;
        }).prototype = window.Event.prototype);
      return t;
    })();
    var y = {
      day: {
        onKeyDown: function (t, e) {
          var n = t.keyCode,
            a =
              n === v.left
                ? -1
                : n === v.right
                ? 1
                : n === v.up
                ? -7
                : n === v.down
                ? 7
                : 0;
          n === v.esc
            ? e.close()
            : a &&
              (t.preventDefault(),
              e.setState({
                hilightedDate:
                  ((o = e.state.hilightedDate),
                  (r = a),
                  (o = new Date(o)).setDate(o.getDate() + r),
                  o),
              }));
          var o, r;
        },
        onClick: {
          "dp-day": function (t, e) {
            e.setState({
              selectedDate: new Date(
                parseInt(t.target.getAttribute("data-date"))
              ),
            });
          },
          "dp-next": function (t, e) {
            var n = e.state.hilightedDate;
            e.setState({ hilightedDate: r(n, 1) });
          },
          "dp-prev": function (t, e) {
            var n = e.state.hilightedDate;
            e.setState({ hilightedDate: r(n, -1) });
          },
          "dp-today": function (t, e) {
            e.setState({ selectedDate: o() });
          },
          "dp-clear": function (t, e) {
            e.setState({ selectedDate: null });
          },
          "dp-close": function (t, e) {
            e.close();
          },
          "dp-cal-month": function (t, e) {
            e.setState({ view: "month" });
          },
          "dp-cal-year": function (t, e) {
            e.setState({ view: "year" });
          },
        },
        render: function (r) {
          var i = r.opts,
            t = i.lang,
            e = r.state,
            n = t.days,
            a = i.dayOffset || 0,
            u = e.selectedDate,
            s = e.hilightedDate,
            d = s.getMonth(),
            c = o().getTime();
          return (
            '<div class="dp-cal"><header class="dp-cal-header"><button tabindex="-1" type="button" class="dp-prev">Prev</button><button tabindex="-1" type="button" class="dp-cal-month">' +
            t.months[d] +
            '</button><button tabindex="-1" type="button" class="dp-cal-year">' +
            s.getFullYear() +
            '</button><button tabindex="-1" type="button" class="dp-next">Next</button></header><div class="dp-days">' +
            n
              .map(function (t, e) {
                return (
                  '<span class="dp-col-header">' +
                  n[(e + a) % n.length] +
                  "</span>"
                );
              })
              .join("") +
            (function (t, e, n) {
              var a = "",
                o = new Date(t);
              o.setDate(1),
                o.setDate(1 - o.getDay() + e),
                e && o.getDate() === e + 1 && o.setDate(e - 6);
              for (var r = 0; r < 42; ++r)
                (a += n(o)), o.setDate(o.getDate() + 1);
              return a;
            })(s, a, function (t) {
              var e = t.getMonth() !== d,
                n = !i.inRange(t),
                a = t.getTime() === c,
                o = "dp-day";
              return (
                (o += e ? " dp-edge-day" : ""),
                (o += l(t, s) ? " dp-current" : ""),
                (o += l(t, u) ? " dp-selected" : ""),
                (o += n ? " dp-day-disabled" : ""),
                (o += a ? " dp-day-today" : ""),
                '<button tabindex="-1" type="button" class="' +
                  (o += " " + i.dateClass(t, r)) +
                  '" data-date="' +
                  t.getTime() +
                  '">' +
                  t.getDate() +
                  "</button>"
              );
            }) +
            '</div><footer class="dp-cal-footer"><button tabindex="-1" type="button" class="dp-today">' +
            t.today +
            '</button><button tabindex="-1" type="button" class="dp-clear">' +
            t.clear +
            '</button><button tabindex="-1" type="button" class="dp-close">' +
            t.close +
            "</button></footer></div>"
          );
        },
      },
      year: {
        render: function (t) {
          var e = t.state,
            n = e.hilightedDate.getFullYear(),
            a = e.selectedDate.getFullYear();
          return (
            '<div class="dp-years">' +
            (function (t, e) {
              for (
                var n = "", a = t.opts.max.getFullYear();
                a >= t.opts.min.getFullYear();
                --a
              )
                n += e(a);
              return n;
            })(t, function (t) {
              var e = "dp-year";
              return (
                (e += t === n ? " dp-current" : ""),
                '<button tabindex="-1" type="button" class="' +
                  (e += t === a ? " dp-selected" : "") +
                  '" data-year="' +
                  t +
                  '">' +
                  t +
                  "</button>"
              );
            }) +
            "</div>"
          );
        },
        onKeyDown: function (t, e) {
          var n = t.keyCode,
            a = e.opts,
            o =
              n === v.left || n === v.up
                ? 1
                : n === v.right || n === v.down
                ? -1
                : 0;
          if (n === v.esc) e.setState({ view: "day" });
          else if (o) {
            t.preventDefault();
            var r = i(e.state.hilightedDate, o);
            e.setState({ hilightedDate: f(r, a.min, a.max) });
          }
        },
        onClick: {
          "dp-year": function (t, e) {
            e.setState({
              hilightedDate:
                ((n = e.state.hilightedDate),
                (a = parseInt(t.target.getAttribute("data-year"))),
                (n = new Date(n)).setFullYear(a),
                n),
              view: "day",
            });
            var n, a;
          },
        },
      },
      month: {
        onKeyDown: function (t, e) {
          var n = t.keyCode,
            a =
              n === v.left
                ? -1
                : n === v.right
                ? 1
                : n === v.up
                ? -3
                : n === v.down
                ? 3
                : 0;
          n === v.esc
            ? e.setState({ view: "day" })
            : a &&
              (t.preventDefault(),
              e.setState({ hilightedDate: r(e.state.hilightedDate, a, !0) }));
        },
        onClick: {
          "dp-month": function (t, e) {
            e.setState({
              hilightedDate:
                ((n = e.state.hilightedDate),
                (a = parseInt(t.target.getAttribute("data-month"))),
                r(n, a - n.getMonth())),
              view: "day",
            });
            var n, a;
          },
        },
        render: function (t) {
          var e = t.opts.lang.months,
            a = t.state.hilightedDate.getMonth();
          return (
            '<div class="dp-months">' +
            e
              .map(function (t, e) {
                var n = "dp-month";
                return (
                  '<button tabindex="-1" type="button" class="' +
                  (n += a === e ? " dp-current" : "") +
                  '" data-month="' +
                  e +
                  '">' +
                  t +
                  "</button>"
                );
              })
              .join("") +
            "</div>"
          );
        },
      },
    };
    function D(o, r, a) {
      var t,
        i,
        e,
        n,
        u,
        s,
        d = !1,
        c = {
          el: void 0,
          opts: a,
          shouldFocusOnBlur: !0,
          shouldFocusOnRender: !0,
          state: {
            get selectedDate() {
              return i;
            },
            set selectedDate(t) {
              (t && !a.inRange(t)) ||
                (t ? ((i = new Date(t)), (c.state.hilightedDate = i)) : (i = t),
                c.updateInput(i),
                r("select"),
                c.close());
            },
            view: "day",
          },
          adjustPosition: h,
          containerHTML: '<div class="dp"></div>',
          attachToDom: function () {
            document.body.appendChild(c.el);
          },
          updateInput: function (t) {
            var e = new m("change", { bubbles: !0 });
            (e.simulated = !0),
              (o.value = t ? a.format(t) : ""),
              o.dispatchEvent(e);
          },
          computeSelectedDate: function () {
            return a.parse(o.value);
          },
          currentView: function () {
            return y[c.state.view];
          },
          open: function () {
            var t, e, n;
            d ||
              (c.el ||
                ((c.el =
                  ((t = a),
                  (e = c.containerHTML),
                  ((n = document.createElement("div")).className = t.mode),
                  (n.innerHTML = e),
                  n)),
                (function (a) {
                  var t = a.el,
                    e = t.querySelector(".dp");
                  function n(n) {
                    n.target.className.split(" ").forEach(function (t) {
                      var e = a.currentView().onClick[t];
                      e && e(n, a);
                    });
                  }
                  (t.ontouchstart = h),
                    g(
                      "blur",
                      e,
                      p(150, function () {
                        a.hasFocus() || a.close(!0);
                      })
                    ),
                    g("keydown", t, function (t) {
                      t.keyCode === v.enter
                        ? n(t)
                        : a.currentView().onKeyDown(t, a);
                    }),
                    g("mousedown", e, function (t) {
                      t.target.focus && t.target.focus(),
                        document.activeElement !== t.target &&
                          (t.preventDefault(), b(a));
                    }),
                    g("click", t, n);
                })(c)),
              (i = f(c.computeSelectedDate(), a.min, a.max)),
              (c.state.hilightedDate = i || a.hilightedDate),
              (c.state.view = "day"),
              c.attachToDom(),
              c.render(),
              r("open"));
          },
          isVisible: function () {
            return !!c.el && !!c.el.parentNode;
          },
          hasFocus: function () {
            var t = document.activeElement;
            return (
              c.el && c.el.contains(t) && t.className.indexOf("dp-focuser") < 0
            );
          },
          shouldHide: function () {
            return c.isVisible();
          },
          close: function (t) {
            var e = c.el;
            if (c.isVisible()) {
              if (e) {
                var n = e.parentNode;
                n && n.removeChild(e);
              }
              var a;
              (d = !0),
                t &&
                  c.shouldFocusOnBlur &&
                  ((a = o).focus(),
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                    !window.MSStream &&
                    a.blur()),
                setTimeout(function () {
                  d = !1;
                }, 100),
                r("close");
            }
          },
          destroy: function () {
            c.close(), t();
          },
          render: function () {
            if (c.el && c.el.firstChild) {
              var t = c.hasFocus(),
                e = c.currentView().render(c);
              e && (c.el.firstChild.innerHTML = e),
                c.adjustPosition(),
                (t || c.shouldFocusOnRender) && b(c);
            }
          },
          setState: function (t) {
            for (var e in t) c.state[e] = t[e];
            r("statechange"), c.render();
          },
        };
      return (
        (e = o),
        (n = c),
        (u = p(5, function () {
          n.shouldHide() ? n.close() : n.open();
        })),
        (s = [
          g(
            "blur",
            e,
            p(150, function () {
              n.hasFocus() || n.close(!0);
            })
          ),
          g("mousedown", e, function () {
            e === document.activeElement && u();
          }),
          g("focus", e, u),
          g("input", e, function (t) {
            var e = n.opts.parse(t.target.value);
            isNaN(e) || n.setState({ hilightedDate: e });
          }),
        ]),
        (t = function () {
          s.forEach(function (t) {
            t();
          });
        }),
        c
      );
    }
    function b(t) {
      var e = t.el.querySelector(".dp-current");
      return e && e.focus();
    }
    function w(S, t, e) {
      var x = D(S, t, e);
      return (
        (x.shouldFocusOnBlur = !1),
        Object.defineProperty(x, "shouldFocusOnRender", {
          get: function () {
            return S !== document.activeElement;
          },
        }),
        (x.adjustPosition = function () {
          var t, e, n, a, o, r, i, u, s, d, c, l, f, p, h, v, g, m, y, D, b, w;
          (c = x),
            (l = S.getBoundingClientRect()),
            (f = window),
            (t = l),
            (e = f),
            (n = c.el),
            (a = e.pageYOffset),
            (o = a + t.top),
            (r = n.offsetHeight),
            (i = o + t.height + 8),
            (s = 0 < (u = o - r - 8) && i + r > a + e.innerHeight),
            (d = s ? u : i),
            n.classList &&
              (n.classList.toggle("dp-is-above", s),
              n.classList.toggle("dp-is-below", !s)),
            (n.style.top = d + "px"),
            (p = l),
            (h = f),
            (v = c.el),
            (g = h.pageXOffset),
            (m = p.left + g),
            (y = h.innerWidth + g),
            (D = v.offsetWidth),
            (b = y - D),
            (w = y < m + D && 0 < b ? b : m),
            (v.style.left = w + "px"),
            (c.el.style.visibility = "");
        }),
        x
      );
    }
    function S(t, e, n) {
      return (
        (t = t && t.tagName ? t : document.querySelector(t)),
        "dp-modal" === n.mode
          ? ((o = D((a = t), e, n)),
            (a.readonly = !0),
            (o.containerHTML += '<a href="#" class="dp-focuser">.</a>'),
            o)
          : "dp-below" === n.mode
          ? w(t, e, n)
          : "dp-permanent" === n.mode
          ? (((u = D((r = t), e, (i = n))).close = h),
            (u.destroy = h),
            (u.updateInput = h),
            (u.shouldFocusOnRender = i.shouldFocusOnRender),
            (u.computeSelectedDate = function () {
              return i.hilightedDate;
            }),
            (u.attachToDom = function () {
              r.appendChild(u.el);
            }),
            u.open(),
            u)
          : void 0
      );
      var a, o, r, i, u;
    }
    function x() {
      var a = {};
      function n(t, e) {
        (a[t] = a[t] || []).push(e);
      }
      return {
        on: function (t, e) {
          return (
            e
              ? n(t, e)
              : (function (t) {
                  for (var e in t) n(e, t[e]);
                })(t),
            this
          );
        },
        emit: function (e, n) {
          (a[e] || []).forEach(function (t) {
            t(e, n);
          });
        },
        off: function (t, e) {
          return (
            t
              ? (a[t] = e
                  ? (a[t] || []).filter(function (t) {
                      return t !== e;
                    })
                  : [])
              : (a = {}),
            this
          );
        },
      };
    }
    return function (t, e) {
      var n = x(),
        a = S(
          t,
          function (t) {
            n.emit(t, o);
          },
          c(e)
        ),
        o = {
          get state() {
            return a.state;
          },
          on: n.on,
          off: n.off,
          setState: a.setState,
          open: a.open,
          close: a.close,
          destroy: a.destroy,
        };
      return o;
    };
  });
  