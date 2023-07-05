import { defineStore } from "pinia";
import { type mvState, defaultParam } from "./mvState";
import { api } from "@/api";

export const useMvStore = defineStore('mv-store',{
    state : () : mvState=> defaultParam(),

    actions: {
        getMvDataById(id : number){

        }
    }
})