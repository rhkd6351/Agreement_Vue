<template>
    <div class="pdf-drop-box"
    @dragenter="onFileDragEnterHandler"
    @dragleave="onFileDragLeaveHandler"
    @dragover.prevent
    @drop="onFileDropHandler"
    :class="{'drag-enter': isDragEnter > 0}"
    >
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
                <button class="get-file-button"
                @click="onGetFileButtonClick">
                    문서 가져오기
                </button>
                <input
                @change="onFileChangeHandler"
                type="file" id="pdf-file" hidden/>
            </div>
        </div>
    </div>
</template>

<script>
import { postProject } from '@/api/projectAPI'
export default {

    data: () => {
        return {
            isDragEnter: 0,
        }
    },

    methods: {
        postPdf(file){
            postProject(file).then((res) => {
                this.$store.dispatch("fetchProjects", 0);
            }).catch((err) => {
                alert("파일 업로드에 실패하였습니다.");
            })
        },

        onFileChangeHandler(event){
            const file = event.target.files[0];
            if(file.type !=="application/pdf"){
                alert("pdf 파일만 등록 가능합니다.")
                return;
            }
            this.postPdf(file);
        },

        onGetFileButtonClick(event){
            let fileInput = document.getElementById("pdf-file");
            fileInput.click();
        },

        onFileDragEnterHandler(event){
            event.preventDefault();
            this.isDragEnter += 1;
        },

        onFileDragLeaveHandler(event){
            event.preventDefault();
            this.isDragEnter -= 1;
        },

        onFileDropHandler(event){
            event.preventDefault();
            this.isDragEnter = 0;
            if(event.dataTransfer.items.length > 1){
                alert("1개의 파일만 등록이 가능합니다.")
                return;
            }

            const file = event.dataTransfer.items[0].getAsFile();
            if(file.type !=="application/pdf"){
                alert("pdf 파일만 등록 가능합니다.")
                return;
            }

            this.postPdf(file);

        }

    }

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

.drag-enter{
    background-color: rgb(208, 208, 208);
}

</style>