<template>
  <div class="text-object-wrapper"
  :style="positionObject"
  >
      <div class="object-name">
        {{object.name}}
      </div>
      <div class="object-box"
      :id="'object_' + this.propKey"
      :style="shapeObject"
      >
        <span
          class="long-text-area"
          v-bind:id="'long-text-area '+object.local_idx"
          contenteditable="true"
          lang="ko"
          @keydown="limitText"></span>
        <div 
        v-bind:id="'long-text-area-control '+object.local_idx"
        @click="focusText" 
        :style="textPoint"></div>
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

  data(){
    return {
      textPoint: {
        position: 'absolute',
        width: `${this.object.width}px`,
        height: `${this.object.height}px`,
      }
    }
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

      this.$store.commit("UPDATE_TEXT_OBJECT", {
        ...this.object, width: this.shapeObject.width, height: this.shapeObject.height
      })
    })
  },
  methods: {
    limitText(event) {
      let longTextArea = document.getElementById('object_' + this.propKey);
      let longTextAreaHeight = window.getComputedStyle(longTextArea);
      this.object.content = event.target.innerHTML;
      console.log(event.target.innerHTML);
      event = event || window.event;
      let tBox = document.getElementById('long-text-area ' + this.object.local_idx);
      let tBoxHeight = tBox.scrollHeight;
      this.textPoint = {
        ...this.textPoint,
        height: `${this.object.height - tBoxHeight}px`
      }
      let self = this;
      if(parseInt(longTextAreaHeight.height, 10) < tBoxHeight && event.keyCode != 8){
        if (event.keyCode === 13) { //Enter key's keycode
          event.preventDefault();
        }
      }
      let incrementEveryOneSecond = setInterval(function(){
        let tBox = document.getElementById('long-text-area ' + self.object.local_idx);
        let tBoxHeight = tBox.scrollHeight;
        if(parseInt(longTextAreaHeight.height, 10) < tBoxHeight && event.keyCode != 8){
          if (event.keyCode === 13) { //Enter key's keycode
            event.preventDefault();
          }
          else{
            const ele = event.target;
            ele.innerText = ele.innerText.slice(0, ele.innerText.length - 2);
            self.object.content = ele.innerHTML;
            const newRange = document.createRange();
            newRange.setStart(tBox.childNodes[tBox.childNodes.length - 1], tBox.childNodes[tBox.childNodes.length - 1].length);
            newRange.setEnd(tBox.childNodes[tBox.childNodes.length - 1], tBox.childNodes[tBox.childNodes.length - 1].length);
            const selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }
        if(parseInt(longTextAreaHeight.height, 10) >= tBoxHeight) 
          clearInterval(incrementEveryOneSecond);
      }, 10); 
    },
    focusText(){
      let tBox = document.getElementById('long-text-area ' + this.object.local_idx);
      const newRange = document.createRange();
      if(tBox.childNodes[0] === undefined){
        newRange.setStart(tBox, 0);
        newRange.setEnd(tBox, 0);
      }
      else{
        newRange.setStart(tBox.childNodes[tBox.childNodes.length - 1], tBox.childNodes[tBox.childNodes.length - 1].length);
        newRange.setEnd(tBox.childNodes[tBox.childNodes.length - 1], tBox.childNodes[tBox.childNodes.length - 1].length);
      }
      const selection = document.getSelection();
      selection.removeAllRanges();
      selection.addRange(newRange);
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
  cursor:text;

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
    background-image: url('../../images/underline.png');
  }
  .long-text-area{
    -ms-ime-mode: active;
    ime-mode: active;
    display: inline-block;
    width: 100%;
    height: 10px;
    line-height: 20px;
    text-align: left;
    outline: 0 solid transparent;
  }
}

</style>