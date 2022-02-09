<template>
      <div id="top-nav">
        <div class="top-nav-left">서비스 로고</div>
        <div class="top-nav-center"></div>
        <div 
        v-if="isLoggedIn" class="top-nav-right">로그아웃</div>
        <div v-else class="top-nav-right"></div>
      </div>
</template>

<script>
export default {

    data: () => {
        return {
            isLoggedIn: false,
        }
    },

    mounted() {
        if(this.$router.currentRoute._value.fullPath == "/login")
            this.isLoggedIn = false;
        else{
            this.isLoggedIn = true;
        }
    }
}
</script>

<style lang="scss" scoped>

#top-nav {
    display: flex;
    justify-content: space-between;
    z-index: 999;

    text-align: center;
    height: 84px;
    line-height: 84px;

    position: sticky;
    top: 0px;
    background-color: #5C5C5C;

    min-width: 1140px;
    
    .top-nav-left{
    width: 280px;
    font-size: 32px;
    color: white;
    font-weight: 700;
    }

    .top-nav-center{
    width: 280px;
    flex-grow: 1; 
    }

    .top-nav-right{
    width: 140px;
    color: white;
    font-size: 18px;
    }
}

</style>