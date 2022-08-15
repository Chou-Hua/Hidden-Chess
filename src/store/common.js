import { defineStore } from "pinia";
export const useCommonStore = defineStore("common", {
    state: ()=>({
        isShowNeedToRotatePage:true       
    }),
    actions:{
        actionsIsShowNeedToRotatePage(bool){            
            this.isShowNeedToRotatePage = bool;
        }
    }
})