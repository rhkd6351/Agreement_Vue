<template>
  <div class="sign-object-wrapper"
  :style="positionObject"
  @click="onSignDialogShowHandler(object)"
  >
      <div class="object-name">
        {{object.name}}
      </div>
      <div class="object-box"
      :id="'object_' + this.propKey"
      :style="shapeObject"
      >
        <img class="sign-object-default-image" v-bind:id="'sign-object-default-image'+object.local_idx">
        <img class="sign-image" v-bind:id="object.name">
      </div>
  </div>
</template>

<script>
import {objectMixin} from "@/mixins/objectMixin"
export default {

  mixins: [objectMixin],

  data: () => {
    return{
      showSign: false
    }
  },

  props: {
    object: Object,
    propKey: Number
  },

  methods: {
    onSignDialogShowHandler(object){
      this.$store.state.submission.sign_dialog_show = true;
      this.$store.commit("SET_SUBMISSION_SIGN_DIALOG_DATA", object)
    }
  },

  mounted(){
    this.shapeObject = {
      width: `${this.object.width}px`,
      height: `${this.object.height}px`,
    }
    this.positionObject = {
      top: `${this.object.y_position}px`,
      left: `${this.object.x_position}px`,
    };

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
  }
}
</script>

<style lang="scss" scoped>
.sign-object-wrapper{
  position: absolute;
  opacity: 0.999;
  top: 150px;
  left: 100px;

  .object-name{
    color: #5c5c5c;
    font-size: 12px;
    font-weight: bold;
  }

  .object-box{
    position: absolute;
    width: 100px;
    height: 100px;
    border: 1px solid #767676;
    overflow: hidden;
  }
  .sign-object-default-image{ 
    width: 100%;
    height: 100%;
    background-image: url("../../images/sign.png");
    background-repeat: no-repeat;
    background-position: center;
    background-color: #dadada41;
  }
}
</style>