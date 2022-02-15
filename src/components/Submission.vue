<template>
    <div class="submission-em">
        <div class="submission-em-title">{{project.title}}</div>
        <div class="submission-em-count">-</div>
        <div class="submission-em-date">{{regDate}}</div>
        <div class="submission-em-name">{{submission.student_name}}</div>
        <div class="submission-em-download"
        @click="downloadPdf"
        >다운로드</div>
        <div class="submission-em-etc"
            @click="goSubmissionEditingView" >
        문서보기
        </div>
    </div>
</template>

<script>
export default {

    props: {
        submission: Object,
        project: Object,
    },

    methods: {
        goSubmissionEditingView(){
            this.$router.push(`/submission/${this.submission.name}`)
        }
    },

    setup(props) {

        const dateArr = props.submission.reg_date.split("T")
        const regDate = `${dateArr[0]} ${dateArr[1]}`

        return {
            regDate
        }

    }

}
</script>

<style lang="scss" scoped>

.submission-em{
    display: flex;
    font-size: 15px;
    text-align: center;
    color: #5C5C5C;
    background-color: #F3F3F3;
    justify-content: space-between;
    height: 43px;
    line-height: 43px;
    border: 1px solid #DADADA;
    border-radius: 5px;
    margin-top: 1px;

    &:hover{
        background-color: #f0f0f0;
    }

    &-title{
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
        &:hover{
            cursor: pointer;
        }
    }
    &-etc{
        min-width: 80px;
        &:hover{
            cursor: pointer;
        }
    }
}

</style>