<!--
 * @Author: hyman
 * @Date: 2023-06-16 19:13:22
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-16 19:46:58
 * @Description: 请填写简介
-->


<script setup lang="ts">
import status from '@Components/global/status.vue'

</script>

<template>
    <div class="container">
        <status style="width:100%;height: 4%;"/>
        <div class="user-main">
            <div class="user-img"></div>
            <div class="username">啊哈哈哈</div>
            <div class="user-follow">
                <div>关注 123</div>
                <div class="gap"></div>
                <div>粉丝 321</div>
            </div>

            <div class="options">
                <ul class="module-select">
                    <li class="texts on">我喜欢</li>
                    <li class="texts">关注</li>
                    <li class="texts">粉丝</li>
                </ul>
            </div>

            <div class="select-show">

            </div>

        </div>
        

    </div>
    
</template>

<style scoped lang="less">
@import url('@CSS/global.less');

.container{
    width: 100%;
    height: 100%;
    .user-main{
        height: 35%;
        width: 100%;
        border: 1px solid black;
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        background-image: url(https://y.qq.com/ryqq/static/media/bg_profile.bd497b5a.jpg?max_age=2592000);
        background-size: cover;
        color: white;

        .user-img{
            width: 130px;
            height: 130px;
            min-width: 130px;
            min-height: 130px;
            border-radius: 50%;
            border: 2px solid white;
            background-image: url('@Pictures/info-pic.png');
            background-size: cover;
        }

        .user-follow{
            display: flex;
            flex-direction: row;
            gap: 20px;
            font-size: 22px;
            align-items: center;

            .gap{
                width: 2px;
                height: 70%;
                border: 1px solid white;
            }
        }

        .options{
            .module-select{
                display: flex;
                flex-direction: row;
                gap: 30px;

                .texts{
                    font-size: 20px;
                    cursor: pointer;

                    &:hover{
                        color: @color-text-green;
                    }

                    &.on{
                        color: @color-text-green;
                    }

                }

            }
        }
    }



}

</style>