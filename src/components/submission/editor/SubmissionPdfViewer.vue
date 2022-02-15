<template>
    <div class="editor-pdf-viewer-wrapper">
        <div class="render-box"
        v-if="submission.pdf != null"
        >
            <div class="pdf-layer"
            v-for="(width, index) in submission.pdf.original_width"
            :key="index"
            >
                <pdf
                :src="`https://junggam.click/api/projects/pdf/${submission.pdf.name}`"
                :page="index + 1"
                ></pdf>


                <div class="object-layer">
                    
                    <div class="object-divider"
                    v-for="textObject in textObjects"
                    :key="textObject.idx">
                        <submission-text-object
                        v-if="textObject.page == (index + 1)"
                        :key="textObject.local_idx"
                        :prop-key="textObject.local_idx"
                        :object="textObject"
                        />
                    </div>

                    <div class="object-divider"
                    v-for="signObject in signObjects"
                    :key="signObject.idx">
                        <submission-sign-object
                        v-if="signObject.page == (index + 1)"
                        :key="signObject.local_idx"
                        :prop-key="signObject.local_idx"
                        :object="signObject"
                        />
                    </div>

                    <div class="object-divider"
                    v-for="checkboxObject in checkboxObjects"
                    :key="checkboxObject.idx">
                        <submission-checkbox-object
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
import CheckboxObject from '@/components/editor/CheckboxObject.vue';
import SubmissionSignObject from '@/components/submission/editor/SubmissionSignObject.vue';
import SubmissionTextObject from './SubmissionTextObject.vue';
import SubmissionCheckboxObject from './SubmissionCheckboxObject.vue';
export default {

    components: {
        pdf,
    },

    components: {
        pdf,
        SubmissionSignObject,
        CheckboxObject,
        SubmissionTextObject,
        SubmissionCheckboxObject
    },

    computed: {
        textObjects(){
            return this.$store.state.submission.text_objects;
        },

        checkboxObjects(){
            return this.$store.state.submission.checkbox_objects;
        },

        signObjects(){
            return this.$store.state.submission.sign_objects;
        },

        submission() {
            return this.$store.state.submission.submitted_project;
        }
    },

}
</script>

<style lang="scss" scoped>


.editor-pdf-viewer-wrapper{
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