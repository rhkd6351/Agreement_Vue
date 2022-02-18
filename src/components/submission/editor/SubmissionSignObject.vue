<template>
  <div class="sign-object-wrapper"
  :style="positionObject"
  >
      <div class="object-name">
        ㅤ
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

  mounted(){

    this.positionObject = {
      top: `${this.object.y_position}px`,
      left: `${this.object.x_position}px`,
    };
    if(this.$router.currentRoute.value.fullPath.split("/")[4] === "over"){
      let url = this.$store.state.submission.sign_url_save_file.find(e => e.signObjectName === this.object.name).url;
      console.log(url);
      this.shapeObject = {
        width: `${this.object.width}px`,
        height: `${this.object.height}px`,
        backgroundImage: `url(${url})`
      }
    }
    else{
      this.shapeObject = {
        width: `${this.object.width}px`,
        height: `${this.object.height}px`,
      }
    }
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
    overflow: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

-webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}
</style>