<template>
  <div class="sign-object-wrapper"
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

  methods: {

  },

  mounted(){

    this.positionObject = {
      top: `${this.object.y_position}px`,
      left: `${this.object.x_position}px`,
    };

    this.shapeObject = {
      width: `${this.object.width}px`,
      height: `${this.object.height}px`,
      resize: `${this.isEditable ? 'both' : ''}`
    }

    let ResizeSensor = require('css-element-queries/src/ResizeSensor');
    const box = document.getElementById('object_' + this.propKey);
    new ResizeSensor(box, (e) => {
      this.shapeObject = {
        ...this.shapeObject,
        width: e.width,
        height: e.height
      }

      this.$store.commit("UPDATE_SIGN_OBJECT", {
        ...this.object,
        width: this.shapeObject.width,
        height: this.shapeObject.height
      })
    })
  },
  



}
</script>

<style lang="scss" scoped>
.sign-object-wrapper{
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

    min-height: 50px;
    min-width: 50px;
    max-height: 150px;
    max-width: 150px;

    background-color: #dadada41;
    border: 1px solid #767676;
    overflow: auto;
    background-image: url("../../images/sign.png");
    background-repeat: no-repeat;
    background-position: center;
    // border-radius: 1000px;
    // background-size: cover;
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