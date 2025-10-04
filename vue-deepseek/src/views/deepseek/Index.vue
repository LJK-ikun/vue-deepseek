<template>
    <div class="inner-html-comtainer">
        <div class="page">
            <!-- 提示内容 start -->
             <div class="tips">
                <div class="title">Vue3 + Deepseek 实现AI问答助手</div>
                <div class="desc">
                    本网站采用本地缓存模式运行，不会留任何设计您个人信息数据，请放心使用。
                </div>
                <el-button type="primary" @click="handleClearStorage">清空</el-button>
                
            </div>
            <!-- 提示内容end -->

            <!-- 详细内容 start -->
             <div class="grid-space-between grid-box">
                <!-- 左边内容 start -->
                <div class="left-container">
                    <el-button class="add-btn" :icon="Plus" size="large" @click="handleAddSession">新建对话</el-button>
                    <div class="session-area">
                        <div class="session-item" :class="activeIndex==index ? 'session-item-active' : ''" v-for="(item,index) in sessionList" :key="`session_${index}`" @click="handleChangeIndex(index)">
                            <span :class="activeIndex==index ? 'active-node' : 'normal-node'" v-if="editIndex!=index">{{ item.title }}</span>
                            <!--input输入-->
                            <el-input v-else v-model="item.title" size="small" style="width: 120px" autofocus @change="editIndex = -1" @blur="editIndex = -1"></el-input>
                            <div class="icon-box">
                                <el-icon class="icon" color="#fff" @click.stop="handleClearSession(index)"><Brush /></el-icon>
                                <el-icon class="icon" color="#fff" @click.stop="handleFocusIndex(index)"><EditPen /></el-icon>
                                <el-icon class="icon" color="#fff" @click.stop="handleDeleteSession(index)"><Delete /></el-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 左边内容 end -->

                <!-- 右边内容 start -->
                <div class="right-container">
                    <div class="message-area">
                        <MessageComp :message="queryInfos.message" ref="messageRef" :loading="loading"></MessageComp>

                    </div>
                    <div class="input-area">
                        <el-input v-model="queryKeys" id="keyInput" placeholder="请输入内容"  @keyup.enter.native="(e)=>{
                            if(e.isComposing || loading) return;
                            handleRequest();
                        }" show-word-limit/>

                        <el-button style="height: 40px;" type="primary" class="send-btn" :loading="loading" :disable="!queryKeys" @click="handleRequest">
                            <el-icon><Promotion/></el-icon>
                        </el-button>
                    </div>
                </div>
                <!-- 右边内容 end -->
             </div>
            <!-- 详细内容 end -->
        </div>
    </div>
</template>

<script setup lang="ts">
import MessageComp from './components/MessageComp.vue'
import { Plus, Promotion, EditPen, Delete, Brush} from '@element-plus/icons-vue'
import { ref,watch,onMounted,nextTick } from 'vue'
import OpenAI from 'openai'
import { ElMessage,ElMessageBox } from 'element-plus'
import { MODEL_CONFIG,STORAGE_KEY } from '@/config/deepseek'

// 定义对话的类型
interface SessionItem{
    title: string;
    crtTime: Date;
    messages: any[];
}

// 响应数据
const sessionList = ref<SessionItem[]>([])
// 激活索引
const activeIndex = ref<number>(-1);
// 编辑索引
const editIndex = ref<number>(-1);
//查询关键词
const queryKeys = ref<string>('');
// openAi对象
const openai = ref<OpenAI | null>(null);
// 按钮加载状态
const loading = ref<boolean>(false);
//消息内容
const messageRef = ref<InstanceType<typeof MessageComp> | null>(null);
//参数对象
const queryInfos = ref({
    message:[] as any[],
    model: 'deepseek-r1',
    ...MODEL_CONFIG
})

// 初始化会话列表
const initSessionList = () => {
    //该函数通过从本地储存中获取会话列表数据，并将其解析为数组，用于初始化页面上的会话列表
    sessionList.value = JSON.parse(localStorage.getItem(STORAGE_KEY.sessionList) || '[]')
}

// 初始化索引
// 该函数用于在组件挂载时从本地存储中加载会话列表和活动引索信息
const initIndex = () => {
    //从本地存储中获取列表长度，默认是零
    const listLen = JSON.parse(localStorage.getItem(STORAGE_KEY.sessionList) || '[]').length;
    //获取活动引索，默认-1
    const lastIndex = JSON.parse(localStorage.getItem(STORAGE_KEY.activeIndex) || '-1');
    
    // 如果会话列表长度大于0，则更新活动引索为上一次的引索或0
    if(listLen > 0 ) {
        activeIndex.value = lastIndex;
    } else {
        //否则将活动索引设置为-1
        activeIndex.value = -1;
    }

    //如果活动引索不等于-1，则更新查询信息消息为会话列表中指定引索的messages
    if(activeIndex.value != -1) {
        queryInfos.value.message = sessionList.value[activeIndex.value].messages;
    }

}

// 新建会话
const handleAddSession = () => {
    // 检查是否有查询正在进行
    if(loading.value){
        ElMessage.warning('请先完成当前查询')
        return;
    }
    //创建一个新会话对象，并添加到会话列表中
    sessionList.value.push({
        title: `对话${sessionList.value.length + 1}`,
        crtTime: new Date(),
        messages: []
    })
    //清空查询信息列表，准备信息对话
    queryInfos.value.messages = []
    //设置活动对话索引为新添加的对话索引
    activeIndex.value = sessionList.value.length - 1
}

// 组件挂载完成
onMounted(() => {
    initSessionList()
})
</script>

<style scoped>
.inner-html-comtainer{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
}

.add-btn{
    width: 100%;
    font-size: 15px;
    font-weight: bold;

}

.page{
    width: 94vw;
    height: 94vh;
    background: #1f1f1f;
    box-shadow: 0 0 20px rgba(254, 44, 85, 0.15);
    box-sizing: border-box;
    border-radius: 12px;
    overflow: hidden;
}

.tips {
    width: 100%;
    height: 40px;
    background:linear-gradient(90deg,#e99d53,#a4bd27);
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
}

.tips .title {
    font-size: 18px;
    font-weight: bold;
}

.tips .desc {
    font-size: 12px;
    color: rgba(255,255,255,0.9);
}

.grid-box{
    display: grid;
    grid-template-columns: 280px auto;
    gap: 16px;
    padding: 16px;
}

.grid-space-between{
    width: 100%;
    height: calc(100% - 40px);

}
</style>