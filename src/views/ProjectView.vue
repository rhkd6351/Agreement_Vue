<template>
  <div class="project-view-wrapper">
      <pdf-drop-box/>
      <project-list/>
  </div>
</template>

<script>
import PdfDropBox from '../components/PdfDropBox.vue'
import ProjectList from '../components/ProjectList.vue'
export default {
  components: { PdfDropBox, ProjectList },

}
</script>

<style scoped>
.project-view-wrapper{
    flex-grow: 1;
    background-color: #F3F3F3;
    min-width: 860px;
    background-color: #F3F3F3;
}
</style>