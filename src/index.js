import ivtable from './components/IVTable.vue'
import ivpagination from './components/IVPagination.vue'
import ivselect from './components/IVSelect.vue'
import ivradio from './components/IVRadio.vue'
import ivdateinput from './components/IVDateinput.vue'

function install(Vue){
    Vue.component("ivtable", ivtable);
    Vue.component("ivpagination", ivpagination);
    Vue.component("ivselect", ivselect);
    Vue.component("ivradio", ivradio);
    Vue.component("ivdateinput", ivdateinput);
}
export {
    ivtable,
    ivpagination,
    ivselect,
    ivradio,
    ivdateinput,
    install
};

export default ivtable;
