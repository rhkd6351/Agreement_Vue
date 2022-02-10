<template>
  <div class="list-em-wrapper">
      <div class="list-em" 
      :style="isSubmissionListUnclosed ? {border: '2px solid gray'} : {border: '1px solid #DADADA'}"
      @click="toggleArrow">
          <div 
          class="list-em-title">{{project.title}}</div>
          <div class="list-em-count">{{project.submittee_count}}</div>
          <div class="list-em-date">-</div>
          <div class="list-em-name">-</div>
          <div class="list-em-download">-</div>
          <div class="list-em-etc">
            <arrow-button
            :toggle="isSubmissionListUnclosed"
            />
          </div>
      </div>

    
      <div class="submission-wrappe"
      v-if="isSubmissionListUnclosed">
        <submission
        v-for="submission in submissions"
        :key="submission.idx"
        :submission="submission"
        :project="{
            title: project.title
            }" 
        />
      </div>
      <div class="division-line"></div>
  </div>
</template>

<script>
import ArrowButton from './ArrowButton.vue'
import Submission from './Submission.vue'
import { getSubmissions } from '@/api/submissionAPI'
export default {
    components: { Submission, ArrowButton },

    data: () => {
        return {
            isSubmissionListUnclosed: false,
            submissions: [],
        }
    },
    props: {
        project: {
            submittee_count: String,
            title: String,
            name: String
        },
    },

    methods: {
        toggleArrow(){
            this.isSubmissionListUnclosed = !this.isSubmissionListUnclosed;
            if(this.isSubmissionListUnclosed){
                this.getSubmission();
            }
        },

        getSubmission(){
            getSubmissions(this.project.name).then((res) => {
                this.submissions = res.data.submittees;
            }).catch((err) => {
                // alert("알수없는 오류가 발생하였습니다.");
            })
        }

    }
}
</script>

<style lang="scss" scoped>
.list-em{
    text-align: center;
    display: flex;
    font-size: 15px;
    color: #5C5C5C;
    justify-content: space-between;
    height: 43px;
    line-height: 43px;
    border: 1px solid #DADADA;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;

    &:hover{
        background-color: #eeeeee;
    }

    &-title{
        padding: 0 10px;
        width: 200px;
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &-count{
        min-width: 80px;
    }
    &-date{
        min-width: 200px;
    }
    &-name{
        min-width: 120px;
    }
    &-download{
        min-width: 120px;
    }
    &-etc{
        min-width: 80px;
    }
}

.division-line{
    margin-top: 10px;
    border-bottom: 1px solid #f3f3f3;
}

</style>