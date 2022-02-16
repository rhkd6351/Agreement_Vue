<template>
  <div class="sign-object-wrapper"
  :style="positionObject"
  >
      <div class="object-name">
        {{object.name}}
      </div>
      <div class="object-box"
      :id="'object_' + this.propKey"
      :style="shapeObject"
      >
      </div>
  </div>
</template>

<script>
import {objectMixin} from "@/mixins/objectMixin"
export default {

  mixins: [objectMixin],

  props: {
    object: Object,
    propKey: Number
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
    }

    let ResizeSensor = require('css-element-queries/src/ResizeSensor');
    const box = document.getElementById('object_' + this.propKey);
    new ResizeSensor(box, (e) => {
      this.shapeObject = {
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

  .object-name{
    color: #5c5c5c;
    font-size: 12px;
    font-weight: bold;
  }

  .object-box{
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #dadada41;
    border: 1px solid #767676;
    resize: both;
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