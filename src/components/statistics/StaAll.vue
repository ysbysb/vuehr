<template>
  <div>
    <h1>
      综合信息统计
    </h1>
    <div id="test">
      <VueDragResize :isActive="true"  :w="200" :h="200" v-on:resizing="resize" v-on:dragging="resize">
        <h3>Hello World!</h3>
        <p>{{ top }} х {{ left }} </p>
        <p>{{ width }} х {{ height }}</p>
      </VueDragResize>
    </div>
  </div>
</template>
<style>
  #test{
    color: #1b1e25;
    font-size: 28px;
  }

</style>
<script>
  import VueDragResize from 'vue-drag-resize';

  export default {
    name: 'app',

    components: {
      VueDragResize
    },

    data() {
      return {
        width: 0,
        height: 0,
        top: 0,
        left: 0
      }
    },

    methods: {
      resize(newRect) {
        this.width = newRect.width;
        this.height = newRect.height;
        this.top = newRect.top;
        this.left = newRect.left;
      }
    }
  }
</script>
