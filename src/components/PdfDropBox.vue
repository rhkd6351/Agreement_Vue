<template>
    <div class="pdf-drop-box">
        <div class="drop-box-content">
            <div class="content-pull-left">
                <div class="upload-image">
                    <img src="@/images/cloud_up.png" alt="">
                </div>

                <div class="guide-text">
                    <span>서명 받을 문서를 끌어오거나<br/>오른쪽의 버튼을 눌러 업로드 해주세요.</span>
                </div>
            </div>

            <div class="content-pull-right">
                <button class="get-file-button">
                    문서 가져오기
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.pdf-drop-box{
    width: calc(100% - 80px);
    min-width: 720px;
    margin: 64px auto 35px auto;
    height: 184px;
    background-color: white;
    border-radius: 50px;
    border: 2px dashed #767676;
    
    .drop-box-content{
        display: flex;
        justify-content: space-evenly;

        width: 100%;
        min-width: 720px;
        height: 104px;
        padding: 40px 0 40px 0;

        .content-pull-left{
            display: flex;
            justify-content: space-between;
            min-width: 544px;

            .guide-text{
                min-width: 420px;
                text-align: center;
                flex-grow: 1;
                color: #767676;
                font-size: 24px;
                line-height: 52px;
                font-weight: 700;
            }
        }

        .content-pull-right{
            width: 173px;
            height: 104px;
            line-height: 104px;

            .get-file-button{
                width: 153px;
                height: 68px;
                border: 2px solid #939393;
                border-radius: 24px;
                cursor: pointer;
            }
        }
    }
}

</style>