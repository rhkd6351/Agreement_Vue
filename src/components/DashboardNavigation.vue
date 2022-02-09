<template>
  <div class="dashboard-navigation-wrapper">
      <div class="navigation-em-userInfo">{{this.$store.state.user.user.name}}</div>
      <div 
      class="navigation-em-route"
      :class="{'selected': currentMode === 'project'}"
      @click="onEmClickHandler('project')">
      내 문서 리스트</div>

      <div 
      class="navigation-em-route"
      :class="{'selected': currentMode === 'submission'}"
      @click="onEmClickHandler('submission')">
      제출받은 문서 리스트</div>

  </div>
</template>

<script>
export default {

    data: () => {
        return {
            currentMode: "project"
        }
    },

    methods: {
        onEmClickHandler(ref) {
            this.$router.push(`/dashboard/${ref}`);
            this.currentMode = ref;
        }
    },

    mounted() {
        const path = this.$router.currentRoute.value.path;
        this.currentMode = path.split("/")[2];
        
    }
}
</script>

<style lang="scss" scoped>
.dashboard-navigation-wrapper{
    width: 280px;
    
    

    border-right: 1px solid #767676;

    .navigation-em-userInfo{
        width: 280px;
        height: 160px;
        border-bottom: 1px solid #767676;
        line-height: 160px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        color: #5C5C5C;
        margin-bottom: 30px;
    }

    .navigation-em-route{
        width: 100%;
        height: 47px;
        font-size: 16px;
        font-weight: 700;
        line-height: 47px;
        text-align: center;
        margin-bottom: 4px;
        cursor: pointer;

        background-color: #F3F3F3;
        color:#767676
    }

    .selected{
        background-color: #9F9F9F;
        color: #F3F3F3;
    }
}
</style>