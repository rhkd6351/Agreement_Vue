<template>
    <div class="submission-editor-wrapper">
        <submission-top-navigation/>
        <div class="submission-editor-content-wrapper">
            <submission-left-navigation/>
            <submission-pdf-viewer/>
        </div>
    </div>
</template>

<script>
import SubmissionLeftNavigation from '../components/submission/editor/SubmissionLeftNavigation.vue'
import SubmissionPdfViewer from '../components/submission/editor/SubmissionPdfViewer.vue'
import SubmissionTopNavigation from '../components/submission/editor/SubmissionTopNavigation.vue'
export default {
    components: { SubmissionTopNavigation, SubmissionLeftNavigation, SubmissionPdfViewer },

    mounted(){
        const submissionName = this.$router.currentRoute.value.fullPath.split("/")[2];
        this.$store.dispatch("fetchSubmission", submissionName);
    },

    unmounted() {
        this.$store.commit("INITIALIZE_SUBMISSION");
    },
}
</script>

<style lang="scss" scoped>
.submission-editor-wrapper{
    min-height: calc(100vh - 168px);
    background-color: #F3F3F3;
    min-width: 1140px;
    // cursor: url("/images/curosr.cur"), url("/image/text.png"), pointer;

    .submission-editor-content-wrapper{
        margin-top: 84px;
        min-height: calc(100vh - 168px);
        display: flex;  
    }
}
</style>