<template>

    <div :class="css">
        <template v-for="(item, index) in data.options">
            <label v-bind:class="label_class" v-bind:style="label_style">
                <input type="radio"
                       @click="data.selected = $event.target.value"
                       :class="input_class"
                       :style="input_style"
                       :name="name"
                       :value="item.value"
                       v-model="data.selected"
                >
                {{item.text}}
            </label>
        </template>
    </div>

</template>


<script>
    export default {
        props: {
            css: {
                default: 'inline-block'
            },
            input_class: {
                default: ''
            },
            input_style: {
                default: ''
            },
            label_class: {
                default: 'radio-inline'
            },
            label_style: {
                default: 'padding-left: 0px;padding-right: 10px'
            },
            data: {
                required: true,
                default: {
                    selected: '',
                    options: [
                        {value:'', text:'未传选项值'}
                    ]
                }
            },
            name: {
                default: 'RadioComponent' + Math.ceil(Math.random() * 10000000)
            }
        }
    }
    /**
     * input radio组件
     * 参数见props属性
     */
</script>