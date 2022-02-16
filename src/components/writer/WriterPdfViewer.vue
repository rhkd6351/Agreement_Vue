<template>
    <div class="writer-pdf-viewer-wrapper">
        <div class="render-box"
        v-if="project.pdf != null"
        >
            <div class="pdf-layer"
            v-for="(width, index) in project.pdf.original_width"
            :key="index"
            @drop="onObjectDropHandler"
            @dragover="onObjectDropHandler"
            @click="onPdfClickHandler(index+1, $event)"
            >
                <pdf 
                :src="`https://junggam.click/api/projects/pdf/${project.pdf.name}`"
                :page="index + 1"
                ></pdf>
                <div class="object-layer">
                    
                    <div class="object-divider"
                    v-for="textObject in textObjects"
                    :key="textObject.idx">
                        <text-object
                        v-if="textObject.page == (index + 1)"
                        :key="textObject.local_idx"
                        :prop-key="textObject.local_idx"
                        :object="textObject"
                        />
                    </div>

                    <div class="object-divider"
                    v-for="signObject in signObjects"
                    :key="signObject.idx">
                        <sign-object
                        v-if="signObject.page == (index + 1)"
                        :key="signObject.local_idx"
                        :prop-key="signObject.local_idx"
                        :object="signObject"
                        />
                    </div>

                    <div class="object-divider"
                    v-for="checkboxObject in checkboxObjects"
                    :key="checkboxObject.idx">
                        <checkbox-object
                        v-if="checkboxObject.page == (index + 1)"
                        :key="checkboxObject.local_idx"
                        :prop-key="checkboxObject.local_idx"
                        :object="checkboxObject"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import pdf from 'vue3-pdf'
import CheckboxObject from './CheckboxObject.vue';
import SignObject from './SignObject.vue';
import TextObject from './TextObject.vue'

export default {

    data: () => {
        
    },

    components: {
        pdf,
        TextObject,
        SignObject,
        CheckboxObject
    },

    computed: {
        textObjects(){
            return this.$store.state.editor.text_objects;
        },

        checkboxObjects(){
            return this.$store.state.editor.checkbox_objects;
        },

        signObjects(){
            return this.$store.state.editor.sign_objects;
        },

        project() {
            return this.$store.state.editor.editing_project;
        }
    },

    methods: {
        onObjectDropHandler(e){
            e.preventDefault();
        },
        onPdfClickHandler(page, event){
            const type = this.$store.state.editor.add_mode;
            const position = {
                x_position: event.offsetX,
                y_position: event.offsetY,
            }
            this.$store.dispatch("addNewObject", {
                type: type,
                page: page,
                position: position
            })

            this.$store.commit("SET_ADD_MODE", "");
        }
    },

    async mounted() {
        
    }

}
</script>

<style lang="scss" scoped>


.writer-pdf-viewer-wrapper{
    min-width: 860px;
    min-height: 480px;
    height: calc(100vh - 168px);
    overflow: auto;
    flex-grow: 1;

    .render-box{
        width: 800px;
        // height: calc(100% - 41px);
        margin: 41px auto 41px auto;

        background-color: #F3F3F3;
    }

    .pdf-layer{
        position: relative;
        margin-bottom: 40px;

        .object{
            z-index: 4;
            width: 100px;
            height: 100px;
            position: absolute;
            top: 100px;
            left: 100px;
            background-color: black;
        }
    }
}

</style>