<template>
  <div class="project-state"
  :class="{
      'state-idle': state === 1,
      'state-share': state === 2,
      'state-suspend': state === 3,
      'state-deleted': state === -1,}">
      <span>{{stateText}}</span>
  </div>
</template>

<script>
export default {
    props: {
        state: Number,
    },

    setup(props) {
        let stateText = ""
        switch(props.state){
            case 1: 
                stateText = "대기";
                break;
            case 2: 
                stateText = "공유";
                break;
            case 3: 
                stateText = "중단";
                break;
            case -1: 
                stateText = "삭제";
                break;
        }

        return {
            stateText
        }

    },
}
</script>

<style lang="scss" scoped>

.project-state{
    width: 60px;
    height: 24px;
    line-height: 26px;
    border-radius: 15px;
    margin: 18px auto 0 auto;
    font-size: 12px;
    font-weight: 700;
}

.state-idle{
    border: 1px solid #ADADAD;
    color: #ADADAD;
    background-color: white;
}

.state-share{
    border: 1px solid transparent;
    color: white;
    background-color: #74DF7F;
}

.state-suspend{
    border: 1px solid transparent;
    color: white;
    background-color: #FF6363;
}
.state-deleted{
    border: 1px solid transparent;
    color: white;
    background-color: #000000;
}

</style>