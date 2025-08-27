<template>
    <div>
        <el-row :gutter="5">
            <draggable
                :list="data"
                group="kanban"
                item-key="idx"
                style="width: 100%; display: flex; flex-wrap: wrap"
                :disabled="!isSorting"
            >
                <template #item="{ element, index }">
                    <el-col
                        class="department_card"
                        style="padding: 10px"
                        :span="8"
                    >
                        <el-card
                            shadow="hover"
                            style="height: 100%; margin: 10px"
                            @click="editDepartment(element, index)"
                        >
                            <DepartmentCard :data="element" />
                        </el-card>
                    </el-col>
                </template>
            </draggable>
            <el-col class="department_card" style="padding: 10px" :span="8">
                <el-card
                    shadow="hover"
                    style="
                        height: 100%;
                        margin: 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        font-size: 30px;
                    "
                    @click="
                        editDepartment(
                            {
                                idx: data.length + 1,
                                name: null,
                                title: null,
                                manager: null,
                                managerTitle: null,
                                core: [],
                            },
                            null
                        )
                    "
                >
                    <el-icon><Plus /></el-icon> 新增部門
                </el-card>
            </el-col>
        </el-row>

        <!-- 編輯對話框 -->
        <el-dialog
            v-model="isDialogVisible"
            :title="currentEditIndex ? '編輯部門' : '新增部門'"
        >
            <el-form :model="editForm">
                <el-form-item label="部門名稱">
                    <el-input v-model="editForm.name" />
                </el-form-item>
                <el-form-item label="部門標題">
                    <el-input v-model="editForm.title" />
                </el-form-item>
                <el-form-item label="主管名稱">
                    <el-input v-model="editForm.manager" />
                </el-form-item>
                <el-form-item label="主管職稱">
                    <el-input v-model="editForm.managerTitle" />
                </el-form-item>
                <el-form-item label="核心內容">
                    <div
                        v-for="(c, idx) in editForm.core"
                        :key="idx"
                        style="
                            display: flex;
                            align-items: center;
                            margin-bottom: 10px;
                            width: 100%;
                        "
                    >
                        <el-input
                            v-model="editForm.core[idx]"
                            placeholder="輸入核心內容"
                            style="flex: 1; margin-right: 10px"
                        />
                        <el-button
                            :icon="Close"
                            type="danger"
                            @click="removeCore(idx)"
                        ></el-button>
                    </div>
                    <el-button :icon="Plus" type="primary" @click="addCore"
                        >新增核心內容</el-button
                    >
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="isDialogVisible = false">取消</el-button>
                <el-button type="danger" @click="deleteDepartment"
                    >刪除</el-button
                >
                <el-button type="primary" @click="saveEdit">保存</el-button>
            </template>
        </el-dialog>

        <div class="button-group" style="margin: 20px">
            <!-- 排序按鈕 -->
            <el-button type="primary" @click="enableSorting"
                >啟用排序</el-button
            >
            <el-button type="success" @click="saveOrder" v-if="isSorting"
                >保存排序</el-button
            >
        </div>
        <!-- currentEditIndex:{{ currentEditIndex }} -->
    </div>
</template>

