<template>
    <div class="submission-view-wrapper">
        <submission-list/>
    </div>
</template>

<script>
import SubmissionList from '../components/SubmissionList.vue'
export default {
  components: { SubmissionList },

}
</script>

<style scoped>
.submission-view-wrapper{
    flex-grow: 1;
    background-color: #F3F3F3;
}
</style>