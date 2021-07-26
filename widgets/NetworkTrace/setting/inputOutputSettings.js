// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/NetworkTrace/setting/inputOutputSettings.html":'\x3cdiv\x3e\r\n    \x3c!-- Input table node --\x3e\r\n    \x3cdiv class\x3d"esriCTClearBoth esriCTInputTableParentContainer"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"inputTableNode"\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3c!-- Summary text --\x3e\r\n    \x3cdiv class\x3d"esriCTClearBoth esriCTSummaryTextParentContainer"\x3e${nls.inputOutputTab.summaryTextTitle}\x3c/div\x3e\r\n    \x3c!-- Summary text container --\x3e\r\n    \x3cdiv class\x3d"esriCTClearBoth esriCTInputEditorParentContainer"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"inputEditorContainer"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/query dojo/dom-construct dojo/dom-style dojo/on ./SymbolChooserPopup jimu/symbolUtils esri/symbols/jsonUtils dojo/_base/html jimu/dijit/SimpleTable dojo/text!./inputOutputSettings.html dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/Editor dijit/form/Select dijit/_editor/plugins/LinkDialog dijit/_editor/plugins/ViewSource dijit/_editor/plugins/FontChoice dojox/editor/plugins/Preview dijit/_editor/plugins/TextColor dojox/editor/plugins/ToolbarLineBreak dojox/editor/plugins/FindReplace dojox/editor/plugins/PasteFromWord dojox/editor/plugins/InsertAnchor dojox/editor/plugins/Blockquote dojox/editor/plugins/UploadImage jimu/dijit/EditorChooseImage jimu/dijit/EditorTextColor jimu/dijit/EditorBackgroundColor".split(" "),
function(r,e,p,t,k,m,q,u,v,n,w,x,y,z,A,B,C,D){return r([z,A,B],{templateString:y,baseClass:"jimu-widget-NetworkTrace-setting",_loadedPluginCSS:!1,hasSkipLocationsInput:!1,_editorObj:null,startup:function(){this.inherited(arguments);this.hasSkipLocationsInput=this._loadedPluginCSS=!1;this._editorObj=null},postCreate:function(){this.hasSkipLocationsInput=this._loadedPluginCSS=!1;this._createInputTable();this._initInputEditor();this._setInputSummaryText()},_createInputTable:function(){this._inputTable=
new x({fields:[{name:"displayName",title:this.nls.common.name,type:"text",width:"15%"},{name:"type",title:this.nls.inputOutputTab.typeText,type:"empty",width:"25%"},{name:"toolTip",title:this.nls.inputOutputTab.inputTooltip,editable:!0,type:"text",width:"40%"},{name:"symbol",title:this.nls.inputOutputTab.symbol,type:"empty",width:"10%"}],selectable:!1});this._inputTable.placeAt(this.inputTableNode);this._inputTable.startup();this.setInputSettings()},getInputSettings:function(){var b;var a=[];p.forEach(this._inputTable.getRows(),
e.hitch(this,function(c){var d={};c&&(d=this._inputTable.getRowData(c),b=this._getInputType(c.inputTypeDropdownObj),d={paramName:c.config.paramName,displayName:c.config.displayName,toolTip:d.toolTip,type:b,symbol:c.symbol},a.push(d))}));return a},setInputSettings:function(){this._inputTable.clear();this.inputConfig&&0<this.inputConfig.length&&p.forEach(this.inputConfig,e.hitch(this,function(b){var a;var c=this._inputTable.addRow(b);c.tr.config=b;b.type&&this.inputDataTypes.skip_locations===b.type&&
(this.hasSkipLocationsInput=!0);if(a=t(".simple-table-cell",c.tr))this._addInputTypesDropDown(a[1],c.tr,b),this._addSymbolPicker(a[3],c.tr,b)}))},_getFallbackSymbol:function(b){b||(b="esriGeometryPoint");switch(b){case "esriGeometryPoint":var a={color:[0,0,128,128],outline:{color:[0,0,128,255],width:.75,type:"esriSLS",style:"esriSLSSolid"},size:18,type:"esriSMS",style:"esriSMSCircle"};break;case "esriGeometryPolygon":a={color:[155,187,89,129],outline:{color:[115,140,61,255],width:1.5,type:"esriSLS",
style:"esriSLSSolid"},type:"esriSFS",style:"esriSFSSolid"};break;case "esriGeometryPolyline":a={color:[155,187,89,255],type:"esriSLS",style:"esriSLSSolid",width:2.25}}return a},_addSymbolPicker:function(b,a,c){var d={},g="";var h=c&&c.data&&c.data.defaultValue&&c.data.defaultValue.geometryType?c.data.defaultValue.geometryType:"esriGeometryPoint";c.displayName&&(g=c.displayName);d.symbol=a.symbol?n.fromJson(a.symbol):c&&c.symbol?n.fromJson(c.symbol):n.fromJson(this._getFallbackSymbol(h));var l={symbolChooserTitle:g,
symbolParams:d,nls:this.nls,symbolType:"graphicLocationSymbol"},f=k.create("div",{style:"height: 27px; overflow: hidden;"},b);this._showSelectedSymbol(f,d.symbol,a,h);this.own(q(f,"click",e.hitch(this,function(){l.symbolParams.symbol=n.fromJson(a.symbol);this._initSymbolChooserPopup(l,f,a,h)})))},_initSymbolChooserPopup:function(b,a,c,d){var g=new u(b);g.onOkClick=e.hitch(this,function(){var h=g.symbolChooser.getSymbol();this._showSelectedSymbol(a,h,c,d);g.popup.close()})},_showSelectedSymbol:function(b,
a,c,d){k.empty(b);if(a){if(26<a.height){var g=e.clone(a.height);a.height=26}if(26<a.width){var h=e.clone(a.width);a.width=26}if(20<a.size){var l=e.clone(a.size);a.size=20}var f=v.createSymbolNode(a);f||(f=k.create("div"));k.place(f,b);g&&(a.height=g);h&&(a.width=h);l&&(a.size=l);switch(d){case "esriGeometryPoint":m.set(b,"margin","0 24px");break;case "esriGeometryPolyline":m.set(f,"width","27px"),m.set(f,"overflow","hidden"),m.set(f,"margin","0 24px")}c.symbol=a.toJson()}},_addInputTypesDropDown:function(b,
a,c){b=k.create("div",{"class":"esriCTDropDownContainer"},b);var d=new D({options:[{label:this.nls.inputOutputTab.flag,value:this.inputDataTypes.flags},{label:this.nls.inputOutputTab.barrier,value:this.inputDataTypes.barriers},{label:this.nls.inputOutputTab.skip,value:this.inputDataTypes.skip_locations}],"class":"esriCTLayerFieldSelector"});d.placeAt(b);d.startup();c.paramName.toLowerCase()===Object.keys(this.inputDataTypes)[0].toLowerCase()&&d.set("value",this.inputDataTypes.flags);c.paramName.toLowerCase()===
Object.keys(this.inputDataTypes)[1].toLowerCase()&&d.set("value",this.inputDataTypes.barriers);c.paramName.toLowerCase()===Object.keys(this.inputDataTypes)[2].toLowerCase()&&d.set("value",this.inputDataTypes.skip_locations);a.inputTypeDropdownObj=d;a.config&&a.config.type&&d.set("value",a.config.type)},_getInputType:function(b){var a;""!==b&&null!==b&&void 0!==b&&(a=b.get("value"));return a},_initInputEditor:function(){this._editorObj||(this._editorObj=new C({plugins:["bold","italic","underline",
"|","foreColor"]},this.inputEditorContainer),w.setStyle(this._editorObj.domNode,{width:"100%",height:"100%"}),this.own(q(this._editorObj,"blur",e.hitch(this,function(){var b=this._editorObj.focusNode.innerHTML;b=b.replace(/&nbsp;/g,"");var a=/<div><br><\/div>/g;b=b.replace(a,"");a=/<p><br><\/p>/g;b=b.replace(a,"");a=/<p><\/p>/g;b=b.replace(a,"");b=b.replace(/<br>/g,"");b=e.trim(b);null!==b&&""!==b||this._editorObj.set("value","")}))),this._editorObj.onLoadDeferred.then(e.hitch(this,function(){this._editorObj&&
this._editorObj.hasOwnProperty("editNode")&&"title"in this._editorObj.editNode&&(null===this._editorObj.editNode.title||""===this._editorObj.editNode.title)&&(this._editorObj.editNode.title=this.nls.inputOutputTab.summaryEditorText)})),this._editorObj.startup())},getInputSummaryText:function(){if(""!==this._editorObj&&null!==this._editorObj&&void 0!==this._editorObj)return this._editorObj.value},_setInputSummaryText:function(){this.config.hasOwnProperty("inputSummaryText")&&""!==this._editorObj&&
null!==this._editorObj&&void 0!==this._editorObj&&this._editorObj.set("value",this.config.inputSummaryText)}})});