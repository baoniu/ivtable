/**
 * ivtable v1.0.0
 * https://github.com/baoniu/ivtable 
 * Released under the MIT License.
 */

!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var a=e();for(var i in a)("object"==typeof exports?exports:t)[i]=a[i]}}(this,function(){return function(t){function e(i){if(a[i])return a[i].exports;var l=a[i]={exports:{},id:i,loaded:!1};return t[i].call(l.exports,l,l.exports,e),l.loaded=!0,l.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}([function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function l(t){t.component("IVTable",s.default),t.component("IVPagination",c.default),t.component("IVSelect",r.default),t.component("IVRadio",u.default),t.component("IVDateinput",_.default)}Object.defineProperty(e,"__esModule",{value:!0}),e.install=e.IVDateinput=e.IVRadio=e.IVSelect=e.IVPagination=e.IVTable=void 0;var n=a(1),s=i(n),o=a(4),c=i(o),d=a(7),r=i(d),p=a(10),u=i(p),f=a(13),_=i(f);e.IVTable=s.default,e.IVPagination=c.default,e.IVSelect=r.default,e.IVRadio=u.default,e.IVDateinput=_.default,e.install=l},function(t,e,a){var i,l;i=a(2),l=a(3),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default),l&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=l)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{table_hint_text:{default:""},table_data:{default:[],required:!0},table_columns:{default:[],required:!0},table_result:{default:function(){return{selected:[]}}},item_actions:{default:function(){return[]}},table_css:{default:""},thead_css:{default:""},thead_tr_css:{default:""},tbody_css:{default:""},tbody_tr_css:{default:""},detail_row_class:{default:""},css:{type:Object,default:function(){return{table_css:"",thead_css:"",thead_tr_css:"",tbody_css:"",tbody_tr_css:"",detail_row_class:""}}},sortOrder:{type:Array,default:function(){return[]}},track_by:{type:String,default:""},detail_row_component:{type:String,default:""},detail_row_transition:{type:String,default:""}},data:function(){return{eventPrefix:"ivtable:",visible_detail_rows:[]}},created:function(){},watch:{},computed:{countVisibleFields:function(){return this.table_columns.length},useDetailRow:function(){return this.table_data&&this.table_data[0]&&""!==this.detail_row_component&&"undefined"==typeof this.table_data[0][this.track_by]?(this.warn("You need to define unique row identifier in order for detail-row feature to work. Use `track-by` prop to define one!"),!1):""!==this.detail_row_component}},methods:{isVisibleDetailRow:function(t){return this.visible_detail_rows.indexOf(t)>=0},showDetailRow:function(t){this.isVisibleDetailRow(t)||this.visible_detail_rows.push(t)},hideDetailRow:function(t){this.isVisibleDetailRow(t)&&this.visible_detail_rows.splice(this.visible_detail_rows.indexOf(t),1)},toggleDetailRow:function(t){this.isVisibleDetailRow(t)?this.hideDetailRow(t):this.showDetailRow(t)},onDetailRowClick:function(t,e){this.$emit(this.eventPrefix+"detail-row-clicked",t,e)},isSpecialField:function(t){return"__"===t.slice(0,2)},callAction:function(t,e,a){if(this.hasCallback(t))return"function"==typeof this.$parent[t.callback]?this.$parent[t.callback].apply(t.callback,[t].concat(e)):void this.$emit(this.eventPrefix+"action",t,e,a)},callActionItem:function(t,e){return!this.isDisplay(t)||"function"==typeof this.$parent[t.displayed]&&this.$parent[t.displayed].apply(t,[e].concat(t))},getTitle:function(t){return"undefined"==typeof t.title?t.name.replace("."," "):t.title},isSortable:function(t){return!("undefined"==typeof t.sortField)},isCurrentSortField:function(t){return this.currentSortOrder(t)!==!1},currentSortOrder:function(t){if(!this.isSortable(t))return!1;for(var e=0;e<this.sortOrder.length;e++)if(this.sortOrder[e].field===t.name)return e;return!1},hasItem:function(t){return!!t},hasCallback:function(t){return!!t.callback},hasHtml:function(t){return!!t.html},isDisplay:function(t){return!!t&&!!t.displayed},extractName:function(t){return t.split(":")[0].trim()},extractArgs:function(t){return t.split(":")[1]},toggleCheckbox:function(t,e,a){var i=a.target.checked,l=this.extractArgs(e);if(void 0===l)return void this.warn('You did not provide reference id column with "__checkbox:<column_name>" field!');var n=t[l];i?this.selectId(n):this.unselectId(n)},selectId:function(t){this.isSelectedRow(t)||this.table_result.selected.push(t)},unselectId:function(t){this.table_result.selected=this.table_result.selected.filter(function(e){return e!==t})},isSelectedRow:function(t){return this.table_result.selected.indexOf(t)>=0},rowSelected:function(t,e){var a=this.extractArgs(e),i=t[a];return this.isSelectedRow(i)},toggleAllCheckboxes:function(t,e){var a=this,i=t.name,l=e.target.checked,n=this.extractArgs(i);l?this.table_data.forEach(function(e){a.callCallback(t,e)||a.selectId(e[n])}):this.table_data.forEach(function(e){a.callCallback(t,e)||a.unselectId(e[n])})},callCallback:function(t,e){if(this.hasCallback(t)){var a=t.callback.split("|"),i=a.shift();return"function"==typeof this.$parent[i]?a.length>0?this.$parent[i].apply(this.$parent,[this.getObjectValue(e,t.name)].concat(a)):this.$parent[i].call(this.$parent,this.getObjectValue(e,t.name),e):null}},onCellClicked:function(t,e,a){this.$emit(this.eventPrefix+"cell-clicked",t,e,a)},onCellDoubleClicked:function(t,e,a){this.$emit(this.eventPrefix+"cell-dblclicked",t,e,a)},getObjectValue:function(t,e,a){a="undefined"==typeof a?null:a;var i=t;if(""!=e.trim()){var l=e.split(".");l.forEach(function(t){return null===i||"undefined"==typeof i[t]||null===i[t]?void(i=a):void(i=i[t])})}return i}}}},function(t,e){t.exports=' <table :class="[table_css || \'\']"> <thead> <tr :class="[thead_tr_css || \'\']"> <template v-for="(field, index) in table_columns"> <template v-if=isSpecialField(field.name)> <th v-if="extractName(field.name) == \'__checkbox\'" :style="[ field.style || \'\' ]" :class="[field.title_css || \'\']"> <input type=checkbox @change="toggleAllCheckboxes(field, $event)"> </th> <th v-if="extractName(field.name) == \'__id\'" :style="[ field.style || \'\' ]" :class="[field.title_css || \'\']"> {{ getTitle(field) }} </th> <th v-if="extractName(field.name) == \'__actions\'" :style="[ field.style || \'\' ]" :class="[field.title_css || \'\']"> {{ getTitle(field) }} </th> <th v-if="extractName(field.name) == \'__component\'" @click="orderBy(field, $event)" :class="[field.title_css, {\'sortable\': isSortable(field)}]" :style="[ field.style || \'\' ]" v-html="field.title || \'\'"> <i v-if="isCurrentSortField(field) && field.title" :class=sortIcon(field) :style="{opacity: sortIconOpacity(field)}"></i> </th> </template> <template v-if=!isSpecialField(field.name)> <template v-if=!hasHtml(field)> <th :id="(\'_\' + index + \'-\' + field.name)" :style="[ field.style || \'\' ]" :class="[ field.title_css || \'\' ]"> {{ getTitle(field) }} </th> </template> <template v-if=hasHtml(field)> <th v-html=getTitle(field) :id="(\'_\' + index + \'-\' + field.name)" :style="[ field.style || \'\' ]" :class="[ field.title_css || \'\' ]"></th> </template> </template> </template> </tr> </thead> <tbody :class="[ tbody_css || \'\' ]"> <template v-if="!table_data || table_data.length < 1 || table_hint_text"> <template v-if=table_hint_text> <tr :class="[ tbody_tr_css || \'\' ]"><td :colspan=countVisibleFields>{{table_hint_text}}</td></tr> </template> <template v-if=!table_hint_text> <tr :class="[ tbody_tr_css || \'\' ]"><td :colspan=countVisibleFields>暂无数据</td></tr> </template> </template> <template v-if="!(!table_data || table_data.length < 1 || table_hint_text)"> <template v-for="(item, item_index) in table_data"> <tr :class="[ tbody_tr_css || \'\' ]"> <template v-for="field in table_columns"> <template v-if=isSpecialField(field.name)> <td v-if="extractName(field.name) == \'__checkbox\'" :class="[{\'ivtable-checkboxes\': true}, field.data_css]"> <input type=checkbox @change="toggleCheckbox(item, field.name, $event)" v-if=hasCallback(field) :disabled="callCallback(field, item)" :checked="rowSelected(item, field.name)"> <input type=checkbox v-if=!hasCallback(field) @change="toggleCheckbox(item, field.name, $event)" :checked="rowSelected(item, field.name)"> </td> <td v-if="field.name == \'__actions\'" :class="[ field.data_css || \'\']"> <template v-for="action in item_actions"> <template v-if=isDisplay(action)> <template v-if=hasItem(action.tooltip)> <label v-if="callActionItem(action, item)" :class="[ action.css || \'\']" @click="callAction(action, item, $event)" data-toggle=tooltip data-placement=top :title=action.tooltip> <i :class="[ action.icon || \'\']"></i> {{ action.label }} </label>&nbsp; </template> <template v-if=!hasItem(action.tooltip)> <label v-if="callActionItem(action, item)" :class="[ action.css || \'\']" @click="callAction(action, item, $event)"> <i :class="[ action.icon || \'\']"></i> {{ action.label }} </label>&nbsp; </template> </template> <template v-if=!isDisplay(action)> <template v-if=hasItem(action.tooltip)> <label :class="[ action.css || \'\']" @click="callAction(action, item, $event)" data-toggle=tooltip data-placement=top :title=action.tooltip> <i :class="[ action.icon || \'\']"></i> {{ action.label }} </label>&nbsp; </template> <template v-if=!hasItem(action.tooltip)> <label :class="[ action.css || \'\']" @click="callAction(action, item, $event)"> <i :class="[ action.icon || \'\']"></i> {{ action.label }} </label>&nbsp; </template> </template> </template> </td> <td v-if="field.name == \'__id\'" :class="[ field.data_css || \'\']"> {{ item_index + 1}} </td> <td v-if="extractName(field.name) === \'__component\'" :class=field.data_css> <component :is=extractArgs(field.name) :row-data=item></component> </td> </template> <template v-if=!isSpecialField(field.name)> <template v-if=!hasHtml(field)> <td v-if=hasCallback(field) :class="[ field.data_css || \'\']" @click="onCellClicked(item, field, $event)" @dblclick="onCellDoubleClicked(item, field, $event)"> {{ callCallback(field, item) }} </td> <td v-else :class="[ field.data_css || \'\']" @click="onCellClicked(item, field, $event)"> {{ getObjectValue(item, field.name, "") }} </td> </template> <template v-if=hasHtml(field)> <td v-if=hasCallback(field) :class="[ field.data_css || \'\']" @click="onCellClicked(item, field, $event)" v-html="callCallback(field, item)"> </td> <td v-else :class="[ field.data_css || \'\']" @click="onCellClicked(item, field, $event)" v-html="getObjectValue(item, field.name, \'\')"> </td> </template> </template> </template> </tr> <template v-if=useDetailRow> <tr v-if=isVisibleDetailRow(item[track_by]) @click="onDetailRowClick(item, $event)" :class=[detail_row_class]> <transition :name=detail_row_transition> <td :colspan=countVisibleFields> <component :is=detail_row_component :row-data=item :row-index=item_index></component> </td> </transition> </tr> </template> </template> </template> </tbody> </table> '},function(t,e,a){var i,l;i=a(5),l=a(6),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default),l&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=l)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{pagination_button_length:{default:7},page_data:{required:!0}},data:function(){return{pagination_goto_num:""}},watch:{page_data:{handler:function(t,e){this.$set(this,"pagination_button_length",parseInt(this.pagination_button_length?this.pagination_button_length:7)),this.$set(this.page_data,"page_total",parseInt(this.page_data.page_total?this.page_data.page_total:0)),this.$set(this.page_data,"data_total",parseInt(this.page_data.data_total?this.page_data.data_total:1)),this.$set(this.page_data,"page_size",parseInt(this.page_data.page_size?this.page_data.page_size:1)),this.$set(this.page_data,"page_cur",parseInt(this.page_data.page_cur?this.page_data.page_cur:1)),this.$set(this.page_data,"data_from",parseInt(this.page_data.page_size*(this.page_data.page_cur-1)+1)),this.$set(this.page_data,"data_to",parseInt(this.page_data.page_size*(this.page_data.page_cur-1)+this.page_data.rows.length))}},deep:!0},computed:{page_total:function(){if(this.page_data.page_size<=0&&(this.page_data.page_size=10),this.page_data.data_total<=0)return 0;var t=Math.ceil(parseInt(this.page_data.data_total)/parseInt(this.page_data.page_size));return this.page_data.page_total!==t&&(this.page_data.page_total=t),this.page_data.page_total},pagination_buttons:function(){var t=[],e=-1,a=1;if(this.page_data.page_cur>this.page_total&&(this.page_data.page_cur=this.page_total),this.page_data.page_cur<1&&(this.page_data.page_cur=1),this.page_data.data_total<=0)return void console.log("总数据条数若小于等于0，拒绝渲染");t.push(this.page_data.page_cur);for(var i=0;i<this.pagination_button_length;++i)this.page_data.page_cur+a<=this.page_total&&t.length<=this.pagination_button_length&&(t.push(this.page_data.page_cur+a),++a),this.page_data.page_cur+e>=1&&t.length<=this.pagination_button_length&&(t.unshift(this.page_data.page_cur+e),--e);return!isNaN(parseInt(t[t.length-1]))&&t[t.length-1]<this.page_total&&t.push("..."),!isNaN(parseInt(t[0]))&&t[0]>1&&t.unshift("..."),t}},methods:{pagination_first:function(){this.page_data.page_cur=1},pagination_last:function(){this.page_data.page_cur=this.page_total},pagination_previous:function(){this.page_data.page_cur-1>=1&&parseInt(--this.page_data.page_cur)},pagination_next:function(){this.page_data.page_cur+1<=this.page_total&&parseInt(++this.page_data.page_cur)},pagination_button_click:function(t){if("..."!=t.currentTarget.getAttribute("data-value"))this.page_data.page_cur=parseInt(t.currentTarget.getAttribute("data-value"));else if(t.currentTarget.nextSibling){var e=parseInt(this.page_data.page_cur)-this.pagination_button_length;this.page_data.page_cur=e>=1?e:1}else{var a=this.page_data.page_cur+this.pagination_button_length;this.page_data.page_cur=a<=this.page_total?a:this.page_total}},pagination_goto:function(t){this.page_data.page_cur=t.currentTarget.value?parseInt(t.currentTarget.value):1}}}},function(t,e){t.exports=' <div class=row v-if="this.page_data.data_total > 0"> <div class="col-lg-6 hidden-phone hidden-xs hidden-sm"> <div class=dataTables_info>第 {{ page_data.data_from }} 到 {{ page_data.data_to }} 条 共计 {{ page_data.data_total }} 条</div> </div> <div class=col-lg-6> <div class="dataTables_paginate paging_bootstrap pagination"> <ul> <li class=first v-bind:class="{ disabled: page_data.page_cur <= 1 }"><a href=javascript:void(0) v-on:click=pagination_first>首页</a></li> <li class=prev v-bind:class="{ disabled: page_data.page_cur <= 1 }"><a href=javascript:void(0) v-on:click=pagination_previous>← 上一页</a></li> <span> <li v-for="button_num in pagination_buttons" v-bind:class="{active: page_data.page_cur == button_num}" v-on:click=pagination_button_click($event) :data-value=button_num><a href=javascript:void(0)>{{ button_num }}</a></li> </span> <li class=next v-bind:class="{ disabled: page_data.page_cur >= page_data.page_total }"><a href=javascript:void(0) v-on:click=pagination_next>下一页 → </a></li> <li class=last v-bind:class="{ disabled: page_data.page_cur >= page_data.page_total }"><a href=javascript:void(0) v-on:click=pagination_last>末页</a></li> </ul> </div> </div> </div> '},function(t,e,a){var i,l;i=a(8),l=a(9),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default),l&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=l)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{css:{default:""},_style:{default:""},name:{default:"SelectComponent"+Math.ceil(1e7*Math.random())},data:{required:!0,default:{selected:"",options:[{value:"",text:"未传选项值"}]}}}}},function(t,e){t.exports=' <select v-on:change="data.selected = $event.target.value" v-bind:class=css v-bind:style=_style v-bind:name=name v-model=data.selected> <template v-for="option in data.options"> <option v-bind:value=option.value>{{ option.text }}</option> </template> </select> '},function(t,e,a){var i,l;i=a(11),l=a(12),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default),l&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=l)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{css:{default:"inline-block"},input_class:{default:""},input_style:{default:""},label_class:{default:"radio-inline"},label_style:{default:""},data:{required:!0,default:{selected:"",options:[{value:"",text:"未传选项值"}]}},name:{default:"RadioComponent"+Math.ceil(1e7*Math.random())}}}},function(t,e){t.exports=' <div :class=css> <template v-for="(item, index) in data.options"> <label v-bind:class=label_class v-bind:style=label_style> <input type=radio @click="data.selected = $event.target.value" :class=input_class :style=input_style :name=name :value=item.value v-model=data.selected> {{item.text}} </label> </template> </div> '},function(t,e,a){var i,l;i=a(14),l=a(15),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default),l&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=l)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{date_range:{required:!0},name_from:{default:"from"+Math.ceil(999999*Math.random())},name_to:{default:"to"+Math.ceil(999999*Math.random())}},watch:{"date_range.from":function(t,e){""===t&&$("[name="+this.name_from+"]").datepicker("setDate",null)},"date_range.to":function(t,e){""===t&&$("[name="+this.name_to+"]").datepicker("setDate",null)}},mounted:function(){var t=this;this.$parent.$nextTick(function(){var e=$("[name="+t.name_from+"]"),a=$("[name="+t.name_to+"]");e.on("change",function(){t.$set(t.date_range,"from",$(this).val())}),a.on("change",function(){t.$set(t.date_range,"to",$(this).val())});var i=new Date,l=(new Date(i.getFullYear(),i.getMonth(),i.getDate(),0,0,0,0),e.datepicker({format:"yyyy-mm-dd",language:"zh-CN",autoclose:!0}).on("changeDate",function(e){l.hide(),$("[name="+t.name_to+"]")[0].focus()}).data("datepicker")),n=a.datepicker({format:"yyyy-mm-dd",language:"zh-CN",autoclose:!0}).on("changeDate",function(t){n.hide()}).data("datepicker")})}}},function(t,e){t.exports=' <div class=inline-block> <div class=input-group style="max-width: 500px;padding-top: 5px"> <span class=input-group-addon>从</span> <input v-bind:name=name_from class="form-control date data-filter" placeholder=开始日期 data-date-format=YYYY-MM-DD type=text> <span class="input-group-addon middle-addon">到</span> <input v-bind:name=name_to class="form-control date data-filter" placeholder=结束日期 data-date-format=YYYY-MM-DD type=text> </div> </div> '}])});