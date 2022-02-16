<template>
    <div
    class="object-element"
    @click="onListEmClickHandler(object.local_idx, $event)"
    >
        <div
        class="object-element-pull-left">
            
        </div>
        <div
        class="object-element-center"
        >
            <input 
            v-if="isEditMode"
            type="text"
            class="object-input"
            :value="object.name"
            @input="onObjectNameChange"
            @keyup.enter="onEnterHandler"
            @blur="onBlurHandler"
            @click="onInputClickHandler"
            :id="`object_input_${object.local_idx}`"
            >
            <div
            v-else>
                {{object.name}}
            </div>
        </div>
        <div
        class="object-element-pull-right"
        >
            <img
            v-if="!isEditMode"
            @click="onEditClickHandler"
            src="@/images/edit.png" alt="">

            <img
            v-else
            @click="onCheckClickHandler"
            src="@/images/check.png" alt="">
        </div>
    </div>
</template>

<script>
export default {

    props: {
        object: Object,
    },

    data: () => {
        return {
            isEditMode: false,
            tempName: "",
        }
    },

    methods: {
        onListEmClickHandler(localIdx, event){
            const selectedDOM = document.getElementById(`object_${localIdx}`);
            selectedDOM.scrollIntoView({ behavior: 'smooth' });
            selectedDOM.style.outline = "4px"
            selectedDOM.style.outlineColor = "#58ACFA"
            selectedDOM.style.outlineStyle = "solid"
            setTimeout(() => {
                selectedDOM.style.outline = "none"
            }, 2000)
        },

        onEditClickHandler(e){
            e.stopPropagation();
            this.isEditMode = true;
            this.tempName = this.object.name;
            this.$nextTick(() => {
                const editbox = document.getElementById(`object_input_${this.object.local_idx}`);
                editbox.focus();
            })
        },
        onCheckClickHandler(e){
            e && e.stopPropagation();
            
            if(this.tempName.length < 3){
                alert("최소 3자 이상을 입력하세요")
                const editbox = document.getElementById(`object_input_${this.object.local_idx}`);
                editbox.focus();
                return;
            }

            this.object.name = this.tempName;
            switch(this.object.object_type){
                case "OBJECT_TYPE_TEXT":
                    this.$store.commit("UPDATE_TEXT_OBJECT", this.object)
                case "OBJECT_TYPE_CHECKBOX":
                    this.$store.commit("UPDATE_CHECKBOX_OBJECT", this.object)
                case "OBJECT_TYPE_SIGN":
                    this.$store.commit("UPDATE_SIGN_OBJECT", this.object)
            }
            this.isEditMode = false;
        },
        onEnterHandler(){
            this.onCheckClickHandler();
        },
        onBlurHandler(e){
            this.onCheckClickHandler();
        },
        onObjectNameChange(e){
            this.tempName = e.target.value;
        },
        onInputClickHandler(e){
            e && e.stopPropagation();
        }
    }

}
</script>

<style lang="scss" scoped>
 .object-element{
    display: flex;
    font-weight: 700;
    color: #5C5C5C;
    transition-duration: 0.2s;
    height: 40px;
    border-radius: 2px;
    cursor:pointer;

    .object-element-pull-left{
        width: 20px;
    }

    .object-element-center{
        width: 180px;
        font-size: 16px;
        line-height: 40px;
        .object-input{
            height: 31px;
            width: 180px;
            line-height: 31px;
            border: 1px solid #767676;
            border-radius: 2px;
            font-size: 16px;
            font-weight: 700;
            color: #5C5C5C;
            background-color: #F3F3F3;
            padding: 0 4px;
        }
    }

    .object-element-pull-right{
        width: 50px;
        text-align: center;
        img{
            position: relative;
            z-index: 100;

            visibility: hidden;
            padding: 5px;
            margin-top: 8px;
            border-radius: 5px;
            &:hover{
                background-color: rgb(211, 211, 211);
                outline: 1px solid #5C5C5C;
            }
        }
    }

    &:hover{
        transition-duration: 0.2s;
        background-color: #e8e8e8;

        img{
            visibility: visible;
        }
    }
}
</style>