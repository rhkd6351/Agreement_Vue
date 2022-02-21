<template>
    <div class="editor-pdf-viewer-wrapper">
        <div class="render-box"
        v-if="submission.pdf != null"
        id="render-box"
        >
            <div class="pdf-layer"
            v-for="(width, index) in submission.pdf.original_width"
            :key="index"
            >
                <pdf
                :src="`https://sign.u-class.co.kr/api/projects/pdf/${submission.pdf.name}`"
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
        <div class="view-control">
            <div 
            @click="onZoomOutClickHandler"
            class="view-control-button">
                <img src="@/images/minus.png" alt="">
            </div>
            <div
            @click="onZoomInClickHandler"
            class="view-control-button">
                <img src="@/images/plus.png" alt="">
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


    data: () => {
        return {
            zoom: 100,
        }
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

    methods: {
        onZoomInClickHandler(){
            if(this.zoom < 150){
                this.zoom += 10;
                let renderBox = document.getElementById("render-box");
                renderBox.style.zoom = `${this.zoom}%`;
            }
        },
        onZoomOutClickHandler(){
            if(this.zoom > 50){
                this.zoom -= 10;
                let renderBox = document.getElementById("render-box");
                renderBox.style.zoom = `${this.zoom}%`;
            }
        },
    }

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
        width: 1050px;
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

     .view-control{
        position: fixed;
        top: 185px;
        right: 30px;
        display: flex;
        width: 88px;
        border: 1px solid #767676;
        border-radius: 5px;
        background-color: white;
        .view-control-button{
            width: 44px;
            height: 44px;
            margin: auto;
            text-align: center;
            line-height: 44px;
            cursor: pointer;
            &:first-child{
                    border-right: 1px solid #767676;
            }
            &:hover{
                background-color: #d7d7d7;
            }
            img{
                vertical-align:middle;
                line-height: 100%;
            }
        }

        -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none
    }
}

</style>