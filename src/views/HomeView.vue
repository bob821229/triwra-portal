<template>
    <main>
        <!-- <h1 class="main-title">台灣水資源與農業研究院</h1> -->
        <div class="logo_wrap" @click="showSearch = !showSearch">
            <img src="@/assets/images/logo.jpg" alt="" />
        </div>
        <div class="search-row" v-show="showSearch">
            <el-input
                v-model="input1"
                style="width: 100%"
                size="large"
                placeholder="搜尋"
                :prefix-icon="Search"
            />
            <!-- <button class="announce-btn">
                <span class="announce-icon">⚙️</span>
                職訓公告
            </button> -->
        </div>
        <el-row :gutter="20">
            <el-col :span="4" v-for="l in filteredLinks" :key="l">
                <CategoryCard :title="l.category" :items="l.items">
                    <template #icon>
                        <span :class="l.icon"></span>
                    </template>
                </CategoryCard>
            </el-col>
        </el-row>
        <RouterView />
    </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import CategoryCard from "@/components/CategoryCard.vue";
const showSearch = ref(false);
const input1 = ref("");
const quickLinks = [
    {
        category: "關於台農院",
        icon: "icon-building-library",
        items: [
            { text: "院簡介(官網)", link: "https://www.triwra.org.tw/" },
            {
                text: "院長室",
                link: "https://www.triwra.org.tw/SupervisorProfile",
            },
            { text: "業務部門主管", link: "/DepartmentList" },
            {
                text: "行政部門簡介",
                link: "https://tsr01.triwra.org.tw/km/ad_work/download/department01.pdf",
            },
            {
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
                text: "交通位置資訊",
                link: "https://tsr01.triwra.org.tw/km/ad_work/download/entrance003.pdf",
            },
            {
                text: "研究院全名與logo",
                list: [
                    {
                        text: "研究院名稱",
                        link: "https://tsr01.triwra.org.tw/km/ad_work/download/portal01_07_01.pdf",
                    },
                    { text: "中文文件logo_台(白底)", link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo0-1.png" },
                    { text: "中文文件logo_台(黃字)", link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo0-2.jpg" },
                    { text: "中文文件logo_台(黃底)", link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo0-3.jpg" },
                    { text: "中英文件logo_台(白底)", link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo2-1.png" },
                    { text: "中英文件logo_台(黃字)", link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo2-2.png" },
                    { text: "中英文件logo_台(黃底)", link: "https://tsr01.triwra.org.tw/km/ad_work/download/logo/logo2-3.png" },
                ],
            },
            { text: "簡報專用結語", link: "data/entrance005.pptx" },
        ],
    },
    {
        category: "行政類",
        icon: "icon-folder",
        items: [
            {
                text: "行政管理規章(表單下載)",
                link: "https://tsr01.triwra.org.tw/km/ad_work/kmlist.htm",
            },
            {
                text: "差勤管理系統",
                link: "https://webapp.triwra.org.tw/worktime/Home/Login",
            },
            {
                text: "公文管理系統",
                link: "https://webapp.triwra.org.tw/eop/Home/Login",
            },
            {
                text: "計畫期款申請系統",
                link: "https://tsr01.triwra.org.tw/erp/planmoneyapply/Home/Login",
            },
            {
                text: "費用申請系統",
                link: "https://tsr01.triwra.org.tw/erp/moneyapply/Home/Login",
            },
            {
                text: "會議室申請系統",
                link: "https://tsr01.triwra.org.tw/erp/meetschedule/Home/Login",
            },
            {
                text: "設備申借管理系統",
                link: "https://tsr01.triwra.org.tw/erp/toolapply/Home/Login",
            },
            {
                text: "公務車申請系統",
                link: "https://tsr01.triwra.org.tw/erp/carschedule/Home/Login",
            },
            {
                text: "公物品管理系統",
                link: "https://tsr01.triwra.org.tw/erp/officeproduct/Home/Login",
            },
            {
                text: "會議紀錄查詢系統",
                link: "https://tsr01.triwra.org.tw/erp/meetingminutes/Home/Login",
            },
            {
                text: "簽呈管理系統",
                link: "https://tsr01.triwra.org.tw/erp/petitionmanage/Home/Login",
            },
        ],
    },
    {
        category: "資料查詢",
        icon: "icon-search",
        items: [
            {
                text: "數位資產平台",
                link: "https://info.triwra.org.tw/Account/Login?ReturnUrl=%2F",
            },
            { text: "購置書籍目錄", link: "data/booklist.xlsx" },
            {
                text: "常用廠商名錄",
                link: "https://tsr01.triwra.org.tw/km/ad_work/kmlist_vendor.asp",
            },
            { text: "計畫投標作業", link: "https://tsr01.triwra.org.tw/km/ad_work/download/o03-04-計畫投標作業.pdf" },
        ],
    },
    {
        category: "職場宣導",
        icon: "icon-stethoscope",
        items: [
            {
                text: "執行職務遭受不法侵害預防計畫",
                link: "https://tsr01.triwra.org.tw/km/ad_work/workplaceplan.asp",
            },
            { text: "性別平等", link: "https://tsr01.triwra.org.tw/km/ad_work/genderEquality.asp" },
            { text: "健康檢查", list:[
                {text: "健康檢查須知", link: "https://tsr01.triwra.org.tw/km/ad_work/download/健康檢查須知_內網公告版114.pdf" },
                {text: "健檢支出證明單", link: "data/健康檢查支出證明單.docx" },
                {text: "健檢資料使用同意書", link: "https://tsr01.triwra.org.tw/km/ad_work/download/06健康檢查個人資料使用同意書(空白).pdf" },
            ] },
            { text: "職業安全宣導", link: "https://tsr01.triwra.org.tw/km/ad_work/kmlist_training.asp" },
            { text: "生活管理與禮儀", list:[
                {text: "環境維護", link: "https://tsr01.triwra.org.tw/km/ad_work/download/environment0300.pdf" },
                {text: "生活須知", link: "https://tsr01.triwra.org.tw/km/ad_work/download/environment0301.pdf" },
                {text: "工作禮儀", link: "https://tsr01.triwra.org.tw/km/ad_work/download/environment0302.pdf" },
            ] },
            { text: "防疫健康聲明表", link: "data/class3_4.docx" },
            { text: "企業CSR-淨灘與淨山", list:[
                {text: "活動辦法", link: "https://tsr01.triwra.org.tw/km/ad_work/download/environment0500.pdf" },
                {text: "心得報告-表格", link: "data/environment0501.docx" },
            ] },
        ],
    },
    {
        category: "資訊類",
        icon: "icon-plant",
        items: [
            { text: "資訊安全管理規範", link: "https://tsr01.triwra.org.tw/km/ad_work/download/IT01.pdf" },
            { text: "資訊服務申請單", link: "data/1.4AC.docx" },
            { text: "圖資使用申請", list:[
                {text: "圖資清冊表單", link: "https://docs.google.com/spreadsheets/d/1cLdbSdm1hRLSVUcbN2DZFIthtuirP1c9eq1Q0HBR-us/edit?gid=0#gid=0" },
                {text: "圖資使用申請單", link: "data/it03_2.docx" },
                {text: "流程及填寫說明", link: "data/it03_3.pptx" },
            ] },
            { text: "遠端服務使用說明", link: "https://tsr01.triwra.org.tw/km/ad_work/download/forti.pdf" },
            { text: "電腦應用軟體", link: "https://tsr01.triwra.org.tw/km/ad_work/download/it04.pdf" },
        ],
    },
    {
        category: "空拍類",
        icon: "icon-plant",
        items: [
            { text: "禁飛區圖層(20210615)", link: "data/vr02.zip" },
            { text: "單位飛行計畫規劃申請表", link: "data/vr03.docx" },
            { text: "單位飛行計畫規劃申請表範例", link: "https://tsr01.triwra.org.tw/km/ad_work/download/vr04.pdf" },
        ],
    },
];
//新增：根據搜尋字串過濾 quickLinks
const filteredLinks = computed(() => {
    if (!input1.value.trim()) return quickLinks;
    const keyword = input1.value.trim().toLowerCase();
    // 只顯示有符合關鍵字的分類與子連結
    return quickLinks
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
.icon-pc {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="12" rx="2" stroke="%23678" stroke-width="2" fill="none"/><rect x="8" y="19" width="8" height="2" rx="1" fill="%23678"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-book {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" stroke="%23678" stroke-width="2" fill="none"/><path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" stroke="%23678" stroke-width="2" fill="none"/></svg>')
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
.icon-heart {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23e11d48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-6-4.35-9-8.5C-1.5 7.5 4.5 3 12 10.5 19.5 3 25.5 7.5 21 12.5c-3 4.15-9 8.5-9 8.5z" stroke="%23e11d48" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-user {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="%23678" stroke-width="2" fill="none"/><path d="M4 20v-1a8 8 0 0 1 16 0v1" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-star {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23eab308" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.5 21 12 17.8 5.5 21 7 14.1 2 9.3 9 8.5 12 2" stroke="%23eab308" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-shield {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V7l7-4z" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-server {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23678" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="6" rx="2" stroke="%23678" stroke-width="2" fill="none"/><rect x="3" y="14" width="18" height="6" rx="2" stroke="%23678" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
.icon-award {
    width: 1.3rem;
    height: 1.3rem;
    background: url('data:image/svg+xml;utf8,<svg fill="%23f59e42" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="6" stroke="%23f59e42" stroke-width="2" fill="none"/><path d="M8 16l-2 5 6-3 6 3-2-5" stroke="%23f59e42" stroke-width="2" fill="none"/></svg>')
        no-repeat center/contain;
    display: inline-block;
}
</style>
