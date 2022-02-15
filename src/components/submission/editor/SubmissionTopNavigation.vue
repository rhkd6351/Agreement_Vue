<template>
  <div class="editor-top-navigation-wrapper">
      <div class="editor-nav-left"></div>
      <div class="editor-nav-center">
      </div>
      <div class="editor-nav-right">
          <div class="control-button-box">
              <div
              @click="onCloseHandler"
              class="close-button control-button">닫기</div>
              <div 
              @click="onDownloadHandler"
              class="complete-button control-button">다운로드</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

    methods: {
        onCloseHandler(){
            this.$router.push("/dashboard/submission")
        }
    }

}
</script>

<style lang="scss" scoped>
.editor-top-navigation-wrapper{
    z-index: 2;
    display: flex;
    height: 70px;
    width: 100%;
    min-width: 1080px;
    background-color: #FFFFFF;
    border: 1px solid #767676;
    padding: 7px;

    position: fixed;
    top: 84px;

    .editor-nav-left{
        width: 280px;
    }

    .editor-nav-center{
        min-width: 280px;
        flex-grow: 1;
        
    }

    .editor-nav-right{
        width: 280px;

        .control-button-box{
            display: flex;
            justify-content: center;
            .control-button {
                margin: 16px 23px;
                width: 74px;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                text-align: center;
                font-weight: 700;
                border-radius: 5px;
                cursor: pointer;
                transition-duration: 0.2s;
            }
            .close-button {
                color: #9F9F9F;

                &:hover{
                    transition-duration: 0.2s;
                    background-color: #cbcbcb;
                }
            }

            .complete-button{
                color: white;
                background-color: #9F9F9F;

                &:hover{
                    transition-duration: 0.2s;
                    background-color: #cbcbcb;
                }
            }
        }
    }
}
</style>