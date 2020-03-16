<template>
    <div>
        <div id="search-addr">
            <el-input class="input-with-select" placeholder="예- '서울특별시 강남구' or '서울특별시 강남구 논현동' ('서울특별시' 와 같이 '시'단위만 입력하는 것은 불가능합니다.)"  v-model="addr"  @keyup.enter.native="searchMask">
                    <el-button class="submit" slot="append" icon="el-icon-search" v-on:click="searchMask" ></el-button>
            </el-input>
        </div>
        <div id="map">
        
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default { 

    name: 'Map',     
    data() {
       return {
            addr: '',
            findMask: {
                address: '',
                count:'',
                stores: []
             },      
        }
    },
    mounted() {
        this.drawMap(this.findMask);
    
    },
    methods: {

        drawMap(findMask){            
 
            if(findMask.stores.length!=0){

                //검색 데이터에서 Lat, Lng 의 중간 값
                let latAve=0;
                let LngAve=0; 
                
                let len = findMask.stores.length;
                for(let i=0; i<len; i++){
                    latAve+=findMask.stores[i].lat;
                    LngAve+=findMask.stores[i].lng;

                }
                latAve=latAve/len;
                LngAve=LngAve/len;
                let mapContainer = document.getElementById('map');// 지도를 표시할 div 
                let mapOption = { 
                        center: new kakao.maps.LatLng(latAve, LngAve), // 지도의 중심좌표
                        level: 5 // 지도의 확대 레벨
                    };


                // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
                let map = new kakao.maps.Map(mapContainer, mapOption); 



                for(let i=0; i<len; i++){
                    //HTML 문자열 또는 Dom Element 입니다 
                    let state = this.getRemainStat(findMask.stores[i].remain_stat);
                    let content = '<div class="find-mask-here">';
                        content += '        </span><span class="number">' + state+'</span>';
                        content += '</div>';
                    let contentPosition  = new kakao.maps.LatLng(findMask.stores[i].lat, findMask.stores[i].lng); 
                    // 마커를 생성합니다
                    let marker = new kakao.maps.CustomOverlay({
                        position: contentPosition,
                        content: content
                    });
                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);


                } 

            }else {     
              
                let mapContainer = document.getElementById('map');// 지도를 표시할 div 
                let mapOption = { 
                        center: new kakao.maps.LatLng(37.3003072, 127.1072867), // 지도의 중심좌표
                        level: 5 // 지도의 확대 레벨
                    };

                // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
                let map = new kakao.maps.Map(mapContainer, mapOption); 
                    
                let contentPosition  = new kakao.maps.LatLng(37.3003072, 127.1072867); 
                    // 마커를 생성합니다
                    let marker = new kakao.maps.CustomOverlay({
                        position: contentPosition
                    });
                    // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(null);
                

            }            
        },
        searchMask(){

            axios.get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${this.addr}`).then(res => {
                    this.findMask = res.data;
                    this.drawMap(this.findMask)

                 }).catch(err => {
                     console.log(err);
            });            
        },
        getRemainStat(remain_stat){
            let status = '';
            /*
             * 재고 상태[100개 이상(녹색): 'plenty' / 
             * 30개 이상 100개미만(노랑색): 'some' / 
             * 2개 이상 30개 미만(빨강색): 'few' / 
             * 1개 이하(회색): 'empty' / 
             * 판매중지: 'break'
            */
           switch(remain_stat){
               case 'plenty':
                   status = '100개 이상';
                   break;
               case 'some':
                   status = '30개 이상 100개미만';
                   break;
               case 'few':
                   status = '1개 이상 30개 미만';
                   break;
               case 'empty':
                   status = '없음';
                   break;
               case 'break':
                   status = '판매중지';
                   break;
           }

            return status;
        }



    }    
};
</script>

<style>
#map {
    width:100%;
    height:700px;
}

.find-mask-here {
    background-color: azure;
    border: 2px solid #73AD21;
    border-radius: 5px;

}
.find-mask-here li {
    text-align: left;
}
.find-mask-here {
    z-index:555555 !important;
}

.find-mask-here .number {
    font-size: 15px;
    font-family: NotoSansCJKkr-Thin;
}
</style>