<template>
  <div class="container-message" id="messageCompBox">
    <!-- 有内容 start -->
     <template v-if="message.length > 0">
        <div class="box-item" v-for="(item,index) in message" :key="`message_${index}`">
            <div :class="['message-item',item.role==='assistant' ? 'message-item-assistant' : 'message-item-user']"
            v-if="item.role === 'assistant' || item.content">
            <!-- 显示头像 start -->
             <el-avator class="message-item-avator" v-if="item.role==='assistant'">
                <img src="../images/ai.png">
             </el-avator>
             <div v-else></div>
             <!-- 显示头像 end -->
              <!-- 显示对话框内容 start-->
              <div :class="['message-item-content',item.role==='assistant' ? 'message-item-content-left' : 'message-item-content-right']">
                <div class="message-item-text">
                    <Markdown v-loading :source="item.content|| '思考中...'"/>
                </div>
              </div>
              <!-- 显示对话框内容 end -->

              <!-- 显示用户的头像 start-->
              <el-avator class="message-item-avator" v-if="item.role!=='assistant'">
                <img src="../images/user.png">
             </el-avator>
             <div v-else></div>
              <!-- 显示用户的头像end -->
            </div>
        </div>
     </template>
    <!-- 有内容 end -->
    <!-- 无内容 start -->
     <template v-else>
        <div class="empty-box" >
        <el-empty description="暂无对话消息"></el-empty>
     </div>
     </template>
    <!-- 无内容 end -->
  </div>
</template>

<script setup lang="ts">
import Markdown from 'vue3-markdown-it'
import { nextTick } from 'vue'

//接受父组件传递过来的数据
const props = defineProps({
    message: {
        type: Array,
        default: () => []
    }
})

//滚动到底部的函数
const scrollToBottom = async() => {
    nextTick(() => {
        //获取ID“messageCompBox”的元素
        const messageCompBoxDiv = document.getElementById('messageCompBox')
        if(messageCompBoxDiv) {
            // 设置元素滚动到底部
            messageCompBoxDiv.scrollTop = messageCompBoxDiv.scrollHeight;
        }
    })
}
</script>

<style lang="scss" scoped>
.container-message{
    width: 100%;
    height: 100%;
    overflow:auto;
}
.empty-box{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box-item{
    margin-bottom: 12px;
}

.message-item{
    display: gird;
    column-gap: 8px;
}

.message-item-assistant{
    grid-template-columns: 40px auto 40px;
    justify-items: center;
}

.message-item-user{
    grid-template-columns: 0% auto 40px;
    justify-items: end;
}

.message-item-avatar{
    width: 36px;
    height: 40px;
    background-color: #121212;
    border: 2px solid #e99d53;
    padding: 4px;
}

.message-item-content{
    background-color: #2f2f2f;
    position: relative;
    border-radius: 8px;
}

.message-item-content-left::before,
.message-item-content-right::before{
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border: 5px solid transparent;
}

.message-item-content-left::before{
    border-right-color: #2f2f2f;
    left: -9px;
}

.message-item-content-right::before {
    border-left-color: #2f2f2f;
    right: -9px;
}

.message-item-text{
    padding: 0rem 12px;
    color: #fff;
    position: relative;
    font-size: 0.875erm;
    line-height: 1.4;
}

:deep(p){
    margin: 0.5rem 0;
}
:deeo(pre){
    margin: 0.5rem 0;
    font-size: 0.8125rem;
    max-width: 100%;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}
:deep(code){
    font-size: 0.8125rem;
    max-width: 100%;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>
