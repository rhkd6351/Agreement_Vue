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
    computed: {
        submitter(){
            return this.$store.state.submitter.submitter;
        }
    },
    components: { WriteOverPdfViewer },
    mounted(){
        if(this.submitter.student_name.length === 0){
            const projectName = this.$router.currentRoute.value.fullPath.split("/")[3];
            this.$router.push("/writer/submission/" + projectName + "/login");
        }
        let self = this;
        window.addEventListener('popstate', function(event) {
            self.$store.commit("INITIALIZE_SUBMITTER");
            self.$store.commit("INITIALIZE_SUBMISSION");
            const projectName = self.$router.currentRoute.value.fullPath.split("/")[3];
            self.$router.push("/writer/submission/" + projectName + "/login");
        }, false);
    },
    
    unmounted() {
        this.$store.commit("INITIALIZE_SUBMITTER");
        this.$store.commit("INITIALIZE_SUBMISSION");
    }
}
</script>
<style lang="scss" scoped>
.submission-over-wrapper{
    min-height: calc(100vh - 84px);
    background-color: #F3F3F3;
    min-width: 1140px;

    .submission-over-content-wrapper{
        min-height: calc(100vh - 84px);
        display: flex;  
    }
}
</style>