<template>

    <div class="content card_wrap" >
        <div class="row flex-column-reverse flex-md-row">
            <div class="col-md-6 col-sm-12 left_block">


                <h2>
                    {{ parameters.position }}&nbsp;
                    {{ parameters.name }}
                </h2>
                <h3>專業領域</h3>
                <p>
                    {{ parameters.professionalField }}
                </p>
                <h3 v-if="parameters.honors && parameters.honors.length > 0">榮譽</h3>
                <ol v-if="parameters.honors && parameters.honors.length > 0">
                    <li v-for="(honor, index) in parameters.honors" :key="index">
                        <p>{{ honor }}</p>
                    </li>
                </ol>
                <h3>學歷</h3>
                <ol>
                    <li v-for="(school, index) in parameters.educationalQualifications" :key="index">
                        <p>{{ school }}</p>
                    </li>
                </ol>
                <h3>經歷</h3>
                <ol>
                    <li v-for="(exp, idx) in parameters.experience" :key="idx">
                        <p>{{ exp }}</p>
                    </li>
                </ol>
            </div>
            <div class="col-md-6 col-sm-12 right_block">
                <img :src="`${parameters.pic}`" class="img-fluid" alt="...">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { defineProps } from 'vue';
const props = defineProps({
    parameters: {
        type: Object,
        default: () => ({})
    }
})
console.log("data:", props.parameters)

</script>

<style scoped lang="scss">
.card_wrap {
    max-width: 1100px;
    margin: 50px auto;
    padding: 20px;

    h2 {
        margin-bottom: 20px;
    }

    .left_block {
        display: flex;
        flex-direction: column;

        ol {
            list-style-type: decimal;

            li::marker {

                color: #54595f;
                font-size: 20px;
                font-weight: 500;
                font-family: Arial, sans-serif;
            }
        }
    }

    .right_block {
        padding: 50px;
        text-align: center;
    }
}


h2 {
    font-size: 28px;
    font-weight: 600;
    color: #54595f;
}

h3 {
    color: #54595f;
    font-size: 24px;
    font-weight: 600;

}

p {
    font-size: 20px;
    line-height: 41px;
    font-weight: 500;
    color: #54595f;
}
.img-fluid{
    max-width: 90%;
}
</style>