<template>
  <div class="checkbox-object-wrapper"
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
      @change="onResizeHandler"
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
          @click="xButtonClickHandler(object)"
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

    this.positionObject = {
      top: `${this.object.y_position}px`,
      left: `${this.object.x_position}px`,
    };

    this.shapeObject = {
      width: `${this.object.width}px`,
      height: `${this.object.height}px`,
    }
  }
}
</script>

<style lang="scss" scoped>

.checkbox-object-wrapper{
  position: absolute;
  opacity: 0.999;
  top: 150px;
  left: 100px;
  cursor: pointer;
  pointer-events: auto;

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
    background-image: url("../../images/checkbox.png");
    background-repeat: no-repeat;
    background-position: center;
  }
  .button-wrapper{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0px;
    right: 0px;
    .x-button{
      position:absolute;
      top: calc(50% - 20px);
      left: calc(50% + 0px);
      z-index: 100;
      width: 20px;
      height: 20px;
      }
  }
}

</style>