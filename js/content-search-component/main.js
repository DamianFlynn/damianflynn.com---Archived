webpackJsonp([0, 2], {
   "/fcW": function(n, l) {
       function t(n) {
           throw new Error("Cannot find module '" + n + "'.")
       }
       t.keys = function() {
           return []
       }, t.resolve = t, n.exports = t, t.id = "/fcW"
   },
   0: function(n, l, t) {
       n.exports = t("x35b")
   },
   "0v/h": function(n, l, t) {
       "use strict";
       var e = t("3j3K"),
           u = t("M4fF"),
           r = (t.n(u), t("vAuz")),
           i = t("O0FT"),
           s = t("kZql");
       t.d(l, "a", function() {
           return o
       });
       var o = function() {
               function n(n) {
                   this.rimSearch = n, this.tagSelected = new e.R, this.selected = !1, this.environment = s.a
               }
               return n.prototype.ngOnInit = function() {}, n.prototype.ngOnChanges = function(n) {
                   n.results && !Array.isArray(n.results.previousValue) ? this.filteredResults = this.formatTags() : n.results && this.results && this.term !== this.currentTerm && (this.newResults = this.formatTags(), this.filteredResults && !u.isEqual(this.filteredResults, this.newResults) && (this.filteredResults = this.newResults))
               }, n.prototype.formatTags = function() {
                   return this.results = (new i.a).transform(this.results), this.currentTerm = this.term, this.results.map(function(n) {
                       return new a(n, !1)
                   })
               }, n.prototype.filterTag = function(n) {
                   n.selected = !0, this.selected = !0, this.rimSearch.addTagFilter(n.name), this.tagSelected.emit({
                       value: n.name
                   })
               }, n.prototype.clearTagFilter = function() {
                   this.selected = !1, this.rimSearch.clearTagFilter(), this.tagSelected.emit({
                       value: ""
                   }), this.filteredResults && (this.filteredResults = this.filteredResults.map(function(n) {
                       var l = n.name;
                       n.selected;
                       return new a(l, !1)
                   }))
               }, n.ctorParameters = function() {
                   return [{
                       type: r.a
                   }]
               }, n
           }(),
           a = function() {
               function n(n, l) {
                   this.name = n, this.selected = l
               }
               return n
           }()
   },
   "1A80": function(n, l, t) {
       "use strict";

       function e(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 4, "div", [], null, null, null, null, null)), (n()(), f._17(null, ["\n          "])), (n()(), f._16(0, null, null, 1, "h3", [], null, null, null, null, null)), (n()(), f._17(null, ["No results found."])), (n()(), f._17(null, ["\n        "]))], null, null)
       }

       function u(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 11, "div", [], null, null, null, null, null)), (n()(), f._17(null, ["\n        "])), (n()(), f._16(0, null, null, 1, "rim-result-set", [], [
               [8, "hidden", 0]
           ], [
               [null, "runSearch"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("runSearch" === l) {
                   e = !1 !== u.reLaunchSearch(t) && e
               }
               return e
           }, p.a, p.b)), f._18(57344, null, 0, h.a, [], {
               response: [0, "response"],
               term: [1, "term"]
           }, {
               runSearch: "runSearch"
           }), (n()(), f._17(null, ["\n        "])), (n()(), f._19(8388608, null, null, 1, null, e)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n        "])), (n()(), f._16(0, null, null, 2, "rim-paging", [], [
               [8, "hidden", 0]
           ], [
               [null, "pageChange"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("pageChange" === l) {
                   e = !1 !== u.search(u.searchTerm, t.url) && e
               }
               return e
           }, m.a, m.b)), f._18(57344, null, 0, d.a, [], {
               pageInfo: [0, "pageInfo"]
           }, {
               pageChange: "pageChange"
           }), f._20(1), (n()(), f._17(null, ["\n    "]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, t.response, t.searchTerm), n(l, 6, 0, 0 == (null == t.response.results ? null : t.response.results.length)), n(l, 9, 0, f._21(l, 9, 0, n(l, 10, 0, f._22(l.parent.parent, 0), t.response)))
           }, function(n, l) {
               var t = l.component;
               n(l, 2, 0, (null == t.response ? null : t.response.length) > 0), n(l, 8, 0, 0 == (null == t.response.results ? null : t.response.results.length))
           })
       }

       function r(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 7, "div", [
               ["class", "rim-search-container ui text container"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n    "])), (n()(), f._16(0, null, null, 1, "rim-input-field", [], null, [
               [null, "termReceived"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("termReceived" === l) {
                   e = !1 !== u.setTerm(t) && e
               }
               return e
           }, v.a, v.b)), f._18(2121728, null, 0, b.a, [y.a], {
               isLoading: [0, "isLoading"],
               term: [1, "term"]
           }, {
               termReceived: "termReceived"
           }), (n()(), f._17(null, ["\n    "])), (n()(), f._19(8388608, null, null, 1, null, u)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, t.isLoading, t.searchTerm), n(l, 6, 0, null == t.response ? null : t.response.results)
           }, null)
       }

       function i(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 4, "div", [], null, null, null, null, null)), (n()(), f._17(null, ["\n          "])), (n()(), f._16(0, null, null, 1, "h3", [], null, null, null, null, null)), (n()(), f._17(null, ["No results found."])), (n()(), f._17(null, ["\n        "]))], null, null)
       }

       function s(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 11, "div", [], null, null, null, null, null)), (n()(), f._17(null, ["\n        "])), (n()(), f._16(0, null, null, 1, "rim-result-set", [], [
               [8, "hidden", 0]
           ], [
               [null, "runSearch"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("runSearch" === l) {
                   e = !1 !== u.reLaunchSearch(t) && e
               }
               return e
           }, p.a, p.b)), f._18(57344, null, 0, h.a, [], {
               response: [0, "response"],
               term: [1, "term"]
           }, {
               runSearch: "runSearch"
           }), (n()(), f._17(null, ["\n        "])), (n()(), f._19(8388608, null, null, 1, null, i)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n        "])), (n()(), f._16(0, null, null, 2, "rim-paging", [], [
               [8, "hidden", 0]
           ], [
               [null, "pageChange"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("pageChange" === l) {
                   e = !1 !== u.search(u.searchTerm, t.url) && e
               }
               return e
           }, m.a, m.b)), f._18(57344, null, 0, d.a, [], {
               pageInfo: [0, "pageInfo"]
           }, {
               pageChange: "pageChange"
           }), f._20(1), (n()(), f._17(null, ["\n    "]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, t.response, t.searchTerm), n(l, 6, 0, 0 == (null == t.response.results ? null : t.response.results.length)), n(l, 9, 0, f._21(l, 9, 0, n(l, 10, 0, f._22(l.parent.parent, 0), t.response)))
           }, function(n, l) {
               var t = l.component;
               n(l, 2, 0, (null == t.response ? null : t.response.length) > 0), n(l, 8, 0, 0 == (null == t.response.results ? null : t.response.results.length))
           })
       }

       function o(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 7, "div", [
               ["class", "rim-search-container container"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n    "])), (n()(), f._16(0, null, null, 1, "rim-input-field", [], null, [
               [null, "termReceived"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("termReceived" === l) {
                   e = !1 !== u.setTerm(t) && e
               }
               return e
           }, v.a, v.b)), f._18(2121728, null, 0, b.a, [y.a], {
               isLoading: [0, "isLoading"],
               term: [1, "term"]
           }, {
               termReceived: "termReceived"
           }), (n()(), f._17(null, ["\n    "])), (n()(), f._19(8388608, null, null, 1, null, s)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, t.isLoading, t.searchTerm), n(l, 6, 0, null == t.response ? null : t.response.results)
           }, null)
       }

       function a(n) {
           return f._15(0, [f._23(0, S.a, []), (n()(), f._17(null, ["\n"])), (n()(), f._19(8388608, null, null, 1, null, r)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n"])), (n()(), f._17(null, ["\n\n"])), (n()(), f._17(null, ["\n"])), (n()(), f._19(8388608, null, null, 1, null, o)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n"])), (n()(), f._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, "semanticui" == t.environment.cssConfig), n(l, 8, 0, "bootstrap" == t.environment.cssConfig)
           }, null)
       }

       function _(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 1, "rim-search", [], null, null, null, a, C)), f._18(24576, null, 0, I.a, [f.V, y.a], null, null)], null, null)
       }
       var c = t("l0Vc"),
           f = t("3j3K"),
           p = t("kP2N"),
           h = t("7qFN"),
           g = t("2Je8"),
           m = t("qh+V"),
           d = t("hq9a"),
           v = t("ODy2"),
           b = t("RRx8"),
           y = t("vAuz"),
           S = t("GLl/"),
           I = t("YWx4");
       t.d(l, "a", function() {
           return R
       });
       var O = [c.a],
           C = f._14({
               encapsulation: 0,
               styles: O,
               data: {}
           }),
           R = f._24("rim-search", I.a, _, {}, {}, [])
   },
   "1n+e": function(n, l, t) {
       "use strict";
       var e = t("kZql");
       t.d(l, "a", function() {
           return u
       });
       var u = function() {
           function n() {
               this.environment = e.a
           }
           return n.prototype.ngOnInit = function() {}, n.ctorParameters = function() {
               return []
           }, n
       }()
   },
   "29GR": function(n, l, t) {
       "use strict";
       t.d(l, "a", function() {
           return e
       });
       var e = ["span.page-count[_ngcontent-%COMP%]{padding:0 1rem}"]
   },
   "3zRW": function(n, l, t) {
       "use strict";

       function e(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 0, "p", [], [
               [8, "innerHTML", 1]
           ], null, null, null, null))], null, function(n, l) {
               n(l, 0, 0, l.context.$implicit)
           })
       }

       function u(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 1, "span", [
               ["class", "ui grey author"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n        ", "\n      "]))], null, function(n, l) {
               n(l, 1, 0, l.context.$implicit)
           })
       }

       function r(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 4, "div", [
               ["class", "rim-result-item-author meta"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n      Written by:\n      "])), (n()(), v._19(8388608, null, null, 1, null, u)), v._18(401408, null, 0, b.h, [v._0, v._1, v.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), v._17(null, ["\n    "]))], function(n, l) {
               n(l, 3, 0, l.component.item.authors)
           }, null)
       }

       function i(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 1, "span", [
               ["class", "ui small basic label"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["", " "]))], null, function(n, l) {
               n(l, 1, 0, l.context.$implicit)
           })
       }

       function s(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 4, "div", [
               ["class", "rim-result-item-tags meta"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n      "])), (n()(), v._19(8388608, null, null, 1, null, i)), v._18(401408, null, 0, b.h, [v._0, v._1, v.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), v._17(null, ["\n    "]))], function(n, l) {
               n(l, 3, 0, l.component.item.tags)
           }, null)
       }

       function o(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 27, "div", [
               ["class", "rim-result-item ui vertical segment"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n  "])), (n()(), v._16(0, null, null, 24, "div", [
               ["class", "content"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n    "])), (n()(), v._16(0, null, null, 3, "span", [
               ["class", "rim-result-item-title ui header"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n      "])), (n()(), v._16(0, null, null, 0, "a", [
               ["class", "rim-result-item-link"]
           ], [
               [8, "href", 4],
               [8, "innerHTML", 1]
           ], null, null, null, null)), (n()(), v._17(null, ["\n    "])), (n()(), v._17(null, ["\n    "])), (n()(), v._16(0, null, null, 4, "div", [
               ["class", "meta"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n      "])), (n()(), v._16(0, null, null, 1, "a", [
               ["class", "rim-result-item-link"]
           ], [
               [8, "href", 4]
           ], null, null, null, null)), (n()(), v._17(null, ["", ""])), (n()(), v._17(null, ["\n    "])), (n()(), v._17(null, ["\n\n    "])), (n()(), v._16(0, null, null, 4, "div", [
               ["class", "rim-result-item-description description"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n      "])), (n()(), v._19(8388608, null, null, 1, null, e)), v._18(401408, null, 0, b.h, [v._0, v._1, v.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), v._17(null, ["\n    "])), (n()(), v._17(null, ["\n\n    "])), (n()(), v._19(8388608, null, null, 1, null, r)), v._18(8192, null, 0, b.f, [v._0, v._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), v._17(null, ["\n\n    "])), (n()(), v._19(8388608, null, null, 1, null, s)), v._18(8192, null, 0, b.f, [v._0, v._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), v._17(null, ["\n  "])), (n()(), v._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 18, 0, t.item.excerpts), n(l, 22, 0, (null == t.item.authors ? null : t.item.authors.length) > 0), n(l, 25, 0, (null == t.item.tags ? null : t.item.tags.length) > 0)
           }, function(n, l) {
               var t = l.component;
               n(l, 6, 0, t.item.url, t.item.title), n(l, 11, 0, t.item.url), n(l, 12, 0, t.item.url)
           })
       }

       function a(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 0, "p", [], [
               [8, "innerHTML", 1]
           ], null, null, null, null))], null, function(n, l) {
               n(l, 0, 0, l.context.$implicit)
           })
       }

       function _(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 1, "span", [
               ["class", "card-text"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n        ", "\n      "]))], null, function(n, l) {
               n(l, 1, 0, l.context.$implicit)
           })
       }

       function c(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 4, "div", [
               ["class", "rim-result-item-author"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n      Written by:\n      "])), (n()(), v._19(8388608, null, null, 1, null, _)), v._18(401408, null, 0, b.h, [v._0, v._1, v.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), v._17(null, ["\n    "]))], function(n, l) {
               n(l, 3, 0, l.component.item.authors)
           }, null)
       }

       function f(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 1, "span", [
               ["class", "tag tag-default badge badge-default"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["", " "]))], null, function(n, l) {
               n(l, 1, 0, l.context.$implicit)
           })
       }

       function p(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 4, "div", [
               ["class", "rim-result-item-tags card-text"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n      "])), (n()(), v._19(8388608, null, null, 1, null, f)), v._18(401408, null, 0, b.h, [v._0, v._1, v.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), v._17(null, ["\n    "]))], function(n, l) {
               n(l, 3, 0, l.component.item.tags)
           }, null)
       }

       function h(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 29, "div", [
               ["class", "rim-result-item card"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n  "])), (n()(), v._16(0, null, null, 26, "div", [
               ["class", "card-block"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n    "])), (n()(), v._16(0, null, null, 3, "span", [
               ["class", "rim-result-item-title"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n      "])), (n()(), v._16(0, null, null, 0, "a", [
               ["class", "rim-result-item-link card-title"]
           ], [
               [8, "href", 4],
               [8, "innerHTML", 1]
           ], null, null, null, null)), (n()(), v._17(null, ["\n    "])), (n()(), v._17(null, ["\n    "])), (n()(), v._16(0, null, null, 6, "div", [], null, null, null, null, null)), (n()(), v._17(null, ["\n      "])), (n()(), v._16(0, null, null, 0, "i", [
               ["class", "fa fa-link"]
           ], null, null, null, null, null)), (n()(), v._17(null, [" "])), (n()(), v._16(0, null, null, 1, "a", [
               ["class", "rim-result-item-link card-subtitle"]
           ], [
               [8, "href", 4]
           ], null, null, null, null)), (n()(), v._17(null, ["", ""])), (n()(), v._17(null, ["\n    "])), (n()(), v._17(null, ["\n    "])), (n()(), v._16(0, null, null, 4, "div", [
               ["class", "rim-result-item-description card-text"]
           ], null, null, null, null, null)), (n()(), v._17(null, ["\n      "])), (n()(), v._19(8388608, null, null, 1, null, a)), v._18(401408, null, 0, b.h, [v._0, v._1, v.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), v._17(null, ["\n    "])), (n()(), v._17(null, ["\n    "])), (n()(), v._19(8388608, null, null, 1, null, c)), v._18(8192, null, 0, b.f, [v._0, v._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), v._17(null, ["\n    "])), (n()(), v._19(8388608, null, null, 1, null, p)), v._18(8192, null, 0, b.f, [v._0, v._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), v._17(null, ["\n  "])), (n()(), v._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 20, 0, t.item.excerpts), n(l, 24, 0, (null == t.item.authors ? null : t.item.authors.length) > 0), n(l, 27, 0, (null == t.item.tags ? null : t.item.tags.length) > 0)
           }, function(n, l) {
               var t = l.component;
               n(l, 6, 0, t.item.url, t.item.title), n(l, 13, 0, t.item.url), n(l, 14, 0, t.item.url)
           })
       }

       function g(n) {
           return v._15(0, [(n()(), v._17(null, ["\n"])), (n()(), v._19(8388608, null, null, 1, null, o)), v._18(8192, null, 0, b.f, [v._0, v._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), v._17(null, ["\n"])), (n()(), v._17(null, ["\n"])), (n()(), v._17(null, ["\n"])), (n()(), v._19(8388608, null, null, 1, null, h)), v._18(8192, null, 0, b.f, [v._0, v._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), v._17(null, ["\n"])), (n()(), v._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 2, 0, "semanticui" == t.environment.cssConfig), n(l, 7, 0, "bootstrap" == t.environment.cssConfig)
           }, null)
       }

       function m(n) {
           return v._15(0, [(n()(), v._16(0, null, null, 1, "rim-result-item", [], null, null, null, g, I)), v._18(57344, null, 0, y.a, [], null, null)], function(n, l) {
               n(l, 1, 0)
           }, null)
       }
       var d = t("e2k/"),
           v = t("3j3K"),
           b = t("2Je8"),
           y = t("1n+e");
       t.d(l, "b", function() {
           return I
       }), l.a = g;
       var S = [d.a],
           I = v._14({
               encapsulation: 0,
               styles: S,
               data: {}
           });
       v._24("rim-result-item", y.a, m, {
           item: "item"
       }, {}, [])
   },
   "7qFN": function(n, l, t) {
       "use strict";
       var e = t("3j3K"),
           u = t("kZql");
       t.d(l, "a", function() {
           return r
       });
       var r = function() {
           function n() {
               this.runSearch = new e.R, this.environment = u.a
           }
           return n.prototype.ngOnInit = function() {}, n.prototype.emitToParent = function(n) {
               this.runSearch.emit({
                   value: "search",
                   evt: n
               })
           }, n.ctorParameters = function() {
               return []
           }, n
       }()
   },
   "GLl/": function(n, l, t) {
       "use strict";
       t.d(l, "a", function() {
           return e
       });
       var e = function() {
           function n() {}
           return n.prototype.transform = function(n, l) {
               var t = {
                   page: n.page,
                   pageSize: n.pageSize,
                   totalItems: n.totalItemCount,
                   totalPages: n.totalPageCount,
                   links: n.links
               };
               return n.links.forEach(function(n, l) {
                   t[n.rel] = n.href
               }), t
           }, n
       }()
   },
   Iksp: function(n, l, t) {
       "use strict";
       t.d(l, "a", function() {
           return e
       });
       var e = function() {
           function n() {}
           return n
       }()
   },
   Ji6e: function(n, l, t) {
       "use strict";
       var e = t("Fzro"),
           u = t("kZql");
       t.d(l, "a", function() {
           return r
       });
       var r = function() {
           function n(n) {
               this.http = n
           }
           return n.prototype.submit = function(n, l, t) {
               var r = new e.l({
                       "Content-Type": "application/json"
                   }),
                   i = new e.j({
                       headers: r
                   }),
                   s = {
                       Name: n,
                       EmailAddress: l,
                       Subject: "Content Search",
                       Message: t
                   };
               return this.http.post(u.a.serviceRequestUrl, JSON.stringify(s), i)
           }, n.ctorParameters = function() {
               return [{
                   type: e.k
               }]
           }, n
       }()
   },
   O0FT: function(n, l, t) {
       "use strict";
       var e = t("M4fF");
       t.n(e);
       t.d(l, "a", function() {
           return u
       });
       var u = function() {
           function n() {}
           return n.prototype.transform = function(n, l) {
               var t = [];
               return n ? (n.forEach(function(n, l) {
                   n.tags.length > 0 && (t = t.concat(n.tags))
               }), e.uniq(t)) : null
           }, n
       }()
   },
   ODy2: function(n, l, t) {
       "use strict";

       function e(n) {
           return c._15(0, [(n()(), c._16(0, null, null, 0, "i", [
               ["class", "circular link remove icon"]
           ], null, [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.clearTerm(c._22(n.parent, 4)) && e
               }
               return e
           }, null, null))], null, null)
       }

       function u(n) {
           return c._15(0, [(n()(), c._16(0, null, null, 15, "div", [
               ["class", "ui icon input"]
           ], null, null, null, null, null)), c._18(139264, null, 0, f.g, [c.t, c.u, c.V, c.W], {
               klass: [0, "klass"],
               ngClass: [1, "ngClass"]
           }, null), c._25(["loading"]), (n()(), c._17(null, ["\n    "])), (n()(), c._16(0, [
               [1, 0],
               ["searchTerm", 1]
           ], null, 7, "input", [
               ["class", "rim-input-field ui input"],
               ["name", "rimSearch"],
               ["placeholder", "Search"],
               ["required", ""]
           ], [
               [1, "required", 0],
               [2, "ng-untouched", null],
               [2, "ng-touched", null],
               [2, "ng-pristine", null],
               [2, "ng-dirty", null],
               [2, "ng-valid", null],
               [2, "ng-invalid", null],
               [2, "ng-pending", null]
           ], [
               [null, "ngModelChange"],
               [null, "input"],
               [null, "blur"],
               [null, "compositionstart"],
               [null, "compositionend"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("input" === l) {
                   e = !1 !== c._22(n, 5)._handleInput(t.target.value) && e
               }
               if ("blur" === l) {
                   e = !1 !== c._22(n, 5).onTouched() && e
               }
               if ("compositionstart" === l) {
                   e = !1 !== c._22(n, 5)._compositionStart() && e
               }
               if ("compositionend" === l) {
                   e = !1 !== c._22(n, 5)._compositionEnd(t.target.value) && e
               }
               if ("ngModelChange" === l) {
                   e = !1 !== (u.term = t) && e
               }
               if ("input" === l) {
                   e = !1 !== u.term$.next(t.target.value) && e
               }
               return e
           }, null, null)), c._18(8192, null, 0, p.d, [c.W, c.V, [2, p.e]], null, null), c._18(8192, null, 0, p.f, [], {
               required: [0, "required"]
           }, null), c._26(512, null, p.g, function(n) {
               return [n]
           }, [p.f]), c._26(512, null, p.h, function(n) {
               return [n]
           }, [p.d]), c._18(335872, null, 0, p.i, [
               [8, null],
               [2, p.g],
               [8, null],
               [2, p.h]
           ], {
               name: [0, "name"],
               model: [1, "model"]
           }, {
               update: "ngModelChange"
           }), c._26(1024, null, p.j, null, [p.i]), c._18(8192, null, 0, p.k, [p.j], null, null), (n()(), c._17(null, ["\n    "])), (n()(), c._19(8388608, null, null, 1, null, e)), c._18(8192, null, 0, f.f, [c._0, c._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), c._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 1, 0, "ui icon input", n(l, 2, 0, t.isLoading)), n(l, 6, 0, ""), n(l, 9, 0, "rimSearch", t.term), n(l, 14, 0, c._22(l, 4).value)
           }, function(n, l) {
               n(l, 4, 0, c._22(l, 6).required ? "" : null, c._22(l, 11).ngClassUntouched, c._22(l, 11).ngClassTouched, c._22(l, 11).ngClassPristine, c._22(l, 11).ngClassDirty, c._22(l, 11).ngClassValid, c._22(l, 11).ngClassInvalid, c._22(l, 11).ngClassPending)
           })
       }

       function r(n) {
           return c._15(0, [(n()(), c._16(0, null, null, 4, "span", [
               ["class", "input-group-btn"]
           ], null, null, null, null, null)), (n()(), c._17(null, ["\n        "])), (n()(), c._16(0, null, null, 1, "button", [
               ["class", "btn btn-info"]
           ], null, [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.clearTerm(c._22(n.parent, 2)) && e
               }
               return e
           }, null, null)), (n()(), c._17(null, ["\n            clear\n        "])), (n()(), c._17(null, ["\n    "]))], null, null)
       }

       function i(n) {
           return c._15(0, [(n()(), c._16(0, null, null, 3, "span", [
               ["class", "input-group-addon"]
           ], null, null, null, null, null)), (n()(), c._17(null, ["\n        "])), (n()(), c._16(0, null, null, 0, "i", [
               ["class", "fa fa-circle-o-notch fa-spin"]
           ], null, null, null, null, null)), (n()(), c._17(null, ["\n    "]))], null, null)
       }

       function s(n) {
           return c._15(0, [(n()(), c._16(0, null, null, 16, "div", [
               ["class", "input-group input-group-lg"]
           ], null, null, null, null, null)), (n()(), c._17(null, ["\n    "])), (n()(), c._16(0, [
               [1, 0],
               ["searchTerm", 1]
           ], null, 7, "input", [
               ["class", "rim-input-field form-control"],
               ["name", "rimSearch"],
               ["placeholder", "Enter a term to search..."],
               ["required", ""]
           ], [
               [1, "required", 0],
               [2, "ng-untouched", null],
               [2, "ng-touched", null],
               [2, "ng-pristine", null],
               [2, "ng-dirty", null],
               [2, "ng-valid", null],
               [2, "ng-invalid", null],
               [2, "ng-pending", null]
           ], [
               [null, "ngModelChange"],
               [null, "input"],
               [null, "blur"],
               [null, "compositionstart"],
               [null, "compositionend"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("input" === l) {
                   e = !1 !== c._22(n, 3)._handleInput(t.target.value) && e
               }
               if ("blur" === l) {
                   e = !1 !== c._22(n, 3).onTouched() && e
               }
               if ("compositionstart" === l) {
                   e = !1 !== c._22(n, 3)._compositionStart() && e
               }
               if ("compositionend" === l) {
                   e = !1 !== c._22(n, 3)._compositionEnd(t.target.value) && e
               }
               if ("ngModelChange" === l) {
                   e = !1 !== (u.term = t) && e
               }
               if ("input" === l) {
                   e = !1 !== u.term$.next(t.target.value) && e
               }
               return e
           }, null, null)), c._18(8192, null, 0, p.d, [c.W, c.V, [2, p.e]], null, null), c._18(8192, null, 0, p.f, [], {
               required: [0, "required"]
           }, null), c._26(512, null, p.g, function(n) {
               return [n]
           }, [p.f]), c._26(512, null, p.h, function(n) {
               return [n]
           }, [p.d]), c._18(335872, null, 0, p.i, [
               [8, null],
               [2, p.g],
               [8, null],
               [2, p.h]
           ], {
               name: [0, "name"],
               model: [1, "model"]
           }, {
               update: "ngModelChange"
           }), c._26(1024, null, p.j, null, [p.i]), c._18(8192, null, 0, p.k, [p.j], null, null), (n()(), c._17(null, ["\n    "])), (n()(), c._19(8388608, null, null, 1, null, r)), c._18(8192, null, 0, f.f, [c._0, c._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), c._17(null, ["\n    "])), (n()(), c._19(8388608, null, null, 1, null, i)), c._18(8192, null, 0, f.f, [c._0, c._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), c._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 4, 0, ""), n(l, 7, 0, "rimSearch", t.term), n(l, 12, 0, c._22(l, 2).value && !t.isLoading), n(l, 15, 0, t.isLoading)
           }, function(n, l) {
               n(l, 2, 0, c._22(l, 4).required ? "" : null, c._22(l, 9).ngClassUntouched, c._22(l, 9).ngClassTouched, c._22(l, 9).ngClassPristine, c._22(l, 9).ngClassDirty, c._22(l, 9).ngClassValid, c._22(l, 9).ngClassInvalid, c._22(l, 9).ngClassPending)
           })
       }

       function o(n) {
           return c._15(0, [c._27(335544320, 1, {
               searchInput: 0
           }), (n()(), c._17(null, ["\n"])), (n()(), c._19(8388608, null, null, 1, null, u)), c._18(8192, null, 0, f.f, [c._0, c._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), c._17(null, ["\n"])), (n()(), c._17(null, ["\n\n"])), (n()(), c._17(null, ["\n"])), (n()(), c._19(8388608, null, null, 1, null, s)), c._18(8192, null, 0, f.f, [c._0, c._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), c._17(null, ["\n"])), (n()(), c._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, "semanticui" == t.environment.cssConfig), n(l, 8, 0, "bootstrap" == t.environment.cssConfig)
           }, null)
       }

       function a(n) {
           return c._15(0, [(n()(), c._16(0, null, null, 1, "rim-input-field", [], null, null, null, o, d)), c._18(2121728, null, 0, h.a, [g.a], null, null)], null, null)
       }
       var _ = t("seE3"),
           c = t("3j3K"),
           f = t("2Je8"),
           p = t("NVOs"),
           h = t("RRx8"),
           g = t("vAuz");
       t.d(l, "b", function() {
           return d
       }), l.a = o;
       var m = [_.a],
           d = c._14({
               encapsulation: 0,
               styles: m,
               data: {}
           });
       c._24("rim-input-field", h.a, a, {
           isLoading: "isLoading",
           term: "term"
       }, {
           termReceived: "termReceived"
       }, [])
   },
   RRx8: function(n, l, t) {
       "use strict";
       var e = t("3j3K"),
           u = t("EEr4"),
           r = (t.n(u), t("aV5h")),
           i = (t.n(r), t("vAuz")),
           s = t("kZql");
       t.d(l, "a", function() {
           return o
       });
       var o = function() {
           function n(n) {
               var l = this;
               this.rimSearch = n, this.termReceived = new e.R, this.term$ = new u.Subject, this.environment = s.a, this.term$.debounceTime(300).subscribe(function(n) {
                   return l.search(n)
               })
           }
           return n.prototype.search = function(n) {
               n ? this.termReceived.emit({
                   value: n
               }) : this.termReceived.emit({
                   value: ""
               })
           }, n.prototype.clearTerm = function(n) {
               n.value = "", this.search("")
           }, n.prototype.ngAfterViewInit = function() {
               this.searchInput.nativeElement.focus()
           }, n.ctorParameters = function() {
               return [{
                   type: i.a
               }]
           }, n
       }()
   },
   WiKt: function(n, l, t) {
       "use strict";
       t.d(l, "a", function() {
           return e
       });
       var e = [".ui.horizontal.divider.header[_ngcontent-%COMP%]{color:#ccc;font-size:90%;letter-spacing:normal}.rim-result-set[_ngcontent-%COMP%]{position:relative;z-index:300;top:0;left:0;height:35%}"]
   },
   XS25: function(n, l, t) {
       "use strict";
       var e = t("wu3h"),
           u = (t.n(e), t("45Dp")),
           r = (t.n(u), t("DAFs")),
           i = (t.n(r), t("FD+i")),
           s = (t.n(i), t("qXjp")),
           o = (t.n(s), t("IzNg")),
           a = (t.n(o), t("MVjO")),
           _ = (t.n(a), t("oFcf")),
           c = (t.n(_), t("nR/1")),
           f = (t.n(c), t("cUYv")),
           p = (t.n(f), t("594w")),
           h = (t.n(p), t("7N90")),
           g = (t.n(h), t("/Ife")),
           m = (t.n(g), t("2tFN")),
           d = (t.n(m), t("ChGr")),
           v = (t.n(d), t("ZSR1"));
       t.n(v)
   },
   YWx4: function(n, l, t) {
       "use strict";
       var e = t("3j3K"),
           u = t("aV5h"),
           r = (t.n(u), t("vAuz")),
           i = t("kZql");
       t.d(l, "a", function() {
           return s
       });
       var s = function() {
           function n(n, l) {
               this.elem = n, this.rimSearch = l, this.environment = i.a;
               var t = n.nativeElement.getAttribute("data-api-url");
               t && l.setBaseUrl(t);
               var e = n.nativeElement.getAttribute("data-filter-tags");
               if (e) {
                   var u = e.split(/\s*[,;]\s*/).map(function(n) {
                       return n.trim()
                   });
                   this.rimSearch.setPresetTagFilters(u)
               }
               var r = n.nativeElement.getAttribute("data-filter-sites");
               if (r) {
                   var s = r.split(/\s*[,;]\s*/).map(function(n) {
                       return n.trim()
                   });
                   this.rimSearch.setPresetSitesFilters(s)
               }
           }
           return n.prototype.search = function(n, l) {
               var t = this;
               if (this.isLoading = !0, n) {
                   var e = l || "";
                   this.rimSearch.search(n, e).subscribe(function(n) {
                       t.response = n, t.isLoading = !1;
                       var l = new CustomEvent("rim.search.onSuccess", {
                           detail: {
                               results: n
                           }
                       });
                       t.elem.nativeElement.dispatchEvent(l);
                       var e = new CustomEvent("rim.search.onComplete", {
                           detail: {
                               success: !0
                           }
                       });
                       t.elem.nativeElement.dispatchEvent(e)
                   }, function(n) {
                       t.isLoading = !1;
                       var l = new CustomEvent("rim.search.onError", {
                           detail: {
                               error: n
                           }
                       });
                       t.elem.nativeElement.dispatchEvent(l);
                       var e = new CustomEvent("rim.search.onComplete", {
                           detail: {
                               success: !1
                           }
                       });
                       t.elem.nativeElement.dispatchEvent(e)
                   });
                   var u = new CustomEvent("rim.search.onStart", {
                       detail: {
                           term: n
                       }
                   });
                   this.elem.nativeElement.dispatchEvent(u)
               } else {
                   var r = new CustomEvent("rim.search.onEmpty", {
                       detail: {
                           term: n
                       }
                   });
                   this.elem.nativeElement.dispatchEvent(r), this.response = [], this.isLoading = !1
               }
           }, n.prototype.setTerm = function(n) {
               this.searchTerm = n.value || "", this.search(this.searchTerm)
           }, n.prototype.reLaunchSearch = function(n) {
               this.searchTerm && n.evt && (this.searchTerm += " " + n.evt.value, this.search(this.searchTerm))
           }, n.ctorParameters = function() {
               return [{
                   type: e.V
               }, {
                   type: r.a
               }]
           }, n
       }()
   },
   "e2k/": function(n, l, t) {
       "use strict";
       t.d(l, "a", function() {
           return e
       });
       var e = [".rim-result-item[_ngcontent-%COMP%]{background:transparent;display:block;line-height:2em;margin-bottom:1em;transition:all .2s ease-in-out;width:100%}.rim-result-item[_ngcontent-%COMP%]:hover{background:#efefef}.rim-result-item[_ngcontent-%COMP%]   .rim-result-item-author[_ngcontent-%COMP%]{margin-top:.5em}.rim-result-item-author[_ngcontent-%COMP%]{color:#ccc}.rim-result-item-author[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:grey}.card-title[_ngcontent-%COMP%]{font-size:120%}.badge[_ngcontent-%COMP%], .tag[_ngcontent-%COMP%]{font-weight:400;margin-right:.3em;padding:.5em}.badge-default[_ngcontent-%COMP%], .tag-default[_ngcontent-%COMP%]{background-color:#ccc}.rim-result-item-tags[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]{margin-right:.3em}.ui.rim-result-item.segment[_ngcontent-%COMP%]:hover{box-shadow:0 0 0 .5em #efefef}"]
   },
   hq9a: function(n, l, t) {
       "use strict";
       var e = t("3j3K"),
           u = t("kZql");
       t.d(l, "a", function() {
           return r
       });
       var r = function() {
           function n() {
               this.pageChange = new e.R, this.environment = u.a
           }
           return n.prototype.ngOnInit = function() {}, n.prototype.pageSelected = function(n) {
               this.pageChange.emit({
                   url: n
               })
           }, n.ctorParameters = function() {
               return []
           }, n
       }()
   },
   kP2N: function(n, l, t) {
       "use strict";

       function e(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 4, "div", [], null, null, null, null, null)), (n()(), f._17(null, ["\n          "])), (n()(), f._16(0, null, null, 1, "rim-result-item", [], null, null, null, p.a, p.b)), f._18(57344, null, 0, h.a, [], {
               item: [0, "item"]
           }, null), (n()(), f._17(null, ["\n        "]))], function(n, l) {
               n(l, 3, 0, l.context.$implicit)
           }, null)
       }

       function u(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 13, "div", [
               ["class", "rim-result-set"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n    "])), (n()(), f._16(0, null, null, 10, "div", [
               ["class", "ui text container"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n      "])), (n()(), f._16(0, null, null, 7, "div", [
               ["class", "rim-result-set-items ui divided items"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n        "])), (n()(), f._16(0, null, null, 1, "h3", [
               ["class", "ui horizontal divider header"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["Showing ", " Results"])), (n()(), f._17(null, ["\n        "])), (n()(), f._19(8388608, null, null, 1, null, e)), f._18(401408, null, 0, g.h, [f._0, f._1, f.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), f._17(null, ["\n      "])), (n()(), f._17(null, ["\n    "])), (n()(), f._17(null, ["\n  "]))], function(n, l) {
               n(l, 10, 0, l.component.response.results)
           }, function(n, l) {
               var t = l.component;
               n(l, 7, 0, null == t.response.results ? null : t.response.results.length)
           })
       }

       function r(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 4, "div", [], null, null, null, null, null)), (n()(), f._17(null, ["\n  "])), (n()(), f._19(8388608, null, null, 1, null, u)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, t.response && (null == t.response.results ? null : t.response.results.length) > 0)
           }, null)
       }

       function i(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 4, "div", [], null, null, null, null, null)), (n()(), f._17(null, ["\n        "])), (n()(), f._16(0, null, null, 1, "rim-result-item", [], null, null, null, p.a, p.b)), f._18(57344, null, 0, h.a, [], {
               item: [0, "item"]
           }, null), (n()(), f._17(null, ["\n      "]))], function(n, l) {
               n(l, 3, 0, l.context.$implicit)
           }, null)
       }

       function s(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 19, "div", [
               ["class", "rim-result-set"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n    "])), (n()(), f._16(0, null, null, 4, "div", [
               ["class", "row"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n      "])), (n()(), f._16(0, null, null, 1, "rim-tag-set", [], null, [
               [null, "tagSelected"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("tagSelected" === l) {
                   e = !1 !== u.emitToParent(t) && e
               }
               return e
           }, m.a, m.b)), f._18(319488, null, 0, d.a, [v.a], {
               results: [0, "results"],
               term: [1, "term"]
           }, {
               tagSelected: "tagSelected"
           }), (n()(), f._17(null, ["\n    "])), (n()(), f._17(null, ["\n    "])), (n()(), f._16(0, null, null, 4, "div", [
               ["class", "row"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n      "])), (n()(), f._16(0, null, null, 1, "h3", [
               ["class", "divider header"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["Showing ", " Results"])), (n()(), f._17(null, ["\n    "])), (n()(), f._17(null, ["\n    "])), (n()(), f._16(0, null, null, 4, "div", [
               ["class", "row"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n      "])), (n()(), f._19(8388608, null, null, 1, null, i)), f._18(401408, null, 0, g.h, [f._0, f._1, f.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), f._17(null, ["\n    "])), (n()(), f._17(null, ["\n  "]))], function(n, l) {
               var t = l.component;
               n(l, 5, 0, null == t.response ? null : t.response.results, t.term), n(l, 17, 0, t.response.results)
           }, function(n, l) {
               var t = l.component;
               n(l, 11, 0, null == t.response.results ? null : t.response.results.length)
           })
       }

       function o(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 4, "div", [], null, null, null, null, null)), (n()(), f._17(null, ["\n  "])), (n()(), f._19(8388608, null, null, 1, null, s)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, t.response && (null == t.response.results ? null : t.response.results.length) > 0)
           }, null)
       }

       function a(n) {
           return f._15(0, [(n()(), f._17(null, ["\n"])), (n()(), f._19(8388608, null, null, 1, null, r)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n\n"])), (n()(), f._17(null, ["\n"])), (n()(), f._17(null, ["\n"])), (n()(), f._19(8388608, null, null, 1, null, o)), f._18(8192, null, 0, g.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n"])), (n()(), f._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 2, 0, "semanticui" == t.environment.cssConfig), n(l, 7, 0, "bootstrap" == t.environment.cssConfig)
           }, null)
       }

       function _(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 1, "rim-result-set", [], null, null, null, a, S)), f._18(57344, null, 0, b.a, [], null, null)], function(n, l) {
               n(l, 1, 0)
           }, null)
       }
       var c = t("WiKt"),
           f = t("3j3K"),
           p = t("3zRW"),
           h = t("1n+e"),
           g = t("2Je8"),
           m = t("kWaz"),
           d = t("0v/h"),
           v = t("vAuz"),
           b = t("7qFN");
       t.d(l, "b", function() {
           return S
       }), l.a = a;
       var y = [c.a],
           S = f._14({
               encapsulation: 0,
               styles: y,
               data: {}
           });
       f._24("rim-result-set", b.a, _, {
           response: "response",
           term: "term"
       }, {
           runSearch: "runSearch"
       }, [])
   },
   kWaz: function(n, l, t) {
       "use strict";

       function e(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 3, "div", [
               ["class", "rim-clear-tag-filter ui small red basic label"]
           ], null, [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.clearTagFilter() && e
               }
               return e
           }, null, null)), (n()(), f._17(null, ["\n    Clear Filters\n    "])), (n()(), f._16(0, null, null, 0, "i", [
               ["class", "remove icon"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n  "]))], null, null)
       }

       function u(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 1, "a", [
               ["class", "rim-tag-item ui small basic label"]
           ], null, [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.filterTag(n.context.$implicit) && e
               }
               return e
           }, null, null)), (n()(), f._17(null, ["", ""]))], null, function(n, l) {
               n(l, 1, 0, l.context.$implicit.name)
           })
       }

       function r(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 9, "div", [
               ["class", "rim-tag-set"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n  "])), (n()(), f._19(8388608, null, null, 1, null, e)), f._18(8192, null, 0, p.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n  "])), (n()(), f._16(0, null, null, 0, "br", [], null, null, null, null, null)), (n()(), f._17(null, ["\n  "])), (n()(), f._19(8388608, null, null, 1, null, u)), f._18(401408, null, 0, p.h, [f._0, f._1, f.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), f._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, t.selected), n(l, 8, 0, t.filteredResults)
           }, null)
       }

       function i(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 3, "button", [
               ["class", "rim-clear-tag-filter btn btn-outline-secondary"]
           ], null, [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.clearTagFilter() && e
               }
               return e
           }, null, null)), (n()(), f._17(null, ["\n    "])), (n()(), f._16(0, null, null, 0, "i", [
               ["class", "fa fa-remove"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n    Clear Filters\n  "]))], null, null)
       }

       function s(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 4, "a", [
               ["class", "rim-tag-item"]
           ], null, [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.filterTag(n.context.$implicit) && e
               }
               return e
           }, null, null)), (n()(), f._17(null, ["\n    "])), (n()(), f._16(0, null, null, 1, "span", [
               ["class", "tag badge"]
           ], [
               [2, "tag-primary", null],
               [2, "tag-info", null]
           ], null, null, null, null)), (n()(), f._17(null, ["\n      ", "\n    "])), (n()(), f._17(null, ["\n  "]))], null, function(n, l) {
               n(l, 2, 0, l.context.$implicit.selected, !l.context.$implicit.selected), n(l, 3, 0, l.context.$implicit.name)
           })
       }

       function o(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 9, "div", [
               ["class", "rim-tag-set"]
           ], null, null, null, null, null)), (n()(), f._17(null, ["\n  "])), (n()(), f._19(8388608, null, null, 1, null, i)), f._18(8192, null, 0, p.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n  "])), (n()(), f._16(0, null, null, 0, "br", [], null, null, null, null, null)), (n()(), f._17(null, ["\n  "])), (n()(), f._19(8388608, null, null, 1, null, s)), f._18(401408, null, 0, p.h, [f._0, f._1, f.t], {
               ngForOf: [0, "ngForOf"]
           }, null), (n()(), f._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 3, 0, t.selected), n(l, 8, 0, t.filteredResults)
           }, null)
       }

       function a(n) {
           return f._15(0, [(n()(), f._17(null, ["\n"])), (n()(), f._19(8388608, null, null, 1, null, r)), f._18(8192, null, 0, p.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n"])), (n()(), f._17(null, ["\n"])), (n()(), f._17(null, ["\n"])), (n()(), f._19(8388608, null, null, 1, null, o)), f._18(8192, null, 0, p.f, [f._0, f._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), f._17(null, ["\n"])), (n()(), f._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 2, 0, "semanticui" == t.environment.cssConfig), n(l, 7, 0, "bootstrap" == t.environment.cssConfig)
           }, null)
       }

       function _(n) {
           return f._15(0, [(n()(), f._16(0, null, null, 1, "rim-tag-set", [], null, null, null, a, d)), f._18(319488, null, 0, h.a, [g.a], null, null)], function(n, l) {
               n(l, 1, 0)
           }, null)
       }
       var c = t("yCaw"),
           f = t("3j3K"),
           p = t("2Je8"),
           h = t("0v/h"),
           g = t("vAuz");
       t.d(l, "b", function() {
           return d
       }), l.a = a;
       var m = [c.a],
           d = f._14({
               encapsulation: 0,
               styles: m,
               data: {}
           });
       f._24("rim-tag-set", h.a, _, {
           results: "results",
           term: "term"
       }, {
           tagSelected: "tagSelected"
       }, [])
   },
   kZql: function(n, l, t) {
       "use strict";
       t.d(l, "a", function() {
           return e
       });
       var e = {
           production: !0,
           serviceRequestUrl: "https://service-requests.ritterim.com/service-requests",
           cssConfig: "semanticui",
           loggingApplicationId: "Content Search Component"
       }
   },
   kke6: function(n, l, t) {
       "use strict";
       var e = t("3j3K"),
           u = t("Iksp"),
           r = t("2Je8"),
           i = t("Qbdm"),
           s = t("NVOs"),
           o = t("Fzro"),
           a = t("vAuz"),
           _ = t("Ji6e"),
           c = t("1A80");
       t.d(l, "a", function() {
           return h
       });
       var f = this && this.__extends || function() {
               var n = Object.setPrototypeOf || {
                   __proto__: []
               }
               instanceof Array && function(n, l) {
                   n.__proto__ = l
               } || function(n, l) {
                   for (var t in l) l.hasOwnProperty(t) && (n[t] = l[t])
               };
               return function(l, t) {
                   function e() {
                       this.constructor = l
                   }
                   n(l, t), l.prototype = null === t ? Object.create(t) : (e.prototype = t.prototype, new e)
               }
           }(),
           p = function(n) {
               function l(l) {
                   return n.call(this, l, [c.a], [c.a]) || this
               }
               return f(l, n), Object.defineProperty(l.prototype, "_LOCALE_ID_12", {
                   get: function() {
                       return null == this.__LOCALE_ID_12 && (this.__LOCALE_ID_12 = e.b(this.parent.get(e.c, null))), this.__LOCALE_ID_12
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_NgLocalization_13", {
                   get: function() {
                       return null == this.__NgLocalization_13 && (this.__NgLocalization_13 = new r.a(this._LOCALE_ID_12)), this.__NgLocalization_13
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_Compiler_14", {
                   get: function() {
                       return null == this.__Compiler_14 && (this.__Compiler_14 = new e.d), this.__Compiler_14
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_APP_ID_15", {
                   get: function() {
                       return null == this.__APP_ID_15 && (this.__APP_ID_15 = e.e()), this.__APP_ID_15
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_IterableDiffers_16", {
                   get: function() {
                       return null == this.__IterableDiffers_16 && (this.__IterableDiffers_16 = e.f()), this.__IterableDiffers_16
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_KeyValueDiffers_17", {
                   get: function() {
                       return null == this.__KeyValueDiffers_17 && (this.__KeyValueDiffers_17 = e.g()), this.__KeyValueDiffers_17
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_DomSanitizer_18", {
                   get: function() {
                       return null == this.__DomSanitizer_18 && (this.__DomSanitizer_18 = new i.b(this.parent.get(i.c))), this.__DomSanitizer_18
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_Sanitizer_19", {
                   get: function() {
                       return null == this.__Sanitizer_19 && (this.__Sanitizer_19 = this._DomSanitizer_18), this.__Sanitizer_19
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_HAMMER_GESTURE_CONFIG_20", {
                   get: function() {
                       return null == this.__HAMMER_GESTURE_CONFIG_20 && (this.__HAMMER_GESTURE_CONFIG_20 = new i.d), this.__HAMMER_GESTURE_CONFIG_20
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_EVENT_MANAGER_PLUGINS_21", {
                   get: function() {
                       return null == this.__EVENT_MANAGER_PLUGINS_21 && (this.__EVENT_MANAGER_PLUGINS_21 = [new i.e(this.parent.get(i.c)), new i.f(this.parent.get(i.c)), new i.g(this.parent.get(i.c), this._HAMMER_GESTURE_CONFIG_20)]), this.__EVENT_MANAGER_PLUGINS_21
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_EventManager_22", {
                   get: function() {
                       return null == this.__EventManager_22 && (this.__EventManager_22 = new i.h(this._EVENT_MANAGER_PLUGINS_21, this.parent.get(e.h))), this.__EventManager_22
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_ɵDomSharedStylesHost_23", {
                   get: function() {
                       return null == this.__ɵDomSharedStylesHost_23 && (this.__ɵDomSharedStylesHost_23 = new i.i(this.parent.get(i.c))), this.__ɵDomSharedStylesHost_23
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_ɵDomRendererFactory2_24", {
                   get: function() {
                       return null == this.__ɵDomRendererFactory2_24 && (this.__ɵDomRendererFactory2_24 = new i.j(this._EventManager_22, this._ɵDomSharedStylesHost_23)), this.__ɵDomRendererFactory2_24
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_RendererFactory2_25", {
                   get: function() {
                       return null == this.__RendererFactory2_25 && (this.__RendererFactory2_25 = this._ɵDomRendererFactory2_24), this.__RendererFactory2_25
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_ɵSharedStylesHost_26", {
                   get: function() {
                       return null == this.__ɵSharedStylesHost_26 && (this.__ɵSharedStylesHost_26 = this._ɵDomSharedStylesHost_23), this.__ɵSharedStylesHost_26
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_Testability_27", {
                   get: function() {
                       return null == this.__Testability_27 && (this.__Testability_27 = new e.i(this.parent.get(e.h))), this.__Testability_27
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_Meta_28", {
                   get: function() {
                       return null == this.__Meta_28 && (this.__Meta_28 = new i.k(this.parent.get(i.c))), this.__Meta_28
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_Title_29", {
                   get: function() {
                       return null == this.__Title_29 && (this.__Title_29 = new i.l(this.parent.get(i.c))), this.__Title_29
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_ɵi_30", {
                   get: function() {
                       return null == this.__ɵi_30 && (this.__ɵi_30 = new s.a), this.__ɵi_30
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_BrowserXhr_31", {
                   get: function() {
                       return null == this.__BrowserXhr_31 && (this.__BrowserXhr_31 = new o.a), this.__BrowserXhr_31
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_ResponseOptions_32", {
                   get: function() {
                       return null == this.__ResponseOptions_32 && (this.__ResponseOptions_32 = new o.b), this.__ResponseOptions_32
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_XSRFStrategy_33", {
                   get: function() {
                       return null == this.__XSRFStrategy_33 && (this.__XSRFStrategy_33 = o.c()), this.__XSRFStrategy_33
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_XHRBackend_34", {
                   get: function() {
                       return null == this.__XHRBackend_34 && (this.__XHRBackend_34 = new o.d(this._BrowserXhr_31, this._ResponseOptions_32, this._XSRFStrategy_33)), this.__XHRBackend_34
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_RequestOptions_35", {
                   get: function() {
                       return null == this.__RequestOptions_35 && (this.__RequestOptions_35 = new o.e), this.__RequestOptions_35
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_Http_36", {
                   get: function() {
                       return null == this.__Http_36 && (this.__Http_36 = o.f(this._XHRBackend_34, this._RequestOptions_35)), this.__Http_36
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_RimSearchService_37", {
                   get: function() {
                       return null == this.__RimSearchService_37 && (this.__RimSearchService_37 = new a.a(this._Http_36)), this.__RimSearchService_37
                   },
                   enumerable: !0,
                   configurable: !0
               }), Object.defineProperty(l.prototype, "_FeedbackService_38", {
                   get: function() {
                       return null == this.__FeedbackService_38 && (this.__FeedbackService_38 = new _.a(this._Http_36)), this.__FeedbackService_38
                   },
                   enumerable: !0,
                   configurable: !0
               }), l.prototype.createInternal = function() {
                   return this._CommonModule_0 = new r.b, this._ErrorHandler_1 = i.m(), this._APP_INITIALIZER_2 = [e.j, i.n(this.parent.get(i.o, null), this.parent.get(e.k, null))], this._ApplicationInitStatus_3 = new e.l(this._APP_INITIALIZER_2), this._ɵf_4 = new e.m(this.parent.get(e.h), this.parent.get(e.n), this, this._ErrorHandler_1, this.componentFactoryResolver, this._ApplicationInitStatus_3), this._ApplicationRef_5 = this._ɵf_4, this._ApplicationModule_6 = new e.o(this._ApplicationRef_5), this._BrowserModule_7 = new i.p(this.parent.get(i.p, null)), this._ɵba_8 = new s.b, this._FormsModule_9 = new s.c, this._HttpModule_10 = new o.g, this._AppModule_11 = new u.a, this._AppModule_11
               }, l.prototype.getInternal = function(n, l) {
                   return n === r.b ? this._CommonModule_0 : n === e.p ? this._ErrorHandler_1 : n === e.q ? this._APP_INITIALIZER_2 : n === e.l ? this._ApplicationInitStatus_3 : n === e.m ? this._ɵf_4 : n === e.r ? this._ApplicationRef_5 : n === e.o ? this._ApplicationModule_6 : n === i.p ? this._BrowserModule_7 : n === s.b ? this._ɵba_8 : n === s.c ? this._FormsModule_9 : n === o.g ? this._HttpModule_10 : n === u.a ? this._AppModule_11 : n === e.c ? this._LOCALE_ID_12 : n === r.c ? this._NgLocalization_13 : n === e.d ? this._Compiler_14 : n === e.s ? this._APP_ID_15 : n === e.t ? this._IterableDiffers_16 : n === e.u ? this._KeyValueDiffers_17 : n === i.q ? this._DomSanitizer_18 : n === e.v ? this._Sanitizer_19 : n === i.r ? this._HAMMER_GESTURE_CONFIG_20 : n === i.s ? this._EVENT_MANAGER_PLUGINS_21 : n === i.h ? this._EventManager_22 : n === i.i ? this._ɵDomSharedStylesHost_23 : n === i.j ? this._ɵDomRendererFactory2_24 : n === e.w ? this._RendererFactory2_25 : n === i.t ? this._ɵSharedStylesHost_26 : n === e.i ? this._Testability_27 : n === i.k ? this._Meta_28 : n === i.l ? this._Title_29 : n === s.a ? this._ɵi_30 : n === o.a ? this._BrowserXhr_31 : n === o.h ? this._ResponseOptions_32 : n === o.i ? this._XSRFStrategy_33 : n === o.d ? this._XHRBackend_34 : n === o.j ? this._RequestOptions_35 : n === o.k ? this._Http_36 : n === a.a ? this._RimSearchService_37 : n === _.a ? this._FeedbackService_38 : l
               }, l.prototype.destroyInternal = function() {
                   this._ɵf_4.ngOnDestroy(), this.__ɵDomSharedStylesHost_23 && this._ɵDomSharedStylesHost_23.ngOnDestroy()
               }, l
           }(e.x),
           h = new e.y(p, u.a)
   },
   l0Vc: function(n, l, t) {
       "use strict";
       t.d(l, "a", function() {
           return e
       });
       var e = ["rim-result-set[_ngcontent-%COMP%]{display:inline-block;margin:2rem auto}.rim-search-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#ccc;text-align:center}.rim-search-container.ui.text.container[_ngcontent-%COMP%]{font-family:inherit}"]
   },
   "qh+V": function(n, l, t) {
       "use strict";

       function e(n) {
           return o._15(0, [(n()(), o._16(0, null, null, 14, "div", [
               ["class", "ui vertical center aligned segment"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["\n  "])), (n()(), o._16(0, null, null, 3, "button", [
               ["class", "ui circular icon button"]
           ], [
               [8, "disabled", 0],
               [4, "disabled", null]
           ], [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.pageSelected(u.pageInfo.prev) && e
               }
               return e
           }, null, null)), (n()(), o._17(null, ["\n    "])), (n()(), o._16(0, null, null, 0, "i", [
               ["class", "arrow left icon"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["\n  "])), (n()(), o._17(null, ["\n  "])), (n()(), o._16(0, null, null, 1, "span", [
               ["class", "page-count"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["Page ", " of ", ""])), (n()(), o._17(null, ["\n  "])), (n()(), o._16(0, null, null, 3, "button", [
               ["class", "ui circular icon button"]
           ], [
               [8, "disabled", 0],
               [4, "disabled", null]
           ], [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.pageSelected(u.pageInfo.next) && e
               }
               return e
           }, null, null)), (n()(), o._17(null, ["\n    "])), (n()(), o._16(0, null, null, 0, "i", [
               ["class", "arrow right icon"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["\n  "])), (n()(), o._17(null, ["\n"]))], null, function(n, l) {
               var t = l.component;
               n(l, 2, 0, !t.pageInfo.prev, !t.pageInfo.prev), n(l, 8, 0, t.pageInfo.page, t.pageInfo.totalPages), n(l, 10, 0, !t.pageInfo.next, !t.pageInfo.next)
           })
       }

       function u(n) {
           return o._15(0, [(n()(), o._16(0, null, null, 37, "div", [], null, null, null, null, null)), (n()(), o._17(null, ["\n  "])), (n()(), o._16(0, null, null, 34, "nav", [], null, null, null, null, null)), (n()(), o._17(null, ["\n    "])), (n()(), o._16(0, null, null, 31, "ul", [
               ["class", "pagination justify-content-center"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["\n      "])), (n()(), o._16(0, null, null, 10, "li", [
               ["class", "page-item"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["\n        "])), (n()(), o._16(0, null, null, 7, "a", [
               ["aria-label", "Previous"],
               ["class", "page-link"]
           ], [
               [2, "disabled", null]
           ], [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.pageSelected(u.pageInfo.prev) && e
               }
               return e
           }, null, null)), (n()(), o._17(null, ["\n          "])), (n()(), o._16(0, null, null, 1, "span", [
               ["aria-hidden", "true"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["«"])), (n()(), o._17(null, ["\n          "])), (n()(), o._16(0, null, null, 1, "span", [
               ["class", "sr-only"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["Previous"])), (n()(), o._17(null, ["\n        "])), (n()(), o._17(null, ["\n      "])), (n()(), o._17(null, ["\n      "])), (n()(), o._16(0, null, null, 4, "li", [
               ["class", "page-item"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["\n        "])), (n()(), o._16(0, null, null, 1, "span", [
               ["class", "page-link disabled"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["Page ", " of ", ""])), (n()(), o._17(null, ["\n      "])), (n()(), o._17(null, ["\n      "])), (n()(), o._16(0, null, null, 10, "li", [
               ["class", "page-item"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["\n        "])), (n()(), o._16(0, null, null, 7, "a", [
               ["aria-label", "Next"],
               ["class", "page-link"]
           ], [
               [2, "disabled", null]
           ], [
               [null, "click"]
           ], function(n, l, t) {
               var e = !0,
                   u = n.component;
               if ("click" === l) {
                   e = !1 !== u.pageSelected(u.pageInfo.next) && e
               }
               return e
           }, null, null)), (n()(), o._17(null, ["\n          "])), (n()(), o._16(0, null, null, 1, "span", [
               ["aria-hidden", "true"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["»"])), (n()(), o._17(null, ["\n          "])), (n()(), o._16(0, null, null, 1, "span", [
               ["class", "sr-only"]
           ], null, null, null, null, null)), (n()(), o._17(null, ["Next"])), (n()(), o._17(null, ["\n        "])), (n()(), o._17(null, ["\n      "])), (n()(), o._17(null, ["\n    "])), (n()(), o._17(null, ["\n  "])), (n()(), o._17(null, ["\n"]))], null, function(n, l) {
               var t = l.component;
               n(l, 8, 0, !t.pageInfo.prev), n(l, 21, 0, t.pageInfo.page, t.pageInfo.totalPages), n(l, 26, 0, !t.pageInfo.next)
           })
       }

       function r(n) {
           return o._15(0, [(n()(), o._17(null, ["\n"])), (n()(), o._19(8388608, null, null, 1, null, e)), o._18(8192, null, 0, a.f, [o._0, o._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), o._17(null, ["\n"])), (n()(), o._17(null, ["\n"])), (n()(), o._17(null, ["\n"])), (n()(), o._19(8388608, null, null, 1, null, u)), o._18(8192, null, 0, a.f, [o._0, o._1], {
               ngIf: [0, "ngIf"]
           }, null), (n()(), o._17(null, ["\n"]))], function(n, l) {
               var t = l.component;
               n(l, 2, 0, "semanticui" == t.environment.cssConfig), n(l, 7, 0, "bootstrap" == t.environment.cssConfig)
           }, null)
       }

       function i(n) {
           return o._15(0, [(n()(), o._16(0, null, null, 1, "rim-paging", [], null, null, null, r, f)), o._18(57344, null, 0, _.a, [], null, null)], function(n, l) {
               n(l, 1, 0)
           }, null)
       }
       var s = t("29GR"),
           o = t("3j3K"),
           a = t("2Je8"),
           _ = t("hq9a");
       t.d(l, "b", function() {
           return f
       }), l.a = r;
       var c = [s.a],
           f = o._14({
               encapsulation: 0,
               styles: c,
               data: {}
           });
       o._24("rim-paging", _.a, i, {
           pageInfo: "pageInfo"
       }, {
           pageChange: "pageChange"
       }, [])
   },
   seE3: function(n, l, t) {
       "use strict";
       t.d(l, "a", function() {
           return e
       });
       var e = [".ui.icon.input[_ngcontent-%COMP%]{border-radius:5px;box-shadow:0 0 0 5px rgba(0,0,0,.2);width:100%}"]
   },
   vAuz: function(n, l, t) {
       "use strict";
       var e = t("Fzro"),
           u = t("rCTf"),
           r = (t.n(u), t("+pb+")),
           i = (t.n(r), t("0TiQ")),
           s = (t.n(i), t("AGQa")),
           o = (t.n(s), t("kZql")),
           a = t("tbtb");
       t.n(a);
       t.d(l, "a", function() {
           return c
       });
       var _ = t("cEP/"),
           c = function() {
               function n(n) {
                   this.http = n, this.baseUrl = "https://content-search-qa.ritterim.com", this.url = this.baseUrl + "/search", this.tagFilters = [], this.presetTagFilters = [], this.presetSitesFilters = [], this.sessionId = _()
               }
               return n.prototype.search = function(n, l) {
                   if (n) {
                       var t = new e.l({
                               "Rim-Application-Id": o.a.loggingApplicationId,
                               "Rim-Session-Id": this.sessionId
                           }),
                           r = new e.m;
                       l && (this.url = l), r.set("term", n);
                       var i = Array.from(new Set(this.presetTagFilters.concat(this.tagFilters)));
                       if (i.length > 0 && r.append("filter.tags", i.join(",")), this.presetSitesFilters.length > 0 && r.append("filter.site", this.presetSitesFilters.join(",")), a.Cookie.check("token")) {
                           var s = a.Cookie.get("token");
                           t.Authorization = "Bearer " + s
                       }
                       var _ = new e.j({
                           headers: t
                       });
                       return _.search = r, this.http.get("" + this.url, _).map(function(n) {
                           return n.json()
                       }).publishLast().refCount()
                   }
                   return u.Observable.empty()
               }, n.prototype.setBaseUrl = function(n) {
                   this.baseUrl = n, this.url = this.baseUrl + "/search"
               }, n.prototype.setTagFilter = function(n) {
                   this.tagFilters = n
               }, n.prototype.addTagFilter = function(n) {
                   this.tagFilters.push(n)
               }, n.prototype.removeTagFilter = function(n) {
                   -1 !== this.tagFilters.indexOf(n) && this.tagFilters.splice(this.tagFilters.indexOf(n), 1)
               }, n.prototype.clearTagFilter = function() {
                   this.tagFilters = []
               }, n.prototype.setPresetTagFilters = function(n) {
                   this.presetTagFilters = n
               }, n.prototype.setPresetSitesFilters = function(n) {
                   this.presetSitesFilters = n
               }, n.ctorParameters = function() {
                   return [{
                       type: e.k
                   }]
               }, n
           }()
   },
   x35b: function(n, l, t) {
       "use strict";
       Object.defineProperty(l, "__esModule", {
           value: !0
       });
       var e = (t("XS25"), t("3j3K")),
           u = t("kZql"),
           r = t("Qbdm"),
           i = t("kke6");
       u.a.production && t.i(e.a)(), t.i(r.a)().bootstrapModuleFactory(i.a)
   },
   yCaw: function(n, l, t) {
       "use strict";
       t.d(l, "a", function() {
           return e
       });
       var e = [".rim-clear-tag-filter[_ngcontent-%COMP%]:hover{cursor:pointer}.rim-clear-tag-filter[_ngcontent-%COMP%], a.rim-tag-item.ui.label[_ngcontent-%COMP%]{margin:.3em}.tag[_ngcontent-%COMP%]{font-weight:300}"]
   }
}, [0]);