<template>
  <div class="editor-top-navigation-wrapper">
      <div class="editor-nav-left"></div>
      <div class="editor-nav-center">
          <div class="object-box">
              <div class="object text-object"
              @click="onObjectAddHandler('text')"
              >
                  <img 
                  class="object-img"
                  src="@/images/text.png" alt="">
                  <p>텍스트</p>
              </div>
              <div class="object checkbox-object"
              @click="onObjectAddHandler('checkbox')"
              >
                  <img
                  class="object-img"
                  src="@/images/checkbox.png" alt="">
                  <p>체크박스</p>
              </div>
              <div class="object sign-object"
              @click="onObjectAddHandler('sign')"
              >
                  <img 
                  class="object-img"
                  src="@/images/sign.png" alt="">
                  <p>서명</p>
              </div>
          </div>
      </div>
      <div class="editor-nav-right">
          <div class="control-button-box">
              <div
              @click="onCloseHandler"
              class="close-button control-button">닫기</div>
              <div 
              @click="onSaveHandler"
              class="complete-button control-button">완료</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

    methods: {
        onObjectAddHandler(mode){
            this.$store.commit("SET_ADD_MODE", mode);
        },

        onSaveHandler(){
            this.$store.dispatch("saveData").then((res) => {
                this.$router.push("/dashboard/project")
            }).catch((err) => {
                alert("저장에 실패하였습니다.")
            })
        },

        onCloseHandler(){
            this.$router.push("/dashboard/project")
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

        .object-box{
            display: flex;
            justify-content: space-evenly;
            width: 380px;
            margin: 0 auto;

            .object{
                width: 70px;
                text-align: center;
                color: #5C5C5C;
                border-radius: 10px;
                padding-bottom: 5px;
                cursor: pointer;
                .object-img{
                    display: block;
                    margin: 10px auto 10px auto;
                }

                transition-duration: 0.2s;
                &:hover{
                    transition-duration: 0.2s;
                    // background-color: #d5d5d5;
                    box-shadow:inset 1px 1px 1px 1px #5C5C5C;
                }
                &:active{
                    transition-duration: 0.1s;
                    // background-color: #d5d5d5;
                    box-shadow:inset 5px 5px 5px 5px #5C5C5C;
                }
            }
        }
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