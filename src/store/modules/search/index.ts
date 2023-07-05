import { defineStore } from "pinia";
import { defaultParam } from "./search";

export const useSearch = defineStore('searchStore',{
    state: () => defaultParam()
})