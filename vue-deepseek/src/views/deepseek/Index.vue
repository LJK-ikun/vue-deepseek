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

                <!-- 右边内容 end -->
             </div>
            <!-- 详细内容 end -->
        </div>
    </div>
</template>