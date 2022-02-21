<template>
  <div class="writer-top-navigation-wrapper">
      <div class="writer-nav-left"></div>
      <div class="writer-nav-center">
      </div>
      <div class="writer-nav-right">
          <div class="control-button-box">
              <div
              @click="onCloseHandler"
              class="close-button control-button">닫기</div>
              <div 
              @click="onSaveHandler"
              class="complete-button control-button">제출</div>
          </div>
      </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
    props: {
        submissionName: String
    },
    computed: {
        submitter(){
            return this.$store.state.submitter.submitter;
        }
    },
    methods: {
        onObjectAddHandler(mode){
            this.$store.commit("SET_ADD_MODE", mode);
        },
        setPDF() {
            let doc = new jsPDF('p', 'px', [300, 300]);
            html2canvas(document.getElementsByClassName("pdf-layer")[0]).then(function (canvas) {
                let imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 0, 300, 300, 300);
            })
            return doc;
        },
        onSaveHandler(){
            const dataURLtoFile = (dataurl, fileName) => {
                let arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], fileName, {type: mime});
            }
            let files = [];
            let filesName = [];
            let signIMGArr = document.getElementsByClassName("sign-image");
            for (let signIMG of signIMGArr) {
                if (signIMG.src.length >= 2) {
                    files.push(dataURLtoFile(signIMG.src));
                    this.$store.commit("SAVE_SUBMISSION_SIGN_URL_DATA", {signObjectName: signIMG.getAttribute("id"), url: signIMG.src});
                }
                filesName.push(signIMG.getAttribute("id"));
            }
            //서명입력이 제대로 됐는지 확인한다.
            if (filesName.length === files.length) {
                const projectName = this.$router.currentRoute.value.fullPath.split("/")[3];
                let pdfData = this.setPDF();
                this.$store.dispatch("saveSubmitteData", {submitter: this.submitter, files: files, filesName: filesName, pdfData: pdfData}).then((res) => {
                    this.$store.commit("SET_SUBMITTER_WRITE_DATE");
                    this.$router.push("/writer/submission/" + projectName + "/over")
                }).catch((err) => {
                    alert("저장에 실패하였습니다.");
                })
            } else{
                alert("서명을 다 작성해주셔야 합니다!");
            }
        },

        onCloseHandler(){
            this.$router.push("/dashboard/project")
        }
    }

}
</script>

<style lang="scss" scoped>
.writer-top-navigation-wrapper{
    z-index: 2;
    display: flex;
    height: 70px;
    width: 100%;
    min-width: 1080px;
    background-color: #FFFFFF;
    border: 1px solid #767676;
    padding: 7px;

    position: fixed;
    top: 84px;

    .writer-nav-left{
        width: 280px;
    }

    .writer-nav-center{
        min-width: 280px;
        flex-grow: 1;
    }

    .writer-nav-right{
        width: 280px;

        .control-button-box{
            display: flex;
            justify-content: center;
            .control-button {
                margin: 16px 23px;
                width: 74px;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                text-align: center;
                font-weight: 700;
                border-radius: 5px;
                cursor: pointer;
                transition-duration: 0.2s;
            }
            .close-button {
                color: #9F9F9F;

                &:hover{
                    transition-duration: 0.2s;
                    background-color: #cbcbcb;
                }
            }

            .complete-button{
                color: white;
                background-color: #9F9F9F;

                &:hover{
                    transition-duration: 0.2s;
                    background-color: #cbcbcb;
                }
            }
        }
    }
}
</style>