<template>
  <div class="etc-menu-wrapper">
      <div class="menu-element delete"
      @click="onDeleteHandler"
      >삭제</div>
      <div class="menu-element delete"
      @click="onDuplicateHandler"
      >복사</div>
      
      <div class="menu-element suspend"
      v-if="state == 2"
      @click="shareHandler"
      >공유 중단</div>

      <div 
      @click="shareHandler"
      class="menu-element delete"
      v-if="state == 3"
      >다시 공유</div>
  </div>
</template>

<script>
export default {

    props: {
        state: Number,
        name: String,
    },

    methods: {
        shareHandler(){
            if(this.state == 2)this.$store.dispatch("changeState", {
                    status: 3,
                    projectName: this.name,
                }).then((res) => {
                    this.$store.dispatch("fetchProjects", null);
                }).catch((err) => {
                    alert("알수없는 오류가 발생하였습니다.");
                });
            else {
                this.$store.dispatch("changeState", {
                    status: 2,
                    projectName: this.name,
                }).then((res) => {
                    this.$store.dispatch("fetchProjects", null);
                }).catch((err) => {
                    alert("알수없는 오류가 발생하였습니다.");
                });
            }
        },

        onDeleteHandler() {
            const response = confirm("정말 삭제하시겠습니까? 삭제시 복구가 불가능합니다.");
            if(response){
                this.$store.dispatch("changeState", {
                    projectName: this.name,
                    status: -1
                }).then((res) => {
                    this.$store.dispatch("fetchProjects", null);
                }).catch((err) => {
                    alert("알수없는 오류가 발생하였습니다.")
                });
            }
        },

        onDuplicateHandler(){
            this.$store.dispatch("copyProject", this.name
            ).then((res) => {
                this.$store.dispatch("fetchProjects", null);
            }).catch((err) => {
                alert("알수없는 오류가 발생하였습니다.")
            });
        }
    },

}
</script>

<style lang="scss" scoped>
.etc-menu-wrapper{
    position: relative;
    width: 84px;
    text-align: center;
    font-size: 16px;
    border: 2px solid #767676;
    left: 25px;
    top: -30px;
    background-color: white;
    .menu-element{
        height: 27px;
        border-bottom: 1px solid #767676;
        line-height: 29px;
        &:last-child{
            border-bottom: none;
        }
        &:hover{
            background-color: rgb(205, 205, 205);;
        }
    }
}
</style>