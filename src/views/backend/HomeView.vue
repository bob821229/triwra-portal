<template>
    <main>
        <div>
            <h1 style="text-align: center">編輯模式</h1>
            <div class="kanban-board">
                <div
                    class="kanban-list"
                    v-for="(list, index) in quickLinks"
                    :key="index"
                >
                    <el-card
                        class="kanban-column h-100"
                        :header="list.category"
                    >
                        <draggable
                            :list="list.items"
                            group="kanban"
                            item-key="id"
                            class="kanban-cards"
                            @end="(evt) => onDragEnd(evt, list.id)"
                            :disabled="!isSorting"
                        >
                            <template #item="{ element,index }">
                                <el-card class="kanban-card" shadow="always" @click="editLink(element, index,list)">
                                    {{ element.text }}
                                </el-card>
                            </template>
                        </draggable>
                        <template #footer>
                            <!-- 新增卡片按鈕 -->
                            <div
                                class="mt-2 text-center"
                                style="text-align: center"
                            >
                                <el-button
                                    type="success"
                                    @click="openAddItem(list)"
                                >
                                    ＋ 新增連結
                                </el-button>
                            </div>
                        </template>
                    </el-card>
                </div>
            </div>
        </div>
    </main>
    <div class="button-group" style="margin: 20px">
        <!-- 排序按鈕 -->
        <el-button type="primary" @click="enableSorting"
            >啟用排序</el-button
        >
        <el-button type="success" @click="saveOrder" v-if="isSorting"
            >保存排序</el-button
        >
    </div>
    <!-- <Footer></Footer> -->

    <!-- 新增清單 Dialog -->
    <el-dialog v-model="showAddList" title="新增清單" width="400px">
        <el-input v-model="newListName" placeholder="請輸入清單名稱" />
        <template #footer>
            <el-button @click="showAddList = false">取消</el-button>
            <el-button type="primary" @click="confirmAddList">新增</el-button>
        </template>
    </el-dialog>

    <!-- 新增卡片 Dialog -->
    <el-dialog v-model="showAddItem" title="新增卡片" width="400px">
        <el-form label-width="80px">
            <el-form-item label="標題">
                <el-input v-model="newItem.text" placeholder="請輸入卡片名稱" />
            </el-form-item>
            <el-form-item label="連結">
                <el-input
                    v-model="newItem.link"
                    placeholder="請輸入連結（可選）"
                />
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="showAddItem = false">取消</el-button>
            <el-button type="primary" @click="confirmAddItem">新增</el-button>
        </template>
    </el-dialog>
    <!-- 編輯link Dialog -->
    <el-dialog v-model="isDialogVisible" title="編輯連結" width="400px">
        <el-form label-width="80px">
            <el-form-item label="標題">
                <el-input v-model="editForm.text" placeholder="請輸入卡片名稱" />
            </el-form-item>
            <el-form-item label="連結">
                <el-input
                    v-model="editForm.link"
                    placeholder="請輸入連結（可選）"
                />
            </el-form-item>
            <el-form-item label="子項目" v-if="editForm.list && editForm.list.length">
                <template  v-for="(item, index) in editForm.list" :key="index">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <el-input
                            v-model="item.text"
                            placeholder="請輸入連結（可選）" />
                        <el-input
                            v-model="item.link"
                            placeholder="請輸入連結（可選）"  />
                    </div>
                </template>
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="isDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="deleteLink">刪除</el-button>
            <el-button type="primary" @click="saveEdit">確認</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { RouterView } from "vue-router";
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import CategoryCard from "@/components/CategoryCard.vue";
import Footer from "@/components/Footer.vue";
import draggable from "vuedraggable";
import { v4 as uuidv4 } from "uuid";
const edit = ref(false);
// 防抖處理卡片位置更新
const syncCardPosition = (payload) => {
    // console.log("[📦 API 呼叫] 同步卡片位置：", payload);
    // await axios.post('/api/cards/move', payload)
};
// const debouncedSyncCardPosition = debounce(syncCardPosition, 500);

