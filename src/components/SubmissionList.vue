<template>
    <div class="submission-list-wrapper">
        <div class="list-header">
            <div class="list-header-title">
                문서 제목
            </div>
            <div class="list-header-count">
                제출 수
            </div>
            <div class="list-header-date">
                제출 일시
            </div>
            <div class="list-header-name">
                제출자
            </div>
            <div class="list-header-download">
                다운로드
            </div>
            <div class="list-header-etc">
            </div>      
        </div>

        <submission-project-element />

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
import SubmissionProjectElement from './SubmissionProjectElement.vue'
export default {
  components: { SubmissionProjectElement },

}
</script>

<style lang="scss" scoped>
.submission-list-wrapper{
    width: calc(100% - 80px);
    margin: 45px auto;
    padding: 22px 30px 50px 30px;
    background-color: white;
}

.list-header{
    display: flex;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    color: #5C5C5C;
    justify-content: space-between;
    height: 43px;
    line-height: 43px;
    border-bottom: 2px solid #767676;

    &-title{
        min-width: 200px;
        flex-grow: 1;
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