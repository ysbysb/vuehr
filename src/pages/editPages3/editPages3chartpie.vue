<template>
  <VueDragResize :id="parentid" class="getmychart" :isActive="false"  :w="resizewidth" :h="resizeheight" :x="resizeleft" :y="resizetop" :parentLimitation="true" v-on:resizing="resize" v-on:dragging="resize"  v-on:dragstop="resizeStop" v-on:resizestop="resizeStop"  v-on:clicked="resizeClick" >
  <div class="vueresizepart" :class="parentclass" :type="parentclass" :name="name" :flag="flag" :partleft="resizeleft" :parttop="resizetop">
  </div>
  </VueDragResize>
</template>

<style scoped>
  @import '../../../static/css/editPages3/editPages3chartpie.css';
</style>
<script src="../../../static/js/editPages3/editPages3chartpie.js"></script>
