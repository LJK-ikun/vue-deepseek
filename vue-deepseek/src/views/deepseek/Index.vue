<template>
    <div class="inner-html-comtainer">
        <div class="page">
            <!-- 提示内容 start -->
             <div class="tips">
                <div class="title">Vue3 + Deepseek 实现AI问答助手</div>
                <div class="desc">
                    本网站采用本地缓存模式运行，不会留任何设计您个人信息数据，请放心使用。
                </div>
                <el-button type="primary" @click="handleClearStrorage">清空</el-button>
                
            </div>
            <!-- 提示内容end -->

            <!-- 详细内容 start -->
             <div class="grid-spance-between grid-box">
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

                        <el-button style="height: 40px;" type="primary" class="send-btn" :loading="loading" :disable="!querykeys" @click="handleRequest">
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
import { MODEL_CONFIG,STORAGE_KEY } from '@/config/deepseek.ts'

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
</script>