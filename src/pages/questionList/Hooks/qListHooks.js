import { useRequest } from 'ahooks';
import {list as getAllList,subjects,remove} from '../../../service/questions'
import {message} from 'antd'
import { createAPI } from '../../../utils/request';
function useQlistRequset () {
    const { listloading, runAsync:getList } = useRequest(getAllList, {
        manual: true,
    })
    const {runAsync:getSubjects}=useRequest(subjects,{
        manual:true
    })
    const {runAsync:removeItem}=useRequest(remove,{
        manual:true
    })
    
    return {listloading,getList,getSubjects,removeItem}
}
export default useQlistRequset