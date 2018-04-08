# IVTable

PHP后端开发工程师写的 基于VUE的轻量化表格渲染和分页组件

#### 来由
刚入职小米做平台研发后端开发工作，小组内的项目都在用jquery-datatable方式展示表单数据，而公司内的前端组开发的hi-ui用的也是datatable插件，对单数据定制化功能，数据构造渲染等不是很方便。然后我就想写个啥工具来替换它，将想法与同事交流后，大家都想换。因为当时对vue的插件开发不怎么熟悉,边学边做最终用了一周把这个插件写出来了, 并在小组内使用,成功提升了后期任务的开发效率及开发愉悦度。

# 编译方式

    npm install
    npm run build

生成库文件到dist/ivtable.js




# 表格

### 调用方式
    <script src="dist/ivtable.js"></script>

     <IVTable
         :item_actions="table_item_actions"
         :table_data="table_data.rows"
         :table_columns="table_columns"
         :table_hint_text="table_hint_text"
         table_css="table table-striped table-advance table-hover"
     ></IVTable>


### 数据格式

    table_hint_text: '数据加载中... | 暂无数据'  //此数据属性有数据时，不显示数据表的数据
    table_columns 数据结构如下
    tableColumns: [
      {
              name: 'activity_id',
              title: '活动ID',      //列头
              title_css: '',     //table>thead>tr>th class
              data_css: '',      //table>tbody>tr>td class
              style: 'width: 80px;',
              callback: ''    //对该列值进行处理的回调函数
      },
      {
              name: 'activity_type',
              title: '活动类型',
              title_css: '',
              data_css: '',
              style: 'width: 80px;'
      },
      {
               name: '__actions',  //操作选项
               title_css: '',
               data_css: '',
               title: '操作',
      }
    ]
     
    table_data 数据结构如下：
    table_data: [
       {
               'activity_id': '1',
               'activity_type': '全国活动'
        },
       {
               'activity_id': '2',
               'activity_type': '安徽省内活动'
       }
      ]
  
    item_actions: [
       { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button', displayed: 'action_allow_info' }, //action_allow_info返回 true或false，返回true时显示此控件，返回false时不显示
       { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button', displayed: 'action_allow_edit' },
      ]



# 分页组件

### 调用方式
         <IVPagination
             :page_data="table_data"
             :pagination_button_length="4"
         ></IVPagination>
        
        
        
# 示例

### HTML

    <section class="panel">
        <div class="panel-body">
         <div class="adv-table editable-table">
             <div class="dataTables_wrapper">
                 <s-table
                         :item_actions="table_item_actions"
                         :table_data="table_data.rows"
                         :table_columns="table_columns"
                         :table_hint_text="table_hint_text"
                         table_css="table table-striped table-advance table-hover"
                 ></s-table>
            
                 <s-pagination
                         :page_data="table_data"
                         :pagination_button_length="4"
                 ></s-pagination>
             </div>
         </div>
        </div>
    </section>
    
#### JS

    //渲染的表格头
    var table_columns = [
        {
            name: 'id',
            title: 'ID',
        },
        {
            name: 'channel',
            title: '渠道',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'start_time',
            title: '开始时间',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'end_time',
            title: '结束时间',
            title_css:  'hidden-phone hidden-xs hidden-sm',
            data_css:  'hidden-phone hidden-xs hidden-sm',
        },
        {
            name: 'status',
            title: '状态',
            html: true,
            callback: 'format_status'
        },
        {
            name: '__actions',
            title: ''
        }
    ];
    var vueBox = new Vue({
        el: '#vueBox',
        data: {
            table_item_actions: [ //操作控件
                {
                    name: 'delete-item',
                    label: '删除',
                    icon: 'icon icon-remove',
                    css: 'btn btn-xs btn-danger tooltips',
                    displayed: 'show_close_btn',
                    callback: 'delete_item',
                    tooltip: '删除任务'
                },
                {
                    name: 'edit-item',
                    label: '',
                    icon: 'icon icon-pencil',
                    css: 'btn btn-xs btn-primary tooltips',
                    displayed: '',
                    callback: 'edit_item',
                    tooltip: '编辑任务',
                },
            ],
            table_columns: table_columns,
            table_hint_text: '',
            table_data: {
                data_total: 100,
                page_total: 10,
                page_size: 10,
                page_cur: 3,
                data_from: 21,
                data_end: 30,
    
    //                rows: default_table_data
                rows: [
                    {
                        id:'1',
                        channel: 'WEB',
                        start_time: '2017-1-1',
                        end_time: '2017-2-2',
                        status: '进行中'
                    },
                    {
                        id:'2',
                        channel: 'APP',
                        start_time: '2017-1-1',
                        end_time: '2017-2-2',
                        status: '审核失败'
                    }
                ]
            }
        },
        allotStatusOptions: [],
        components:{
            's-table': IVTable,
            's-pagination': IVPagination,
        },
        
        mounted: function () {
    //            this.$nextTick(function(){
    //              
    //            });
        },
        methods:{
            loadServerData: function (post_data) {
                console.log(post_data)
            },
            show_close_btn: function (row, btn) {
                /**
                 * 控制action显示
                 * */
                if(row.id == 1) {
                    return false;
                }
                return true;
            },
            format_status: function (status) {
                if (status === '进行中') {
                    return '<span class="label label-success label-xs">'+status+'</span>';
                }
                if (status === '审核失败') {
                    return '<span class="label label-danger label-xs">'+status+'</span>';
                }
                return status;
            },
            debug: function () {
                console.log(this.$data)
            },
            edit_item: function (btn, row) {
                console.log('你点了我：', btn, row)
                //row 就是一行的数据
                alert('你点击了edit_item函数，详细数据请看console.log')
            },
            delete_item: function (btn, row) {
                console.log('你点了我：', btn, row)
                alert('你点击了delte_item函数，详细数据请看console.log')
            }
        }
    });
    
    
# 扩展自己的组件

1、在src/components里写好自己的组件

2、修改src/index.js文件，把自己的组件加进去

3、npm run build重新编译

4、引用dist/ivtable.js文件，调用即可
