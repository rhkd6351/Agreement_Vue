<template>
    <div class="submission-over-wrapper">
        <div class="submission-over-content-wrapper">
            <write-over-pdf-viewer/>
        </div>
    </div>
</template>
<script>
import WriteOverPdfViewer from '../components/writer/WriteOverPdfViewer.vue'
export default {
  components: { WriteOverPdfViewer },
  /*
  mounted(){
    const submissionName = this.$router.currentRoute.value.fullPath.split("/")[3];
    this.$store.dispatch("fetchSubmission", submissionName);
  },
  */
}
</script>
<style lang="scss" scoped>
.submission-over-wrapper{
    background-color: #F3F3F3;
    min-width: 1140px;
    // cursor: url("/images/curosr.cur"), url("/image/text.png"), pointer;

    .submission-over-content-wrapper{
        margin-top: 84px;
        display: flex;  
    }
}
</style>