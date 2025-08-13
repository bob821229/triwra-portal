<template>
    <!-- {{ data }} -->
   <el-card style="min-width: 1280px;margin-top: 50px;" v-if="data"  shadow="always">
    <template #header>
      <div class="card-header">
        <h1 style="text-align: center;" class="txt-color">{{ data.department }}</h1>
        <h2 style="text-align: center;" class="txt-color">{{ title }}</h2>
      </div>
    </template>
     <el-row>
        <el-col :span="6">
          <div class="image_wrap" >
            <el-image style="width: 100%; height: 100%"  fit="cover" />
          </div>
        </el-col>
         <el-col :span="18">
        <div class="info-table">
          <div class="info-row">
            <span class="manager-name">
                {{ data?.name }}　{{ data?.positionTitle }}
            </span>
          </div>
          <div class="info-row">
            <span class="info-label">專業領域</span>
            <span class="info-content">
              <template v-if="data?.computerExpertise && data.computerExpertise.length">
                {{ data.computerExpertise.join('、') }}
              </template>
            </span>
          </div>
          <div class="info-row">
            <span class="info-label">學歷</span>
            <span class="info-content">
              <template v-if="data?.schools && data.schools.length">
                <div v-for="(s, idx) in data.schools" :key="idx">
                  {{ s.name }}{{ s.department ? ' ' + s.department : '' }} {{ s.academicDegree ? s.academicDegree : '' }}
                </div>
              </template>
            </span>
          </div>
          <div class="info-row">
            <span class="info-label">經歷</span>
            <span class="info-content">
              <template v-if="data?.workExperience && data.workExperience.length">
                <div v-for="(w, idx) in data.workExperience" :key="idx">
                  {{ w.company }} {{ w.position }}
                </div>
              </template>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
   <span v-else>
    <!-- {{route.params.manager}} -->
    無資料
    <!-- <el-button type="primary" @click="goBack">返回</el-button> -->
  </span>
</template>

<script setup>
import { ref, computed } from "vue";
import ManagerCard from "@/components/ManagerCard.vue";
import DepartmentCard from "@/components/DepartmentCard.vue";
import { useRoute, } from "vue-router";

