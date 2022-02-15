<template>
  <div class="submission-editor-left-navigation-wrapper">
      <div class="left-navigation-header">
          제출받은 항목
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
                  @click="onListEmClickHandler(textObject.local_idx, $event)"
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
                  @click="onListEmClickHandler(checkboxObject.local_idx, $event)"
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
                  @click="onListEmClickHandler(signObject.local_idx, $event)"
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
            return this.$store.state.submission.text_objects
        },
        checkboxObjects(){
            return this.$store.state.submission.checkbox_objects
        },
        signObjects(){
            return this.$store.state.submission.sign_objects
        }
    },

    methods: {
        onListEmClickHandler(localIdx, event){
            const selectedDOM = document.getElementById(`object_${localIdx}`);
            selectedDOM.scrollIntoView({ behavior: 'smooth' });
            selectedDOM.style.outline = "4px"
            selectedDOM.style.outlineColor = "#58ACFA"
            selectedDOM.style.outlineStyle = "solid"
            setTimeout(() => {
                selectedDOM.style.outline = "none"
            }, 2000)
        }
    }

}
</script>

<style lang="scss" scoped>
.submission-editor-left-navigation-wrapper{
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
                    transition-duration: 0.2s;
                    cursor:pointer;
                    &:hover{
                        transition-duration: 0.2s;
                        background-color: #e8e8e8;
                    }
                }
            }
        }
    }
}

</style>