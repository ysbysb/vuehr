//点击当前组件去掉其他组件焦点
function focus(e,that) {
  let clickOne = e.currentTarget; // e.currentTarget 是你绑定事件的元素
  let class_getmychart = document.getElementsByClassName("getmychart");
  for (let i = 0 ; i < class_getmychart.length; i ++){
    class_getmychart[i].classList.remove('active');
    class_getmychart[i].classList.add('inactive');
  }
  clickOne.classList.remove('inactive');
  clickOne.classList.add('active');
  that.contentItem = clickOne.getAttribute('id');
}

export default {
  focus
}