<script setup>
import { ref } from "vue";
import ManagerCard from "@/components/ManagerCard.vue";
import DepartmentCard from "@/components/DepartmentCard.vue";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
import {
    Delete,
    Edit,
    Search,
    Share,
    Upload,
    Close,
    Plus,
} from "@element-plus/icons-vue";
const router = useRouter();
let data = ref([
    {
        idx: 1,
        name: "研究一所",
        title: "農業水資源與灌溉管理研究所",
        manager: "林賢銘",
        managerTitle: "所長",
        core: [
            "灌溉管理技術精進研究與灌溉水資源調配方案研擬",
            "農業灌溉用水情勢資料管理、加值應用分析、決策輔助與跨機關交流",
            "智慧灌溉業務推動與水文數據品管",
        ],
    },
    {
        idx: 2,
        name: "研究二所",
        title: "公共治理與制度創新研究所",
        manager: "吳柏澍",
        managerTitle: "所長",
        core: [
            "跨域治理與整合",
            "策略創新與發展",
            "人力資源管理研究",
            "組織營運績效管考制度研究",
            "農田水利事業發展與國土資源整合研究",
        ],
    },
    {
        idx: 3,
        name: "研究三所",
        title: "農業環境與政策研究所",
        manager: "簡靖芳",
        managerTitle: "所長",
        core: [
            "農業環境：田間管理技術與生產環境分析",
            "農業經濟：農產業供應鏈與輔導措施研究",
            "農場淨零：農業政策研析與淨零策略評估",
        ],
    },
    {
        idx: 4,
        name: "研究四所",
        title: "農田水利工程建設與管理研究所",
        manager: null,
        managerTitle: null,
        core: [
            "農業水資源工程政策研擬與效益研析",
            "農田水利水路系統各項工程改善調查規劃",
            "水文水理檢討與分析",
            "農業水資源工程規劃設計",
        ],
    },
    {
        idx: 5,
        name: "研究五所",
        title: "法制研究所",
        manager: "劉柏江",
        managerTitle: "所長",
        core: [
            "農田水利署法制作業",
            "林業及自然保育署法制作業",
            "法律研討會、座談會及法制教育訓練",
            "支援本院法律事務、各所處計畫之法律問題",
        ],
    },
    {
        idx: 6,
        name: "研究六所",
        title: "生態檢核及保育研究所",
        manager: "紀祥鈺",
        managerTitle: "所長",
        core: ["生態環境調查", "生態檢核機制研究"],
    },
    {
        idx: 7,
        name: "林業研究發展中心",
        title: "",
        manager: "陳昱蓉",
        managerTitle: "主任",
        core: [
            "森林碳匯研究",
            "獎勵輔助造林政策",
            "公司有林經營管理及輔導",
            "國家森林遊樂區評鑑及營運精進評估",
        ],
    },
    {
        idx: 8,
        name: "教育推廣處",
        title: "",
        manager: "謝青宏",
        managerTitle: "副處長",
        core: [
            "專業人力培訓：辦理水資源及農業各項專業教育訓練課程",
            "政策宣導推廣：依據多元政策需求執行各項系列活動:包含政策說明會、記者會、評選表揚、典禮規劃等",
            "知識傳播營銷：結合企劃力與科技力，應用VR（虛擬實境）技術與影像紀實，提供專業服務",
        ],
    },
    {
        idx: 9,
        name: "國際合作處",
        title: "",
        manager: null,
        managerTitle: null,
        core: [
            "拓展與國際研究組織之合作交流管道，並建立長期夥伴關係",
            "辦理國際水資源及農業技術講習，引進國際先進技術與觀念",
        ],
    },
    {
        idx: 10,
        name: "數位發展處",
        title: "",
        manager: "康文龍",
        managerTitle: "處長",
        core: [
            "資訊應用系統之規劃、開發及維護",
            "資料庫之規劃、建置與維運事項",
            "地理資訊圖資規劃、分析與建置",
            "資訊安全管理作業之規劃及辦理",
            "資訊與網路設備之規劃及維運管理",
        ],
    },
]);
const routerPush = (data) => {
    const { manager, title } = data;
    if (!manager) {
        alert("此部門尚未指定主管資料");
        return;
    }
    router.push({
        name: "SupervisorProfile",
        params: { manager, title },
    });
    //   router.push({
    //   name: 'SupervisorProfile',
    //   state: { manager, title }
    // })
};

// 編輯功能
const isDialogVisible = ref(false);
const editForm = ref({});
const currentEditIndex = ref(null);
const addDepartment = () => {
    editForm.value = {
        idx: data.value.length + 1,
        name: null,
        title: null,
        manager: null,
        managerTitle: null,
        core: [],
    };
    currentEditIndex.value = null;
    isDialogVisible.value = true;
};
const editDepartment = (department, index) => {
    editForm.value = JSON.parse(JSON.stringify(department)); // 深拷貝
    currentEditIndex.value = index;
    isDialogVisible.value = true;
};
const deleteDepartment = () => {
    ElMessageBox.confirm("確定要移除該所處?", "警告", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            if (currentEditIndex.value != null) {
                data.value.splice(currentEditIndex.value, 1);
                isDialogVisible.value = false;
            } else {
                alert("無法刪除，請先選擇要刪除的部門");
            }
            ElMessage({
                type: "success",
                message: "已成功刪除",
            });
        })
        .catch(() => {
            //   ElMessage({
            //     type: 'info',
            //     message: '取消移除',
            //   })
        });
};

const addCore = () => {
    editForm.value.core.push(""); // 新增一個空的核心內容
};

const removeCore = (index) => {
    editForm.value.core.splice(index, 1); // 刪除指定索引的核心內容
};
const saveEdit = () => {
    if (currentEditIndex.value == null) {
        // 新增部門
        data.value.push(JSON.parse(JSON.stringify(editForm.value)));
    } else {
        // 編輯現有部門
        const updatedDepartment = JSON.parse(JSON.stringify(editForm.value));
        data.value[currentEditIndex.value] = updatedDepartment;
    }
    isDialogVisible.value = false;
};

// 排序功能
const isSorting = ref(false);

const enableSorting = () => {
    isSorting.value = true;
};

const saveOrder = () => {
    isSorting.value = false;
};
</script>

<style lang="scss" scoped>
.el-card:hover {
    box-shadow: 0 4px 16px 0 #d1d8e0;
    transform: translateY(-2px) scale(1.02);
}
.department_card {
    cursor: pointer;
    transition: transform 0.2s;
}
/* @media (min-width: 1024px) {

} */
</style>
