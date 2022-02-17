<template>
    <div class="project-em"
      :class="{'state-delete': state === -1}"
      >
        <div class="project-em-state">
            <project-state
            :state="state"
            />
        </div>
        <div class="project-em-title"
        @click="goProjectEditorView"
        >
            {{title}}
        </div>
        <div class="project-em-submissions">
            {{submissions}}
        </div>
        <div class="project-em-sharing">
            <project-function
            :project-name="name"
            :state="state"
            />
        </div>
        <div class="project-em-etc"
        @click="menuToggle"
        >
            <svg width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1" cy="1" r="1" fill="#5C5C5C"/>
                <circle cx="1" cy="5" r="1" fill="#5C5C5C"/>
                <circle cx="1" cy="9" r="1" fill="#5C5C5C"/>
            </svg>
            <project-etc-menu 
            v-if="isMenuOn"
            :state="state"
            :name="name"
            />
        </div>
    </div>
  
</template>

<script>
import ProjectEtcMenu from './ProjectEtcMenu.vue';
import ProjectFunction from './ProjectFunction.vue';
import ProjectState from './ProjectState.vue';
export default {
  components: { ProjectState, ProjectFunction, ProjectEtcMenu },

    data: () => {
        return {
            isMenuOn: false,
        }
    },

    props: {
        project: Object,
    },

    setup(props){
        const title = props.project.title;
        const submissions = props.project.submittee_count;
        const state = props.project.state;
        const name = props.project.name;

        return {
            title,
            submissions,
            state,
            name
        }
    },

    methods: {
        menuToggle() {
            if(this.state != -1)
                this.isMenuOn = !this.isMenuOn;
        },

        goProjectEditorView(){
            if(this.state != -1)
                this.$router.push(`/project/${this.name}`);
        }
    }
    

}
</script>

<style lang="scss" scoped>
.project-em {
    display: flex;
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    justify-content: space-between;
    height: 60px;
    line-height: 44px;
    border-bottom: 1px solid #DADADA;

    color: #5C5C5C;

    &:hover{
        background-color: #f0f0f0;
    }
    &-state {
        min-width: 84px;
    }
    &-title {
        flex-grow: 1;
        min-width: 200px;
        white-space: nowrap;
        line-height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    &-submissions {
        width: 60px;
        line-height: 60px;
    }
    &-sharing {
        width: 120px;
    }
    &-etc {
        width: 43px;
        margin-top: 10px;
        cursor: pointer;
    }
}
.state-delete{
    background-color: #b8b8b8;
    cursor: not-allowed;
    .project-em-title{
        cursor: not-allowed;
    }
    .project-em-etc{
        cursor: not-allowed;
    }
    &:hover{
        background-color: #b8b8b8;
    }

}
</style>