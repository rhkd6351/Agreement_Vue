<template>
  <div class="list-em-wrapper">
      <div class="list-em" 
      :style="toggleOn ? {border: '2px solid gray'} : {border: '1px solid #DADADA'}">
          <div 
          @click="toggle"
          class="list-em-title"></div>
          <div class="list-em-count"></div>
          <div class="list-em-date">-</div>
          <div class="list-em-name">-</div>
          <div class="list-em-download">-</div>
          <div class="list-em-etc">
            <arrow-button
            :toggle="toggleOn"
            @click="toggle"
            />
          </div>
      </div>

      <submission/>
      <div class="division-line"></div>
  </div>
</template>

<script>
import ArrowButton from './ArrowButton.vue'
import Submission from './Submission.vue'
export default {
  components: { Submission, ArrowButton },

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
        cursor: pointer;
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