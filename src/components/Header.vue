<template>
    <div class="header">
        <el-menu text-color="#000000" class="el-header"  mode="horizontal" >

            <el-menu-item index="1"><a href="/">현 위치</a></el-menu-item>           
            <el-menu-item index="2" ><a href="#">위치 검색</a></el-menu-item>
            <!-- 
            <el-menu-item index="2" ><a href="/search">위치 검색</a></el-menu-item>
            -->
        </el-menu>
    </div>
</template>

<script>

export default {
    name: 'Header',
};
</script>

<style scoped>
#search-addr {
    display: none;
}
.el-header a{
 text-decoration:none
}
</style>