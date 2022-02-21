<template >
    <div class="login-wrapper">
        <div class="login-center">
            <div v-if="state == 0" class="login-stop-row">
                <h3>공유되지 않은 문서입니다.</h3>
            </div>
            <div v-else class="login-box">
                <input class="login-input-text" placeholder="학번" type="text" v-model="submitter.student_id"/>
                <input
                    class="login-input-password"
                    placeholder="학생이름"
                    v-model="submitter.student_name"
                    type="text"
                    @keyup.enter="goWritingPage"/>
                <div class="login-error">
                    {{this.message}}
                </div>
                <button @click="goWritingPage" class="login-button-submit">작성시작</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getSubmitteeProject} from '../api/projectAPI'
    export default {
        computed: {
            submitter() {
                return this.$store.state.submitter.submitter;
            }
        },
        mounted(){
            getSubmitteeProject(this.$route.params.submissionName)
                .then(function (response) {
                    console.log(response.data);
                    this.state = response.data.state;
                    this.$store.commit("SET_DOCUMENT_TITLE", response.data.title);
                })
                .catch(function (error) {
                    console.log(error);
                    this.state = 0;
                }
            );
        },
        data() {
            return {validationErrors: [], message: "", submissionName: this.$route.params.submissionName, state: 1};
        },
        methods: {
            goWritingPage() {
                //정규식으로 유효성 검사 실시.
                if (/^[0-9_-]{1,10}$/.test(this.submitter.student_id) && typeof(this.submitter.student_name) === 'string') {
                    if (this.submitter.student_id.length <= 8 && this.submitter.student_name.length <= 4) {
                        if(this.submitter.student_name.length <= 1){
                            this.message = "이름이 너무 짧습니다. 다시 입력해주세요."
                        }
                        else{
                            this
                                .$router
                                .push({
                                    path: "/writer/submission/" + this.submissionName + "/edit",
                                    query: {}
                                }
                            );
                        }
                    } else {
                        this.message = "학번 또는 이름이 너무 깁니다. 다시 작성해주세요."
                    }
                } else {
                    this.message = "학번에는 숫자만 이름에는 문자만 작성해주세요."
                }
            },
            backStartPage() {
                self.close();
            }
        }
    };
</script>
<style lang="scss" scoped>
.login-wrapper{
    background-color: #F3F3F3;
    height: calc(100vh - 84px);
    min-height: 500px;
    .login-center{
        position: absolute;
        top: calc(50% - 195px);
        left: calc(50% - 151px);
        .login-title{
            font-size: 32px;
            color: #5C5C5C;
            font-weight: bold;
            width: 303px;
            height: 84px;
            line-height: 84px;
            text-align: center;
        }
    
        .login-box{
            background-color: white;
            width: 303px;
            height: 238px;
            margin-top: 67px;
            border-radius: 15px;
            border: 1px solid transparent;
            input{
                display: block;
                width: 233px;
                height: 30px;
                padding: 10px 15px;
                font-size: 16px;
                color: black;
                border: 1px solid #9F9F9F;
                margin: 0 auto;
            }
            .login-input-text{
                margin-top: 20px;
            }
            .login-input-password{
                margin-top: 10px;
            }
            .login-error{
                color: #FF0000;
                font-size: 12px;
                width: 255px;
                margin: 10px auto;
                text-align: center;
            }
            .login-button-submit{
                display: block;
                width: 263px;
                height: 50px;
                font-size: 16px;
                margin: 0 auto;
                background-color: #DADADA;
                color: #FFFFFF;
                text-align: center;
                border: none;
                cursor: pointer;
                transition-duration: 0.2s;
                &:hover{
                    background-color: #9F9F9F;
                    transition-duration: 0.2s;
                }
            }
        }
    }
  .login-stop-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: absolute;
        width: 303px;
        height: 240px;
        left: calc(50% - 150px);
        top: calc(50% - 120px);
        color: rgb(113, 113, 113);
  }
}
</style>>
