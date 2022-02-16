<template>
      <div id="top-nav">
        <div class="top-nav-left">서비스 로고</div>
        <div class="top-nav-center">
            <input 
            v-if="projectTitle"
            class="project-title-input"
            type="text"
            :value="projectTitle"
            @input="onProjectTitleChange"
            />
            <div
            v-else>
                {{submissionTitle}}
            </div>
            </div>
        <div 
        v-if="this.$router.currentRoute.value.fullPath != '/login'"
        @click="getLogout"
        class="top-nav-right">로그아웃</div>
        <div v-else class="top-nav-right"></div>
      </div>
</template>

<script>
import { removeToken } from "@/utils/auth"
export default {

    methods: {
        getLogout(){
            removeToken();
            this.$router.push("/login");
        },

        onProjectTitleChange(e){
            this.$store.commit("UPDATE_PROJECT_TITLE", e.target.value);
        }
    },

    computed: {
        projectTitle(){
            return this.$store.state.editor.editing_project.title
        },

        submissionTitle(){
            if(this.$store.state.submission.submitted_project.pdf){
                return this.$store.state.submission.submitted_project.pdf.original_name
            }else return undefined;
        }
    },
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
        font-size: 24px;
        color: white;
        font-weight: 700;
    }

    .top-nav-right{
        width: 140px;
        color: white;
        font-size: 18px;
        cursor: pointer;    
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
    .project-title-input{
        width: 100%;
        height: 64px;
        background-color:#00000000;
        text-align: center;
        color: white;
        font-size: 24px;
        border:none;
        font-weight: 700;
        &:focus{
            outline: none;
        }
    }
}

</style>