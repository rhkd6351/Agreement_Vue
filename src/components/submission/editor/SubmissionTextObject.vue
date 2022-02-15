<template>
  <div class="text-object-wrapper"
  :style="positionObject"
  >
      <div class="object-name">
        ㅤ
      </div>
      <div class="object-box"
      :id="'object_' + this.propKey"
      :style="shapeObject"
      >
      {{object.content}}
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

.text-object-wrapper{
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
    font-size: 14px;
    overflow: hidden;
    // background-image: url('../../../images/underline.png');
  }

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}

</style>