const route = useRoute()
console.log('window.history.state:', window.history.state)
const manager = ref(route.params?.manager)
const title = ref(route.params?.title)
const data = computed(() => {
  if (!manager.value || !managerList.length) return null
  return managerList.find((item) => item.name === manager.value)
})
let managerList = [
    {
        name: "林賢銘",
        positionTitle: "所長",
        department: "研究一所",
        computerExpertise: ["水利工程", "海洋工程", "類神經網路", "機器學習"],
        schools: [
            {
                academicDegree: "碩士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立交通大學", //學校名稱
                department: "土木工程所", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "學士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立臺灣海洋大學", //學校名稱
                department: "河海工程學系", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "副所長", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "研究專員", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "天禾資訊有限公司", //公司名稱
                position: "工程師", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "交通部運輸研究所港灣技術研究中心", //公司名稱
                position: "研究助理", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
    {
        name: "吳柏澍",
        positionTitle: "所長",
        department: "研究二所",
        computerExpertise: [
            "都市計畫",
            "國土計畫",
            "非都市土地利用",
            "不動產法律",
            "農田水利法",
            "地理資訊系統(GIS)",
            "人工智慧導入應用",
            "專案管理",
        ],
        schools: [
            {
                academicDegree: "碩士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立台灣大學", //學校名稱
                department: "建築與城鄉研究所", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "雙主修學士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立清華大學", //學校名稱
                department: "社會學暨人類學", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "副所長", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "研究專員", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "學邑工程技術顧問股份有限公司", //公司名稱
                position: "專案經理", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "中華經濟研究院", //公司名稱
                position: "輔佐研究員", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
    {
        name: "簡靖芳",
        positionTitle: "所長",
        department: "研究三所",
        computerExpertise: [
            "土壤學",
            "碳匯",
            "水資源分配",
            "微生物學",
            "植物病原交互作用",
            "分子生物學",
        ],
        schools: [
            {
                academicDegree: "博士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立台灣大學", //學校名稱
                department: "農業化學所", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "碩士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立台灣大學", //學校名稱
                department: "農業化學所", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "愛滴科技股份有限公司", //公司名稱
                position: "首席科學家", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "中央研究院植物暨微生物研究所", //公司名稱
                position: "博士後研究員", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
    {
        name: "侯玉娟",
        positionTitle: "所長",
        department: "研究四所",
        computerExpertise: ["統計分析", "市場調查", "組織管理", "計畫行政業務"],
        schools: [
            {
                academicDegree: "碩士班 (進修中)", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立中興大學", //學校名稱
                department: "水土保持研究所", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "碩士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "淡江大學", //學校名稱
                department: "管理科學所", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "學士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "淡江大學", //學校名稱
                department: "統計學系", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "研究專員", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "淡江大學水資源管理與政策研究中心", //公司名稱
                position: "研究專員", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "階梯數位科技股份有限公司", //公司名稱
                position: "數學科教學", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "凱鴻環保科技股份有限公司", //公司名稱
                position: "助理秘書", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
    {
        name: "劉柏江",
        positionTitle: "所長",
        department: "研究五所",
        computerExpertise: [
            "一般民事",
            "刑事",
            "行政",
            "訴願法",
            "國家賠償法",
            "農田水利法",
            "財團法人法",
            "森林法",
        ],
        schools: [
            {
                academicDegree: "博士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立台北大學", //學校名稱
                department: "法律學系", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "碩士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立台北大學", //學校名稱
                department: "法律學系", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "法治服務團執行祕書", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "馬偕醫護管理專科學校", //公司名稱
                position: "兼任助理教授", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "新學林出版社", //公司名稱
                position: "司法考試用書作者", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "國立台北大學", //公司名稱
                position: "兼任講師", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "銘傳大學", //公司名稱
                position: "兼任講師", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "國立台北商業大學", //公司名稱
                position: "兼任講師", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "國立金門大學", //公司名稱
                position: "兼任講師", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "世新大學", //公司名稱
                position: "兼任講師", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "臺灣警察專科學校", //公司名稱
                position: "兼任講師", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
    {
        name: "紀祥鈺",
        positionTitle: "所長",
        department: "研究六所",
        computerExpertise: [
            "影像分析處理",
            "農作物生產監測與規劃",
            "樣區調查與規劃",
        ],
        schools: [
            {
                academicDegree: "碩士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立嘉義大學", //學校名稱
                department: "森林暨自然學系", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "學士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "中國文化大學", //學校名稱
                department: "森林暨自然保育學系", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "生態檢核及保育服務團", //公司名稱
                position: "執行秘書", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "副所長", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "淡江大學水資源管理與政策研究中心", //公司名稱
                position: "研究專員", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "勃翔股份有限公司上海市實驗農場", //公司名稱
                position: "主任", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
    {
        name: "陳昱蓉",
        positionTitle: "主任",
        department: "林業研究發展中心",
        computerExpertise: [
            "植物組織培養及育苗",
            "分子生物學",
            "造林撫育",
            "森林經營",
            "生物技術",
        ],
        schools: [
            {
                academicDegree: "博士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立台灣大學", //學校名稱
                department: "生物資源暨農學院林環境暨資源學系", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "學士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立台灣大學", //學校名稱
                department: "生物資源暨農學院林環境暨資源學系", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "優克力農林科學公司", //公司名稱
                position: "研究員", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "研究一所 研究專員", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
    {
        name: "謝青宏",
        positionTitle: "副所長",
        department: "教育推廣處",
        computerExpertise: [
            "行政組織理論與管理",
            "公共政策理論與務實",
            "農田水利事業發展與人力資源管理",
        ],
        schools: [
            {
                academicDegree: "博士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立政治大學", //學校名稱
                department: "公共行政學系", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "碩士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立政治大學", //學校名稱
                department: "公共行政學系", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "學士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "中國文化大學", //學校名稱
                department: "行政管理學系", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "副所長", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "台灣水資源與農業研究院", //公司名稱
                position: "研究專員", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "佛光大學公共事務學系", //公司名稱
                position: "兼任助理教授", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "前法務部政風司委託研究專案", //公司名稱
                position: "專任研究員", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
    {
        name: "吳宜家",
        positionTitle: "副處長",
        department: "國際合作處",
        computerExpertise: ["專案管理", "研究分析", "人際溝通", "藝術創作"],
        schools: [
            {
                academicDegree: "碩士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "英國倫敦大學學院", //學校名稱
                department: "美術系", //科系
                period: [null, null], //修業起訖年月
            },
            {
                academicDegree: "學士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "國立藝術學院(今國立台北藝術大學)", //學校名稱
                department: "藝術系", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "國際灌溉排水協會中華民國國家委員會", //公司名稱
                position: "副秘書長", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "台北市政府台北智慧城市專案辦公室", //公司名稱
                position: "專案管理師", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "國家發展委員會", //公司名稱
                position: "助理研究員", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "阮劇團", //公司名稱
                position: "執行製作", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
    {
        name: "康文龍",
        positionTitle: "處長",
        department: "數位發展處",
        computerExpertise: ["系統分析與開發", "資料庫規劃與管理"],
        schools: [
            {
                academicDegree: "學士", //學位
                degreeStatus: "畢業", //畢業狀況
                name: "龍華科技大學", //學校名稱
                department: "資訊管理系", //科系
                period: [null, null], //修業起訖年月
            },
        ], //學歷
        //職務經歷
        workExperience: [
            {
                company: "寶碩財務科技股份有限公司", //公司名稱
                position: "技術副理", //職務名稱
                period: [null, null], //服務起訖年月
            },
            {
                company: "財團法人中華民國電腦技能基金會", //公司名稱
                position: "部門主管", //職務名稱
                period: [null, null], //服務起訖年月
            },
        ],
    },
];
</script>

<style lang="scss" scoped>
.txt-color{
    color: #A47332;
}
.image_wrap{
  height: 100%;
}
.information_wrap{
display: flex;
flex-direction: column;
justify-content: center;
padding:0 20px ;
// align-items: ;
}
/* @media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
} */

 .profile-card {
  min-width: 800px;
  margin-top: 30px;
  .card-header {
    background: #c99e0b;
    color: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    padding: 0.6rem 1rem;
    .dept-title {
      color: #fff;
    }
  }
}
.image_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-right: 1px solid #ddd;
  height: 100%;
  min-height: 220px;
}
.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-left: 10px;
  .info-row {
    display: flex;
    border-bottom: 1px solid #ddd;
    min-height: 48px;
    align-items: flex-start;
    &:last-child {
      border-bottom: none;
    }
    .info-label {
      width: 150px;
      font-weight: bold;
      color: #333;
      padding: 8px 0 0 0;
      flex-shrink: 0;
      font-size:20px;
    }
    .info-content {
      flex: 1;
      padding: 8px 0 0 0;
      color: #222;
      line-height: 1.7;
      word-break: break-all;
      font-size: 20px;
    }
  }
}
.manager-name {
  font-size: 1.8rem;
  color: #2d3ecb;
  font-weight: bold;
  padding: 8px 0;
}
</style>
