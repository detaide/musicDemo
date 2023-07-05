<!--
 * @Author: hyman
 * @Date: 2023-06-15 22:06:26
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-16 10:25:19
 * @Description: 请填写简介
-->


<script setup lang="ts">
import { reactive } from "vue"
import { api } from '@/api'
import { ElMessage } from 'element-plus'
import {useServerStore} from '@/store'
import {useRouter} from 'vue-router'


const serverStore = useServerStore()
const router = useRouter()

const userdata = reactive({
    username: 'user',
    password:'user'
})

const Login = async () => {
    if(!userdata.username || !userdata.password){
        ElMessage({
            message : '信息为空',
            type : 'warning'
        })
        return;
    }

    const ret = await api.login(userdata.username, userdata.password)
    
    if(!ret){
        ElMessage({
            message : '账号或密码错误',
            type : 'error'
        })
        return ;
    }

    serverStore.setLogin(true, userdata.username)
    await serverStore.setServerStore()
    api.loginTime(userdata.username)

    router.push({name : 'search'})

}

const Register = async () =>{
    if(!userdata.username || !userdata.password){
        ElMessage({
            message : '信息为空',
            type : 'warning'
        })
        userdata.username = ''
        userdata.password = ''
        return;
    }

    const ret = await api.register(userdata)
    
    ret ? ElMessage({
        message : '注册成功',
        type : 'success'
    }) : 
    ElMessage({
        message : '已被注册',
        type : 'warning'
    })

    
}



</script>

<template>
    <div class="backgnd">
        <h1>Login</h1>
        <input type="text" placeholder="Username" v-model="userdata.username">
        <i></i>
        <input type="password" placeholder="Password" v-model="userdata.password" >
        <i></i>
        <div class="check">
            <button @click="Login">登录</button>
            <button @click="Register">注册</button>
        </div>
        
    </div>
  
</template>

<style scoped lang="less">
@import url('@CSS/login.css');

</style>