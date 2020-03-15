<template>
   <div class="mask-description">
       <p class="mask-yyyy">오늘은 출생연도 끝자리 <span>{{maskEndYYYY}}</span> 공적마스크 구매가 가능합니다 🙂</p>
       <p class="mask-materials"> 1인당 2매가 가능합니다. 주민등록증 또는 운전면허증 을 지참해주세요. </p>
    </div>
</template>

<script>

export default {
    name: 'MaskDesciption',
    data() {
        return {
            maskEndYYYY: this.getTodayMask(),          
        }
    },
    methods: {
        getTodayMask(){
            // mask = [일,월,화,수,목.금,토]
            let mask = [ "상관 없이 모두","1, 6 의","2, 7 의" , "3, 8 의","4, 9 의" ,"5, 0 의", "상관 없이 모두"]; 
            
            let today = new Date().getDay();
            return mask[today];
        }
    }

};
</script>

<style>
.mask-description {
    margin-left: 15px;
    text-align: left;
    font-family: NotoSansCJKkr-Thin;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
}
.mask-description p span {
    color: #3e80fa;
    font-weight: 900;
}

.mask-yyyy {
    font-size: 25px;

}

.mask-materials {
    color:#ababab;
    font-family: NotoSansCJKkr-Thin ;
    font-size: 15px;
}
</style>