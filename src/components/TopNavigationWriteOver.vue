<template>
  <div class="buttonbox">
    <div class="buttonstyle" style="color: white; background-color: #5C5C5C;" @click="closeBtn()">
      <h3>닫기</h3>
    </div>
    <div style="background-color: white;" class="buttonstyle" @click="saveDocumentBtn()">
      <h3>다운로드</h3>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    closeBtn(){},
    saveDocumentBtn(){}
  }
}
</script>
<style lang="scss" scoped>
  .buttonbox{
    display: flex;
    align-items: center;
  }
  .buttonstyle{
    width: 100px;
    height: 70%;
    font-size: 20px;
    font-weight: 900;
    display: flex;
    align-items: center;
    border-radius: 8px;
    box-shadow: none;
    cursor: pointer;    
    h3{
      width: 100%;
      text-align: center;
    }
    &:hover{
        transition-duration: 0.2s;
        // background-color: #d5d5d5;
        box-shadow:inset 3px 3px 3px 3px #000000;
    }
    &:active{
        transition-duration: 0.1s;
        // background-color: #d5d5d5;
        box-shadow:inset 5px 5px 5px 5px #000000;
    }
  }
</style>