// 拖曳結束事件
const onDragEnd = (evt, listId) => {
    console.log("拖曳完成:", evt, "所在清單:", listId);
    // 這裡可以做資料更新，例如存到後端
};
// ==========================
// 新增清單 Dialog
// ==========================
const showAddList = ref(false);
const newListName = ref("");

const openAddList = () => {
    newListName.value = "";
    showAddList.value = true;
};

const confirmAddList = () => {
    if (newListName.value.trim()) {
        quickLinks.value.push({
            id: uuidv4(),
            category: newListName.value.trim(),
            icon: "icon-folder-plus",
            items: [],
        });
        showAddList.value = false;
    }
};

// ==========================
// 新增卡片 Dialog
// ==========================
const showAddItem = ref(false);
const newItem = ref({ text: "", link: "" });
const currentList = ref(null);

const openAddItem = (list) => {
    currentList.value = list;
    newItem.value = { text: "", link: "" };
    showAddItem.value = true;
};

const confirmAddItem = () => {
    if (newItem.value.text.trim()) {
        currentList.value.items.push({
            id: uuidv4(),
            text: newItem.value.text.trim(),
            link: newItem.value.link.trim() || "#",
        });
        showAddItem.value = false;
    }
};
// 編輯功能
const editForm = ref({});
const currentEditIndex = ref(null);
const currentEditList = ref(null);
const isDialogVisible = ref(false);
const editLink = (link, index,list) => {
    console.log(link, index);
    console.log(list);
    currentEditList.value = list; // 設定當前的清單
    editForm.value = JSON.parse(JSON.stringify(link)); // 深拷貝
    currentEditIndex.value = index;
    isDialogVisible.value = true;
};
const saveEdit = () => {
    if (currentEditIndex.value == null) {
        // 新增部門
        // data.value.push(JSON.parse(JSON.stringify(editForm.value)));
        alert("新增部門功能尚未實作");
    } else {
        // 編輯現有部門
        const updatedLink = JSON.parse(JSON.stringify(editForm.value));
        quickLinks.value.items[currentEditIndex.value] = updatedLink;
    }
    isDialogVisible.value = false;
};
const deleteLink= () => {
     ElMessageBox.confirm("確定要移除該所處?", "警告", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
               if (currentEditIndex.value != null && currentList.value) {
                // 從對應的清單中移除該連結
                currentList.value.items.splice(currentEditIndex.value, 1);
                isDialogVisible.value = false;

                ElMessage({
                    type: "success",
                    message: "已成功刪除",
                });
            } else {
                alert("無法刪除，請先選擇要刪除的連結");
            }
        })
        .catch(() => {
            //   ElMessage({
            //     type: 'info',
            //     message: '取消移除',
            //   })
        });
}
//顯示搜尋列
const showSearch = ref(false);
// 搜尋字樣
const input1 = ref("");
//原始陣列
const quickLinks = ref([
    {
        id: uuidv4(),
        category: "關於台農院",
        icon: "icon-building-library",
        items: [
            {
                id: uuidv4(),
                text: "院簡介(官網)",
                link: "https://www.triwra.org.tw/",
            },
            {
                id: uuidv4(),
                text: "院長室",
                link: "https://www.triwra.org.tw/SupervisorProfile",
            },
            { id: uuidv4(), text: "業務部門主管", link: "/DepartmentList" },
            {
                id: uuidv4(),
                text: "行政部門簡介",
                link: "https://tsr01.triwra.org.tw/km/ad_work/download/department01.pdf",
            },
            {
                id: uuidv4(),
                text: "辦公空間位置圖",
                list: [
                    {
                        text: "22樓",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/o01-04-22F.pdf",
                    },
                    {
                        text: "20樓",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/o01-04-20F.pdf",
                    },
                    {
                        text: "19樓",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/o01-04-19F.pdf",
                    },
                    {
                        text: "16樓",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/o01-04-16F.pdf",
                    },
                    {
                        text: "5樓",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/o01-04-5F.pdf",
                    },
                ],
            },
            {
                id: uuidv4(),
                text: "同仁分機表",
                list: [
                    {
                        text: "分機表單",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/extensionnew/extension.pdf",
                    },
                    { text: "話機設定", link: "data/extension01.ppsx" },
                ],
            },
            {
                id: uuidv4(),
                text: "交通位置資訊",
                link: "https://tsr01.triwra.org.tw/km/ad_work/download/entrance003.pdf",
            },
            {
                id: uuidv4(),
                text: "研究院全名與logo",
                list: [
                    {
                        text: "研究院名稱",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/portal01_07_01.pdf",
                    },
                    {
                        text: "中文文件logo_台(白底)",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo0-1.png",
                    },
                    {
                        text: "中文文件logo_台(黃字)",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo0-2.jpg",
                    },
                    {
                        text: "中文文件logo_台(黃底)",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo0-3.jpg",
                    },
                    {
                        text: "中英文件logo_台(白底)",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo2-1.png",
                    },
                    {
                        text: "中英文件logo_台(黃字)",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo2-2.png",
                    },
                    {
                        text: "中英文件logo_台(黃底)",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo2-3.png",
                    },
                ],
            },
            {
                id: uuidv4(),
                text: "簡報專用結語",
                link: "data/entrance005.pptx",
            },
        ],
    },
    {
        id: uuidv4(),
        category: "行政類",
        icon: "icon-folder",
        items: [
            {
                id: uuidv4(),
                text: "行政管理規章(表單下載)",
                link: "https://tsr01.triwra.org.tw/km/ad_work/kmlist.htm",
            },
            {
                id: uuidv4(),
                text: "差勤管理系統",
                link: "https://webapp.triwra.org.tw/worktime/Home/Login",
            },
            {
                id: uuidv4(),
                text: "公文管理系統",
                link: "https://webapp.triwra.org.tw/eop/Home/Login",
            },
            {
                id: uuidv4(),
                text: "計畫期款申請系統",
                link: "https://tsr01.triwra.org.tw/erp/planmoneyapply/Home/Login",
            },
            {
                id: uuidv4(),
                text: "費用申請系統",
                link: "https://tsr01.triwra.org.tw/erp/moneyapply/Home/Login",
            },
            {
                id: uuidv4(),
                text: "會議室申請系統",
                link: "https://tsr01.triwra.org.tw/erp/meetschedule/Home/Login",
            },
            {
                id: uuidv4(),
                text: "設備申借管理系統",
                link: "https://tsr01.triwra.org.tw/erp/toolapply/Home/Login",
            },
            {
                id: uuidv4(),
                text: "公務車申請系統",
                link: "https://tsr01.triwra.org.tw/erp/carschedule/Home/Login",
            },
            {
                id: uuidv4(),
                text: "辦公物品管理系統",
                link: "https://tsr01.triwra.org.tw/erp/officeproduct/Home/Login",
            },
            {
                id: uuidv4(),
                text: "會議紀錄查詢系統",
                link: "https://tsr01.triwra.org.tw/erp/meetingminutes/Home/Login",
            },
            {
                id: uuidv4(),
                text: "簽呈管理系統",
                link: "https://tsr01.triwra.org.tw/erp/petitionmanage/Home/Login",
            },
        ],
    },
    {
        id: uuidv4(),
        category: "資料查詢",
        icon: "icon-search",
        items: [
            {
                id: uuidv4(),
                text: "數位資產平台",
                link: "https://info.triwra.org.tw/Account/Login?ReturnUrl=%2F",
            },
            { id: uuidv4(), text: "購置書籍目錄", link: "data/booklist.xlsx" },
            {
                id: uuidv4(),
                text: "常用廠商名錄",
                link: "https://tsr01.triwra.org.tw/km/ad_work/kmlist_vendor.asp",
            },
            {
                id: uuidv4(),
                text: "計畫投標作業",
                link: "https://tsr01.triwra.org.tw/km/ad_work/download/o03-04-計畫投標作業.pdf",
            },
        ],
    },
    {
        id: uuidv4(),
        category: "職場宣導",
        icon: "icon-stethoscope",
        items: [
            {
                id: uuidv4(),
                text: "執行職務遭受不法侵害預防計畫",
                link: "https://tsr01.triwra.org.tw/km/ad_work/workplaceplan.asp",
            },
            {
                id: uuidv4(),
                text: "性別平等",
                link: "https://tsr01.triwra.org.tw/km/ad_work/genderEquality.asp",
            },
            {
                id: uuidv4(),
                text: "健康檢查",
                list: [
                    {
                        text: "健康檢查須知",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/健康檢查須知_內網公告版114.pdf",
                    },
                    {
                        text: "健檢支出證明單",
                        link: "data/健康檢查支出證明單.docx",
                    },
                    {
                        text: "健檢資料使用同意書",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/06健康檢查個人資料使用同意書(空白).pdf",
                    },
                ],
            },
            {
                id: uuidv4(),
                text: "職業安全宣導",
                link: "https://tsr01.triwra.org.tw/km/ad_work/kmlist_training.asp",
            },
            {
                id: uuidv4(),
                text: "生活管理與禮儀",
                list: [
                    {
                        text: "環境維護",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/environment0300.pdf",
                    },
                    {
                        text: "生活須知",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/environment0301.pdf",
                    },
                    {
                        text: "工作禮儀",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/environment0302.pdf",
                    },
                ],
            },
            {
                id: uuidv4(),
                text: "防疫健康聲明表",
                link: "data/class3_4.docx",
            },
            {
                id: uuidv4(),
                text: "企業CSR-淨灘與淨山",
                list: [
                    {
                        text: "活動辦法",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/environment0500.pdf",
                    },
                    {
                        text: "心得報告-表格",
                        link: "data/environment0501.docx",
                    },
                ],
            },
        ],
    },
    {
        id: uuidv4(),
        category: "資訊類",
        icon: "icon-plant",
        items: [
            {
                id: uuidv4(),
                text: "資訊安全管理規範",
                link: "https://tsr01.triwra.org.tw/km/ad_work/download/IT01.pdf",
            },
            { id: uuidv4(), text: "資訊服務申請單", link: "data/1.4AC.docx" },
            {
                id: uuidv4(),
                text: "圖資使用申請",
                list: [
                    {
                        text: "圖資清冊表單",
                        link: "https://docs.google.com/spreadsheets/d/1cLdbSdm1hRLSVUcbN2DZFIthtuirP1c9eq1Q0HBR-us/edit?gid=0#gid=0",
                    },
                    { text: "圖資使用申請單", link: "data/it03_2.docx" },
                    { text: "流程及填寫說明", link: "data/it03_3.pptx" },
                ],
            },
            {
                id: uuidv4(),
                text: "遠端服務使用說明",
                link: "https://tsr01.triwra.org.tw/km/ad_work/download/forti.pdf",
            },
            {
                id: uuidv4(),
                text: "電腦應用軟體",
                link: "https://tsr01.triwra.org.tw/km/ad_work/download/it04.pdf",
            },
        ],
    },
    {
        id: uuidv4(),
        category: "空拍類",
        icon: "icon-plant",
        items: [
            {
                id: uuidv4(),
                text: "禁飛區圖層(20210615)",
                link: "data/vr02.zip",
            },
            {
                id: uuidv4(),
                text: "單位飛行計畫規劃申請表",
                link: "data/vr03.docx",
            },
            {
                id: uuidv4(),
                text: "單位飛行計畫規劃申請表範例",
                link: "https://tsr01.triwra.org.tw/km/ad_work/download/vr04.pdf",
            },
        ],
    },
]);
//新增：根據搜尋字串過濾 quickLinks
const filteredLinks = computed(() => {
    if (!input1.value.trim()) return quickLinks.value;
    const keyword = input1.value.trim().toLowerCase();
    // 只顯示有符合關鍵字的分類與子連結
    return quickLinks.value
        .map((link) => {
            // 檢查分類名稱或子連結文字是否有符合
            const matchedItems = link.items.filter((item) =>
                item.text.toLowerCase().includes(keyword)
            );
            if (
                link.category.toLowerCase().includes(keyword) ||
                matchedItems.length > 0
            ) {
                return {
                    ...link,
                    items: matchedItems.length > 0 ? matchedItems : link.items,
                };
            }
            return null;
        })
        .filter(Boolean);
});
// 排序功能
const isSorting = ref(false); // 控制是否正在排序
const enableSorting = () => {
    isSorting.value = true;
};

