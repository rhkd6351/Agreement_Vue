<template>
  <div class="editor-top-navigation-wrapper">
      <div class="editor-nav-left"></div>
      <div class="editor-nav-center">
      </div>
      <div class="editor-nav-right">
          <div class="control-button-box">
              <div
              @click="onCloseHandler"
              class="close-button control-button">닫기</div>
              <div 
              @click="onDownloadHandler"
              class="complete-button control-button">다운로드</div>
          </div>
      </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
    computed:{
        submitter(){
            return this.$store.state.submitter.submitter;
        },
        submissionTitle(){
            return this.$store.state.submission.submitted_project.pdf.original_name;
        },
    },
    methods: {
        onCloseHandler(){
            this.$router.push("/dashboard/submission")
        },
        getPaddingData(){
            let pageInfo = document.getElementsByClassName('annotationLayer');
            let renderBox = document.getElementById("render-box");
            let renderBox_style = window.getComputedStyle(renderBox, null);
            let computed_DefaultPage_Style = window.getComputedStyle(pageInfo[0], null);
            return (parseInt(renderBox_style.height, 10) - parseInt(computed_DefaultPage_Style.height, 10) * pageInfo.length) / (pageInfo.length - 1)
        },
        onDownloadHandler(){
            let renderBox = document.getElementById("render-box");
            let renderBox_style = window.getComputedStyle(renderBox, null);
            let pageInfo = document.getElementsByClassName('annotationLayer');
            let computed_DefaultPage_Style = window.getComputedStyle(pageInfo[0], null);
            let position = 0;
            let self = this;
            html2canvas(renderBox).then(function (canvas) {
                let doc = new jsPDF('p', 'px', [parseInt(computed_DefaultPage_Style.height, 10), parseInt(computed_DefaultPage_Style.width, 10)]);
                let imgData = canvas.toDataURL('image/png', 1.0);
                for (let i = 1; i <= pageInfo.length; i++) {
                let computed_Page_Style = window.getComputedStyle(pageInfo[i - 1], null);
                let pageHeight = parseInt(renderBox_style.height, 10); //전체 페이지 길이.
                let pageWidth = parseInt(computed_Page_Style.width, 10); //기본페이지값에서의 가로길이.
                if (i === 1) {
                    doc.addImage(imgData,'PNG', 0, position, pageWidth, pageHeight);
                } else {
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, pageWidth, pageHeight); // 세로가 긴 형태의 PDF라면;
                }
                position = position - parseInt(computed_DefaultPage_Style.height, 10) - self.getPaddingData();
                    //포지션값은 누적하여 저장.
                }
                const submissionTitle = self.submissionTitle.split('.')[0];
                const submitter = self.submitter;
                let file = URL.createObjectURL(new Blob([doc.output('blob')], {type: 'application/pdf'}));
                self.$store.commit("SET_SUBMITTER_WRITE_DATE");
                const date = submitter.date.toLocaleString();
                //.split("T");
                //const date = dateArr[0] + " " + dateArr[1];
                let fileName = `${submissionTitle}_${submitter.student_name}_${submitter.student_id}_ ${date}.pdf`
                let download_a = document.createElement("a");
                download_a.href = file;
                download_a.download = fileName; //한글 분해현상 방지.
                document.body.appendChild(download_a);
                download_a.click();
                download_a.remove();
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.editor-top-navigation-wrapper{
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

    .editor-nav-left{
        width: 280px;
    }

    .editor-nav-center{
        min-width: 280px;
        flex-grow: 1;
        
    }

    .editor-nav-right{
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