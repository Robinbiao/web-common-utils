export default {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update () {

  },
  unbind (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  },
  jquery () {
    $(document).bind("click",function(e){
      //id为menu的是菜单，id为open的是打开菜单的按钮
      if($(e.target).closest("#ans-select-click-wrapper").length == 0){
        //点击id为menu之外且id不是不是open，则触发
        surveyVm.dropDownShow = false;
      }
    })
  }
}
