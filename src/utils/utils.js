import {getRequest} from './api'
import {Message} from 'element-ui'

export const isNotNullORBlank = (...args)=> {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
}
export const initMenu = (router, store)=> {
  if (store.state.routes.length > 0) {
    return;
  }
  //该方法是获取用户权限的主要方法，resp.data就是用户的权限列表
  getRequest("/config/sysmenu").then(resp=> {
    // console.log(resp.data);
    if (resp && resp.status == 200) {
      console.log(resp.data)
      var fmtRoutes = formatRoutes(resp.data);
      // console.log(fmtRoutes)
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
      store.dispatch('connect');
    }
  })
}
export const formatRoutes = (routes)=> {
  // console.log(routes);
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {

      path: path,
      component(resolve){
        if (component.startsWith("Home")) {
          require(['../components/' + component + '.vue'], resolve)
        } /*else if (component.startsWith("Emp")) { //用户资料
          require(['../components/emp/' + component + '.vue'], resolve)
        }*/ else if (component.startsWith("Per")) { //用户管理->综合管理
          require(['../components/personnel/' + component + '.vue'], resolve)
        } /*else if (component.startsWith("Sal")) { //薪资管理
          require(['../components/salary/' + component + '.vue'], resolve)
        }*/ else if (component.startsWith("Sta")) { //统计管理->下载管理
          require(['../components/statistics/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sys")) { //系统管理->配置管理
          require(['../components/system/' + component + '.vue'], resolve)
        } else if (component.startsWith("edit")){ //图标管理->可视化编辑
          require(['../pages/editPages3/' + component + '.vue'],resolve)
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
