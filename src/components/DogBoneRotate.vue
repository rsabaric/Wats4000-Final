<template>
    <div>
            <div class="bone">
            <div class="s1"></div>
            <div class="s2"></div>
            <div class="s3"></div>
            <div class="s4"></div>
            <div class="centerbone">
            <div class="clean"style="text-align:center;">Loading</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BoneRotater'
}
</script>

<style scoped>

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.bone{
  position: relative;
  width: 200px;
  -webkit-animation: spin 3s linear infinite; /* Safari */
  animation: spin 3s linear infinite;
  
}
.s1, .s2, .s3, .s4{
  background:rgba(116, 87, 8);
  height: 50px;
  width: 50px;
  border: 2px solid #000;
  border-radius: 50px;
  position:absolute;
}
.s1{
  left: 0;
}
.s2{
  right: 0;
}
.s3{
  top: 50px;
}
.s4{
  right: 0;
  top:50px;
}
.centerbone{
  background:#fff;
  height: 30px;
  width: 95px;
  border: 2px solid #000;
  position:absolute;  
  left: 53px;
  top: 35px;
  border-width: 2px 0 2px;
}
.clean{
  background:rgba(116, 87, 8);
  width: 165px;
  height:100%;
  position: absolute;
  left: -36px;

}
</style>