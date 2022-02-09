<template>
    <div class="project-function-wrapper">
        <div 
        v-if="state === 1"
        class="project-start-share project-function">
            <span>공유 시작</span>
        </div>

        <div 
        v-else-if="state === 2"
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
        name: String,
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