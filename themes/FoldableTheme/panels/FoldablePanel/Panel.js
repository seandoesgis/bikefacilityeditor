// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/_base/array dojo/on dojo/keys dojo/aspect jimu/BaseWidgetPanel jimu/BaseWidgetFrame jimu/utils ./FoldableDijit ./FoldableWidgetFrame".split(" "), function (m, d, b, k, h, f, n, p, q, l, r, t) {
    return m([p, r], {
        baseClass: "jimu-panel jimu-foldable-dijit jimu-foldable-panel",
        closeTolerance: 30,
        openAnimation: "fadeIn",
        closeAnimation: "fadeOut",
        animationDuration: 500,
        postMixInProperties: function () {
            this.headerNls = window.jimuNls.panelHeader
        },
        startup: function () {
            this.titleHeight =
                35;
            this.inherited(arguments);
            b.addClass(this.titleNode, "jimu-panel-title jimu-main-background");
            this.createFoldableBtn();
            this.createMaxBtn();
            this.createCloseBtn();
            this.panelManager.normalizePanel(this);
            this.own(h(this.domNode, "keydown", d.hitch(this, function (a) {
                b.hasClass(a.target, "close-btn") || a.keyCode !== f.ESCAPE || this.closeNode.focus()
            })))
        },
        getPanelPosition: function () {
            if (window.appInfo.isRunInMobile) return this.panelManager.getPositionOnMobile(this);
            var a = d.clone(this.position);
            "undefined" === typeof a.width &&
                (a.width = 340);
            "minimized" === this.windowState ? (a.bottom = "auto", a.height = this.titleHeight, a.borderRadiusStyle = {
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            }) : (a.bottom = this.position.bottom, a.height = "auto", a.borderRadiusStyle = {
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px"
            });
            return a
        },
        onOpen: function () {
            this.inherited(arguments);
            this.onNormalize();
            if (l.isInNavMode() && "minimized" ===
                this.windowState) this.onFoldableNodeClick()
        },
        onNormalize: function () {
            this.resize()
        },
        onMaximize: function () {
            this.resize()
        },
        onMinimize: function () {
            this.resize()
        },
        resize: function () {
            this._switchMaxBtn();
            this._switchParentNode();
            var a = this.getPanelPosition();
            this.position.zIndex && (a.zIndex = this.position.zIndex);
            var c = l.getPositionStyle(a);
            d.mixin(c, a.borderRadiusStyle);
            b.setStyle(this.domNode, c);
            1 < this.getChildren().length && this._setFrameSize(a.contentHeight);
            this.inherited(arguments)
        },
        reloadWidget: function (a) {
            this.inherited(arguments);
            this.isWidgetInPanel(a) && (Array.isArray(this.config.widgets) || this.setTitleLabel(a.label))
        },
        updateConfig: function (a) {
            this.inherited(arguments);
            this.setTitleLabel(a.label)
        },
        _switchMaxBtn: function () {
            window.appInfo.isRunInMobile ? b.setStyle(this.maxNode, "display", "") : b.setStyle(this.maxNode, "display", "none")
        },
        _switchParentNode: function () {
            window.appInfo.isRunInMobile && this.domNode && this.domNode.parentNode !== b.byId(jimuConfig.layoutId) ? b.place(this.domNode, jimuConfig.layoutId) : !window.appInfo.isRunInMobile &&
                this.domNode && this.domNode.parentNode !== b.byId(this.map.id) && b.place(this.domNode, this.map.id)
        },
        _setFrameSize: function (a) {
            var c = 0;
            k.forEach(this.getChildren(), function (e) {
                e.folded || c++
            }, this);
            "undefined" === typeof a && (a = b.getContentBox(this.containerNode).h);
            var g = (a - (this.getChildren().length - c) * this.getChildren()[0].titleHeight) / c;
            k.forEach(this.getChildren(), function (e) {
                e.folded ? b.setStyle(e.domNode, {
                    height: e.titleHeight + "px"
                }) : b.setStyle(e.domNode, {
                    height: g + "px"
                });
                e.resize()
            }, this)
        },
        createCloseBtn: function () {
            this.closeNode =
                b.create("div", {
                    "class": "close-btn",
                    role: "button",
                    "aria-label": this.headerNls.closeWindow,
                    tabindex: 0
                }, this.btnsContainer);
            this.own(h(this.closeNode, "click", d.hitch(this, function (a) {
                a.stopPropagation();
                this.panelManager.closePanel(this)
            })));
            this.own(h(this.closeNode, "keydown", d.hitch(this, function (a) {
                a.keyCode === f.ENTER || a.keyCode === f.SPACE ? this.panelManager.closePanel(this) : !a.shiftKey && a.keyCode === f.TAB && this.isGroupPanel && (a.preventDefault(), this.firstTitleNode.focus())
            })))
        },
        createMaxBtn: function () {
            this.maxNode =
                b.create("div", {
                    "class": "max-btn",
                    role: "button",
                    "aria-label": this.headerNls.maxWindow,
                    tabindex: 0
                }, this.btnsContainer);
            this.own(h(this.maxNode, "click", d.hitch(this, function (a) {
                a.stopPropagation();
                this.onMaxNodeClick()
            })));
            this.own(h(this.maxNode, "keydown", d.hitch(this, function (a) {
                if (a.keyCode === f.ENTER || a.keyCode === f.SPACE) a.stopPropagation(), this.onMaxNodeClick()
            })))
        },
        createFrame: function (a) {
            this.config.widgets && 1 === this.config.widgets.length || !this.config.widgets ? a = new q : (a = new t({
                label: a.label,
                widgetManager: this.widgetManager
            }), n.after(a, "onFoldStateChanged", d.hitch(this, function () {
                var c = 0;
                this._setFrameSize();
                k.forEach(this.getChildren(), function (g) {
                    g.folded || c++
                }, this);
                k.forEach(this.getChildren(), function (g) {
                    g.foldEnable = g.folded || 1 !== c ? !0 : !1
                }, this)
            })));
            return a
        },
        onFoldableNodeClick: function () {
            this.inherited(arguments);
            "minimized" === this.windowState ? this.panelManager.normalizePanel(this) : this.panelManager.minimizePanel(this);
            b.setAttr(this.maxNode, "aria-label", this.headerNls.maxWindow)
        },
        onMaxNodeClick: function () {
            "maximized" === this.windowState ? (b.setAttr(this.maxNode, "aria-label", this.headerNls.maxWindow), this.panelManager.normalizePanel(this)) : (b.setAttr(this.maxNode, "aria-label", this.headerNls.restoreWindow), this.panelManager.maximizePanel(this), this.folded = !1, b.removeClass(this.foldableNode, "folded"), b.setAttr(this.foldableNode, "aria-label", this.headerNls.foldWindow))
        },
        moveTitle: function () {
            this.isFull ? this.folded ? b.setStyle(this.domNode, {
                top: b.getMarginBox(jimuConfig.layoutId).h -
                    this.titleHeight + "px"
            }) : b.setStyle(this.domNode, {
                top: "0px"
            }) : b.setStyle(this.domNode, {
                top: this.position.top + "px"
            })
        }
    })
});