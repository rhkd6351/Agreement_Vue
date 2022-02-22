<template>
  <div class="text-object-wrapper"
  :style="positionObject"
  >
      <div class="object-name">
        ㅤ
      </div>
      <div
      class="object-box"
      v-bind:id="'object_' + this.propKey"
      :style="shapeObject"
      lang="ko"
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

  async mounted(){
    this.$nextTick();
    let textCssSet = document.getElementById('object_' + this.propKey);
    textCssSet.innerHTML = this.object.content;
    textCssSet.readOnly = true;
    
    this.positionObject = {
      top: `${this.object.y_position}px`,
      left: `${this.object.x_position}px`,
    };

    this.shapeObject = {
      width: `${this.object.width}px`,
      height: `${this.object.height}px`,
      border: 'none',
      outline: '0 solid transparent',
      resize: 'none',
      lineHeight: '20px'
    }
  },
  methods: {
    controlKeyDown(event){
      event.preventDefault();
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

  .object-name{
    color: #5c5c5c;
    font-size: 12px;
    font-weight: bold;
  }

  .object-box :read-only{
    position: absolute;
    font-size: 14px;
    width: 100%;
    height: 10px;
    line-height: 20px;
    text-align: left;
    outline: 0 solid transparent;
    word-break: break-all;
    // background-image: url('../../../images/underline.png');
  }

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}

</style>