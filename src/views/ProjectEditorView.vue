<template>

    <div class="project-editor-wrapper">
        <editor-top-navigation/>
        <div class="editor-content-wrapper">
            <editor-left-navigation/>
            <editor-pdf-render/>
        </div>
    </div>
</template>

<script>
import EditorLeftNavigation from '../components/editor/EditorLeftNavigation.vue'
import EditorPdfRender from '../components/editor/EditorPdfRender.vue'
import EditorTopNavigation from '../components/editor/EditorTopNavigation.vue'
export default {
  components: { EditorTopNavigation, EditorLeftNavigation, EditorPdfRender },

}
</script>

<style lang="scss" scoped>

.project-editor-wrapper{
    min-height: calc(100vh - 84px);
    display: flex;  
    align-items: stretch;
    background-color: #F3F3F3;
}

</style>