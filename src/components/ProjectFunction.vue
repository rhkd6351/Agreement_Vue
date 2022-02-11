<template>
    <div class="project-function-wrapper"
    @click="functionHandler"
    >
        <div 
        v-if="status === 1"
        class="project-start-share project-function"
        >
            <span>공유 시작</span>
        </div>

        <div 
        v-else-if="status === 2"
        class="project-copy-link project-function">
            <img src="@/images/share.png" alt=""> &nbsp;
            <span>링크 공유</span>
        </div>
    </div>

</template>

<script>
export default {

    props: {
        state: Number,
        projectName: String,
    },

    data: () => {
        return {
            status: 1,
        }
    },

    methods: {
        functionHandler(){
            if(this.state == 1){
                this.$store.dispatch("changeState", {
                    projectName: this.projectName,
                    status: 2
                }).then((res) => {
                    this.$store.dispatch("fetchProjects", null);
                }).catch((err) => {
                    alert("알수없는 오류가 발생하였습니다.")
                });
            }else{

            }
        }
    },

    mounted(){
        this.status = this.state;
    }

}
</script>

<style lang="scss" scoped>

.project-function-wrapper{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.project-function{
    cursor: pointer;
    width: 80px;
    height: 27px;
    line-height: 29px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 15px;
    
    display: flex;
    align-items: center;
    justify-content: center;

}

.project-start-share{
    color: #9F9F9F;
    border: 1px solid #9F9F9F;
}

.project-copy-link{
    color: #5086EC;
    border: 1px solid #5086EC;
}


</style>