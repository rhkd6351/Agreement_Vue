<template>
  <div class="buttonbox">
    <div class="buttonstyle" style="color: white; background-color: #5C5C5C;" @click="closeBtn()">
      <h3>닫기</h3>
    </div>
    <div style="background-color: white;" class="buttonstyle" @click="saveDocumentBtn()">
      <h3>다운로드</h3>
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
    originalWidth(){
      return this.$store.state.submission.submitted_project.pdf.original_width;
    }
  },
  methods: {
    closeBtn(){},
    //페이지간에 간격값을 구해내서 해당 값만큼 pdf를 찍어낼때 제외하고 계산하도록.
    getPaddingData(){
      let pageInfo = document.getElementsByClassName('annotationLayer');
      let renderBox = document.getElementById("render-box");
      let renderBox_style = window.getComputedStyle(renderBox, null);
      let computed_DefaultPage_Style = window.getComputedStyle(pageInfo[0], null);
      return (parseInt(renderBox_style.height, 10) - parseInt(computed_DefaultPage_Style.height, 10) * pageInfo.length) / (pageInfo.length - 1)
    },
    saveDocumentBtn() {
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
        //const dateArr = submitter.Date.split("T");
        //const date = dateArr[0] + " " + dateArr[1];
        const date = "";
        console.log(submitter);
        let fileName = `${submissionTitle}_${submitter.name}_${submitter.school_id}_${date}.pdf`
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
  .buttonbox{
    display: flex;
    align-items: center;
  }
  .buttonstyle{
    width: 100px;
    height: 70%;
    font-size: 20px;
    font-weight: 900;
    display: flex;
    align-items: center;
    border-radius: 8px;
    box-shadow: none;
    cursor: pointer;    
    h3{
      width: 100%;
      text-align: center;
    }
    &:hover{
        transition-duration: 0.2s;
        // background-color: #d5d5d5;
        box-shadow:inset 3px 3px 3px 3px #000000;
    }
    &:active{
        transition-duration: 0.1s;
        // background-color: #d5d5d5;
        box-shadow:inset 5px 5px 5px 5px #000000;
    }
  }
</style>