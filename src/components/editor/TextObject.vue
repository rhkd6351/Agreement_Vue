<template>
  <div class="text-object-wrapper"
  :style="positionObject"
  :draggable="isEditable"
  @dragstart="onDragStartHandler"
  @dragend="onDragEndHandler"
  @mouseenter="onMouseEnterHandler"
  @mouseleave="onMouseLeaveHandler"
  >
      <div class="object-name">
        {{object.name}}
      </div>
      <div class="object-box"
      :id="'object_' + this.propKey"
      @click="onTextMouseUpHandler"
      :style="shapeObject"
      >
      </div>
      <div class="button-wrapper"
      v-if="isEditable"
      :style="{
        left: `${object.width - 15}px`,
        }">
          <img
          v-if="isXButtonActivated"
          @click="xButtonClickHandler(object, $event)"
          class="x-button" src="@/images/xButton.png" alt="">
      </div>
  </div>
</template>

<script>
import {objectMixin} from "@/mixins/objectMixin"
export default {


  mixins: [objectMixin],

  props: {
    object: Object,
    propKey: Number,
    isEditable: Boolean
  },

  mounted(){

    let ResizeSensor = require('css-element-queries/src/ResizeSensor');
    const box = document.getElementById('object_' + this.propKey);
    new ResizeSensor(box, (e) => {
      
      this.shapeObject = {
        ...this.shapeObject,
        width: e.width - 2,
        height: e.height - 2
      }

      this.$store.commit("UPDATE_TEXT_OBJECT", {
        ...this.object,
        width: this.shapeObject.width,
        height: this.shapeObject.height
      })
    })
    
    this.positionObject = {
      top: `${this.object.y_position}px`,
      left: `${this.object.x_position}px`,
    };

    this.shapeObject = {
      width: `${this.object.width}px`,
      height: `${this.object.height}px`,
      resize: `${this.isEditable ? 'both' : ''}`
    }
  }

  

}
</script>

<style lang="scss" scoped>

.text-object-wrapper{
  position: absolute;
  opacity: 0.999;
  top: 150px;
  left: 100px;
  cursor: pointer;
  pointer-events: auto;
  font-size: 14px;

  .object-name{
    color: #5c5c5c;
    font-size: 12px;
    font-weight: bold;
  }

  .object-box{
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #DADADA;
    border: 1px solid #767676;
    min-height: 20px;
    // resize: both;
    overflow: hidden;
    background-image: url('../../images/underline.png');
    z-index: 99999;
    font-size: 14px;
  }
  .button-wrapper{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .x-button{
    position:absolute;
    top: calc(50% - 20px);
    left: calc(50% + 0px);
    width: 20px;
    height: 20px;
  }
}

</style>