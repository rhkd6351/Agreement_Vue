<template>
    <div class="project-em">
        <div class="project-em-state">
            <project-state
            :state="state"
            />
        </div>
        <div class="project-em-title">
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
        <div class="project-em-etc">
            <svg width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1" cy="1" r="1" fill="#5C5C5C"/>
                <circle cx="1" cy="5" r="1" fill="#5C5C5C"/>
                <circle cx="1" cy="9" r="1" fill="#5C5C5C"/>
            </svg>
        </div>
    </div>
  
</template>

<script>
import ProjectFunction from './ProjectFunction.vue';
import ProjectState from './ProjectState.vue';
export default {
  components: { ProjectState, ProjectFunction },

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
        min-width: 60px;
        line-height: 60px;
    }
    &-sharing {
        min-width: 120px;
    }
    &-etc {
        min-width: 43px;
        margin-top: 10px;
        cursor: pointer;
    }
}
</style>