<template>
    <div class="project-list-wrapper">
        <div class="list-header">
            <div class="list-header-status">
                공유 상태
            </div>
            <div class="list-header-title">
                문서 제목
            </div>
            <div class="list-header-submittees">
                제출 수
            </div>
            <div class="list-header-sharing"></div>
            <div class="list-header-etc"></div>
        </div>

        <project-element 
        v-for="project in this.$store.state.project.projects"
        :key="project.idx"
        :project="project"
        />

        <div class="button-wrapper">
            <button 
            @click="setPage(isNext = false)"
            class="page-button">이전</button> 
            <button 
            @click="setPage(isNext = true)"
            class="page-button">다음</button>
        </div>
  </div>
</template>

<script>
import ProjectElement from './ProjectElement.vue';

export default {
  components: { ProjectElement },

    methods: {
        setProjects(currentPage){
            this.$store.dispatch("fetchProjects", currentPage);
        },

        setPage(isNext){
            if(isNext){
                if(this.$store.state.project.current_page < this.$store.state.project.total_page){
                    this.setProjects(this.$store.state.project.current_page + 1);
                }
            }else{
                if(this.$store.state.project.current_page > 0){
                    this.setProjects(this.$store.state.project.current_page - 1);
                }
            }
        }
    },

    mounted() {
        this.setProjects(0);
    }

}
</script>

<style lang="scss" scoped>
.project-list-wrapper{
    width: calc(100% - 140px);
    background-color: white;
    margin: 0 auto;
    padding: 22px 30px 50px 30px;
}
.list-header{
    display: flex;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    line-height: 43px;
    color: #5C5C5C;
    justify-content: space-between;
    height: 43px;
    border-bottom: 2px solid #767676;

    &-status {
        min-width: 84px;
    }
    &-title {
        min-width: 200px;
        flex-grow: 1;
    }
    &-submittees {
        min-width: 60px;
    }
    &-sharing {
        min-width: 120px;
    }
    &-etc {
        min-width: 43px;
    }
}

.button-wrapper{
    height: 60px;

    .page-button{
        margin: 5px 5px 0 0;
        float: left;
        width: 50px;
        height: 50px;
        line-height: 50px;
        background-color: #c2c2c2;
        font-weight: bold;
        color: white;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        &:hover{
            background-color: #838383;
        }
    }   
}
</style>