const saveOrder = () => {
    isSorting.value = false;
};
</script>

<style scoped lang="scss">
.logo_wrap {
    max-width: 1080px;
    margin: 20px auto;
    img {
        width: 100%;
        height: auto;
    }
}
main {
    min-height: 100vh;
    background: #f6f8fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 50px;
}
.main-title {
    font-size: 2.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin-bottom: 2rem;
    text-align: center;
}
.search-row {
    width: 100%;
    max-width: 1080px;
    display: flex;
    gap: 1.2rem;
    align-items: center;
    margin-bottom: 2.5rem;
}
.announce-btn {
    background: #fff;
    border: none;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #e5eaf1;
    font-size: 1.1rem;
    padding: 0.7rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: box-shadow 0.2s;
}
.announce-btn:hover {
    box-shadow: 0 4px 16px 0 #d1d8e0;
}
.announce-icon {
    font-size: 1.3rem;
}
.card-grid {
    display: flex;
    /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    gap: 2rem;
    width: 100%;
    /* max-width: 900px; */
    margin: 0 auto 2rem auto;
}
/* Icon 樣式 (可依需求換成 SVG 或組件) */
.icon-folder {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23eab308" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 0 1 2-2h4.465a2 2 0 0 1 1.414.586l1.535 1.535A2 2 0 0 0 13.172 7H20a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z"/></svg>')
        no-repeat center/contain;
}
.icon-building-library {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>')
        no-repeat center/contain;
}

