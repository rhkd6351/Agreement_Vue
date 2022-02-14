<template>

    <div class="project-editor-wrapper"
    :style="cursorStyle"
    @mousemove="onMouseMoveHandler"
    >
        <editor-top-navigation/>
        <div class="editor-content-wrapper">
            <editor-left-navigation/>
            <editor-pdf-viewer/>
        </div>

        <div>
            <img 
            class="add-object-image"
            :style="imageStyle"
            v-if="addMode == 'checkbox'"
            src="@/images/checkbox.png" alt="">
            <img 
            class="add-object-image"
            :style="imageStyle"
            v-if="addMode == 'text'"
            src="@/images/text.png" alt="">
            <img 
            class="add-object-image"
            :style="imageStyle"
            v-if="addMode == 'sign'"
            src="@/images/sign.png" alt="">
        </div>
    </div>
</template>

<script>
import EditorLeftNavigation from '@/components/editor/EditorLeftNavigation.vue'
import EditorTopNavigation from '@/components/editor/EditorTopNavigation.vue'
import EditorPdfViewer from '../components/editor/EditorPdfViewer.vue'
export default {
  components: { EditorTopNavigation, EditorLeftNavigation, EditorPdfViewer },

  data: () => {
      return {
          cursorStyle: {},
          imageStyle: {},
      }
  },

  computed: {
      addMode() {
        let addMode = this.$store.state.editor.add_mode;
        return addMode; 
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

  mounted(){
    const projectName = this.$router.currentRoute.value.fullPath.split("/")[2];
    this.$store.dispatch("fetchProject", projectName);
  },

  unmounted() {
    this.$store.commit("INITIALIZE_OBJECTS");
  },
}
</script>

<style lang="scss" scoped>

.project-editor-wrapper{
    min-height: calc(100vh - 168px);
    background-color: #F3F3F3;
    min-width: 1140px;
    // cursor: url("/images/curosr.cur"), url("/image/text.png"), pointer;

    .editor-content-wrapper{
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