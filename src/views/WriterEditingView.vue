<template>

    <div class="project-writer-wrapper"
    :style="cursorStyle"
    >
        <writer-top-navigation
        />
        <div class="writer-content-wrapper">
            <writer-left-navigation/>
            <writer-pdf-viewer/>
        </div>
        <sign-dialog v-if="signDialogShow"/>
    </div>
</template>

<script>
import WriterLeftNavigation from '@/components/writer/WriterLeftNavigation.vue'
import WriterTopNavigation from '@/components/writer/WriterTopNavigation.vue'
import WriterPdfViewer from '@/components/writer/WriterPdfViewer.vue'
import SignDialog from '@/components/writer/SignDialog.vue'
export default {
    components: { WriterTopNavigation, WriterLeftNavigation, WriterPdfViewer, SignDialog },

    data: () => {
        return { 
            cursorStyle: {},
            imageStyle: {}
        }
    },

    computed: {
        signDialogShow(){
            return this.$store.state.submission.sign_dialog_show
        },
        submitter(){
            return this.$store.state.submitter.submitter;
        }
    },
    methods: {
      cursorImageHandler(addMode) {
          let url = "";
          switch(addMode){
            case "text":
                url = require('@/images/text.png');
                this.cursorStyle = {
                    cursor: `url(${url}), auto`
                }
                break;
            case "checkbox":
                url = require('@/images/checkbox.png');
                this.cursorStyle = {
                    cursor: `url(${url}), auto`
                }
                break;
            case "sign":
                url = require('@/images/sign.png');
                this.cursorStyle = {
                    cursor: `url(${url}), auto`
                }
                console.log(this.cursorStyle);
                break;     
            }
        },
        onMouseMoveHandler(e){
            let x =  e.clientX;
            let y =  e.clientY;
            this.imageStyle = {
                top: `${y}px`,
                left: `${x}px`
            }
        }   
    },
    async mounted() {
        if(this.submitter.student_name.length === 0){
            const projectName = this.$router.currentRoute.value.fullPath.split("/")[3];
            this.$router.push("/writer/submission/" + projectName + "/login");
        }
        await this.$nextTick();
        const projectName = this.$router.currentRoute.value.fullPath.split("/")[3];
        this.$store.dispatch("fetchSubmitterProject", projectName);
    }
}
</script>

<style lang="scss" scoped>

.project-writer-wrapper{
    min-height: calc(100vh - 168px);
    background-color: #F3F3F3;
    min-width: 1140px;
    // cursor: url("/images/curosr.cur"), url("/image/text.png"), pointer;

    .writer-content-wrapper{
        margin-top: 84px;
        min-height: calc(100vh - 168px);
        display: flex;  
    }

    .add-object-image{
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 2;
        position: absolute;
    }
}

</style>