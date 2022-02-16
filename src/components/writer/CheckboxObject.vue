<template>
  <div class="checkbox-object-wrapper"
  :style="positionObject"
  >
      <div class="object-name">
        {{object.name}}
      </div>
      <div class="object-box"
      :id="'object_' + this.propKey"
      :style="shapeObject"
      >
        <input class="checkbox" type="checkbox" v-model="object.checked"/>
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

  .object-name{
    color: #5c5c5c;
    font-size: 12px;
    font-weight: bold;
  }

  .object-box{
    position: absolute;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: #DADADA;
    border: 1px solid #767676;
    background-repeat: no-repeat;
  }

  .checkbox{
    margin-top: 15%;
    width: 70%;
    height: 70%;
  }
}

</style>