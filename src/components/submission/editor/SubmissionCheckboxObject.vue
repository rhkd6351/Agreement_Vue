<template>
  <div class="checkbox-object-wrapper"
  :style="positionObject"
  >
      <div class="object-name">
        ㅤ
      </div>
      <div class="object-box"
      :id="'object_' + this.propKey"
      :style="shapeObject"
      ></div>
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
      backgroundImage: `url(${this.object.checked ? require('@/images/checkbox.png') : require('@/images/checkbox_false.png')})`,
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

  .object-name{
    color: #5c5c5c;
    font-size: 12px;
    font-weight: bold;
  }

  .object-box{
    position: absolute;
    width: 100px;
    height: 100px;
    
    background-repeat: no-repeat;
    background-position: center;
  }

  -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none
}

</style>