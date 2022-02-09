<template>
  <div class="login-wrapper">
      
      <div class="login-center">
        <div class="login-title">
            서비스명
        </div>

        <div class="login-box">
            <form
            @submit="onLoginHandler">
                <input v-model="id" class="login-input-text" type="text" placeholder="ID" />
                <input v-model="password" class="login-input-password" type="password" placeholder="비밀번호" />
                <div class="login-error">
                    {{error}}
                </div>
                <button class="login-button-submit">
                    로그인
                </button>
            </form>
        </div>
      </div>
  </div>
</template>

<script>
import {getAutenticate} from "@/api/userApi";
import { setToken } from "@/utils/auth"

export default {

    data: () => {
      return {
          id: "",
          password: "",
          error: "ㅤ"
      }  
    },

    methods: {
        onLoginHandler(e){
            e.preventDefault();
            if(this.checkUserDataValid(this.id, this.password)){
                getAutenticate(this.id, this.password).then((response) => {
                    setToken(response.data.jwt);
                    this.$router.push("/dashboard/project")
                }).catch((error) => {
                    this.error = "아이디 혹은 비밀번호가 일치하지 않습니다.";
                })
            }
        },

        checkUserDataValid(id, password){
            return true;
        }
    },

}
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
}

</style>>