.icon-search {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="%23678" stroke-width="2" fill="none"/><path d="M21 21l-4.35-4.35" stroke="%23678" stroke-width="2" stroke-linecap="round"/></svg>')
        no-repeat center/contain;
}
.icon-stethoscope {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v7a6 6 0 0 0 12 0V3" stroke="%23678" stroke-width="2" fill="none"/><circle cx="12" cy="17" r="3" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
}
.icon-plant {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21v-4M12 17c-4 0-7-3-7-7V5s3 0 7 4c4-4 7-4 7-4v5c0 4-3 7-7 7z" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
}
/* 子連結 icon (可依需求換 SVG) */
.icon-doc {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="%23678" stroke-width="2" fill="none"/><line x1="8" y1="8" x2="16" y2="8" stroke="%23678" stroke-width="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="%23678" stroke-width="2"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-clock {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="%23678" stroke-width="2" fill="none"/><path d="M12 7v5l3 3" stroke="%23678" stroke-width="2"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-case {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="13" rx="2" stroke="%23678" stroke-width="2" fill="none"/><path d="M16 3h-8v4h8V3z" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-building {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="13" rx="2" stroke="%23678" stroke-width="2" fill="none"/><rect x="7" y="11" width="2" height="2" fill="%23678"/><rect x="11" y="11" width="2" height="2" fill="%23678"/><rect x="15" y="11" width="2" height="2" fill="%23678"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}

.kanban-board {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    overflow-x: auto;
    padding: 1rem;
}
.kanban-list {
    width: 300px;
    flex-shrink: 0;
    height: 100%;
}
.kanban-card {
    cursor: pointer;
}
</style>
