<template>
    <div class="writer-pdf-viewer-wrapper">
        <div class="render-box"
        id="render-box"
        v-if="project.pdf != null"
        >
            <div class="pdf-layer"
            v-for="(width, index) in project.pdf.original_width"
            :key="index"
            >
                <pdf 
                :src="`https://sign.u-class.co.kr/api/projects/pdf/${project.pdf.name}`"
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
import CheckboxObject from './CheckboxObject.vue';
import SignObject from './SignObject.vue';
import TextObject from './TextObject.vue'

export default {

    data: () => {
        return{
            zoom: 100
        }
    },

    components: {
        pdf,
        TextObject,
        SignObject,
        CheckboxObject
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

        project() {
            return this.$store.state.submission.submitted_project;
        }
    },

    methods: {
        onZoomInClickHandler(){
            if(this.zoom < 150){
                this.zoom = this.zoom + 10;
                let renderBox = document.getElementById("render-box");
                renderBox.style.zoom = `${this.zoom}%`;
            }
        },
        onZoomOutClickHandler(){
            if(this.zoom > 50){
                this.zoom = this.zoom - 10;
                let renderBox = document.getElementById("render-box");
                renderBox.style.zoom = `${this.zoom}%`;
            }
        }
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
    position: relative;

    .render-box{
        width: 1050px;
        // height: calc(100% - 41px);
        margin: 41px auto 41px auto;

        background-color: #F3F3F3;
    }

    .pdf-layer{
        position: relative;
        margin-bottom: 40px;
        background-color: white;

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