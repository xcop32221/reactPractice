import { useRequest } from 'ahooks';
import { list as getList, subject,remove,add,update,changeState,detail } from '../../../service/tags'
import {message} from 'antd'
function useTagsRequset (dataList, setDataList,setSubjectList) {
    const { listloading, run:runList } = useRequest(getList, {
        manual: true,
        onSuccess: ({ data: { items: res } }) => {
          const list = res.map((i, index) => {
            return {
              ...i,key:index,tags:i.state?'启用':'禁用'
            }
          })
          
          setDataList(list)
          message.success('加载成功')
        }
    })
    const {  run:runDetail } = useRequest(detail, {
      manual: true,
      onSuccess: ({ data: { items: res } }) => {
        const list = res.map((i, index) => {
          return {
            ...i,key:index,tags:'启用'
          }
        })
        
        setDataList(list)
        message.success('加载成功')
      }
    })
      const {  run:runSubjectList } = useRequest(subject, {
        manual: true,
        onSuccess: ({ data: res }) => {
          setSubjectList(res)
        }
      })
      const { run:runRemove } = useRequest(remove, {
        manual: true,
        onSuccess: (result, params ) => {
          setDataList(dataList.filter(r=>r.id!==params[0].id).map((el,index)=>({...el,key:index}) ))
          message.success('删除成功')
        }
      })
      const {  run:runAdd } = useRequest(add, {
        manual: true,
        onSuccess: () => {
          runList(pages)
        }
      })
      const {  run:runUpdate } = useRequest(update, {
        manual: true,
        onSuccess: () => {
          runList(pages)
        }
      })
      const { run:runChangeState } = useRequest(changeState, {
        manual: true,
        onSuccess: (result, params ) => {
          setDataList(dataList.map(el => {
            if (el.id===params[0].id) {
              return {...el,state:params[0].state}
            }
            return el
          }))
        }
      })
    return {listloading,runDetail,runList,runSubjectList,runRemove,runAdd,runUpdate,runChangeState }
}
export default useTagsRequset