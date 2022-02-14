<template>
  <div class="editor-left-navigation-wrapper">

      <div class="left-navigation-header">
          제출받을 항목
      </div>
      <div class="left-navigation-content">
          <div class="object-list-box">
              <div class="object-header">
                  <img src="@/images/text.png" alt="">
                  <span>({{textObjects.length}})</span>
              </div>
              <div class="object-element">
                  <li
                  v-for="textObject in textObjects"
                  :key="textObject.local_idx"
                  >{{textObject.name}}</li>
              </div>
          </div>

          <div class="object-list-box">
              <div class="object-header">
                  <img src="@/images/checkbox.png" alt="">
                  <span>({{checkboxObjects.length}})</span>
              </div>
              <div class="object-element">
                  <li
                  v-for="checkboxObject in checkboxObjects"
                  :key="checkboxObject.local_idx"
                  >{{checkboxObject.name}}</li>
              </div>
          </div>

          <div class="object-list-box">
              <div class="object-header">
                  <img src="@/images/sign.png" alt="">
                  <span>({{signObjects.length}})</span>
              </div>
              <div class="object-element">
                  <li
                  v-for="signObject in signObjects"
                  :key="signObject.local_idx"
                  >{{signObject.name}}</li>
              </div>
          </div>
      </div>

  </div>
</template>

<script>
export default {

    computed: {
        textObjects(){
            return this.$store.state.editor.text_objects
        },
        checkboxObjects(){
            return this.$store.state.editor.checkbox_objects
        },
        signObjects(){
            return this.$store.state.editor.sign_objects
        }
    }

}
</script>

<style lang="scss" scoped>



.editor-left-navigation-wrapper{
    width: 280px;
    min-height: calc(100% - 168px);
    border-right: 1px solid #767676;

    .left-navigation-header{
        height: 88px;
        font-size: 18px;
        color: white;
        font-weight: 700;
        background-color: #767676;
        text-align: center;
        line-height: 88px;
    }

    .left-navigation-content{
        min-height: calc(100% - 88px);
        background-color: white;

        .object-list-box{

            width: 250px;
            height: 150px;
            margin: 0 auto;
            padding: 15px 0;
            
            .object-header{
                span{
                    float: right;
                    margin-right: 180px;
                    margin-top: 5px;
                }
            }

            .object-element{
                height: 150px;
                overflow: auto;
                
                li{
                    font-weight: 700;
                    color: #5C5C5C;
                    margin-left: 20px;
                    padding: 10px 5px;
                }
            }
        }
    }
}

</style>