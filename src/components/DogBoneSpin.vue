<template>
    <div>
            <div class="bone">
            <div class="s1"></div>
            <div class="s2"></div>
            <div class="s3"></div>
            <div class="s4"></div>
            <div class="centerbone">
            <div class="clean"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BoneSpinner'
}
</script>

<style scoped>

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% { 
    transform: perspective(12px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(300px) rotateX(0deg) rotateY(0deg) 
  } 50% { 
    transform: perspective(300px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(300px) rotateX(-180.1deg) rotateY(0deg) 
  } 100% { 
    transform: perspective(300px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(300px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
/* Spinner animation and markup borrowed from SpinKit by @tobiasahlin - http://tobiasahlin.com/spinkit/ */
.bone{
  position: relative;
  width: 200px;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
  
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