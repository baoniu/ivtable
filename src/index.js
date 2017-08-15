import IVTable from './components/IVTable.vue'
import IVPagination from './components/IVPagination.vue'
import IVSelect from './components/IVSelect.vue'
import IVRadio from './components/IVRadio.vue'
import IVDateinput from './components/IVDateinput.vue'
import IVDateTimeinput from './components/IVDateTimeinput.vue'

function install(Vue){
    Vue.component("IVTable", IVTable);
    Vue.component("IVPagination", IVPagination);
    Vue.component("IVSelect", IVSelect);
    Vue.component("IVRadio", IVRadio);
    Vue.component("IVDateinput", IVDateinput);
    Vue.component("IVDateTimeinput", IVDateTimeinput);
}
export {
    IVTable,
    IVPagination,
    IVSelect,
    IVRadio,
    IVDateinput,
    IVDateTimeinput,
    install
};

//export default IVTable;