// import lang from 'element-plus/lib/locale/lang/zh-cn'
// import locale from 'element-plus/lib/locale/lang/zh-cn' 
import { 
    ElCol,
    ElRow,
    ElButton,
    ElDrawer,
    ElInput,
  } from 'element-plus'
   
   
  const components = [
    ElCol,
    ElRow,
    ElButton,
    ElDrawer,
    ElInput,
  ]
   
  export default (app) => {
    // app.use(locale)
    components.forEach(item => {
      app.use(item)
    })
   
  }
  
  