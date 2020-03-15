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
import { FIND_MASK } from '../eventBus';

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
             text:'현재 위치'
             
        }
    }, 
    created(){
        this.getLocation();
                
    },
    mounted() {

            FIND_MASK.$on('현재 위치', (findMask) => {
                this.findMask=findMask;
                this.drawMap(this.findMask, '현재 위치');
            });
    },

    methods: {

        drawMap(findMask, text){
            
 
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
                    let content = '<div class="label">';
                    content += '<ul>';
                    content += '    <li>';
                    content += '        <span class="label">약국 : </span><span class="name">' + findMask.stores[i].name+'</span>';
                    content += '    </li>';
                    content += '    <li>';
                    content += '        <span class="label">수량 : </span><span class="number">' + findMask.stores[i].remain_stat+'</span>';
                    content += '    </li>';
                    content += '</ul>'
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


            }            
        },
        getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.onSuccessGeolocation, this.onErrorGeolocation);
                } else {
                    alert("error");
                }
            },
        onSuccessGeolocation(position) {
            console.log(position);
            //this.getMaskInfo(position); 
           
        },
        onErrorGeolocation(){
            var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
            
            var mapOption = { 

                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 5 // 지도의 확대 레벨
            };

            // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption); 
        },



    }    
};
</script>

<style>
#map {
    width:100%;
    height:750px;
}

.label {
    background-color: azure;
}
.label li {
    text-align: left;
}

</style>