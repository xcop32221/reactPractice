import { EllipsisOutlined, PlusOutlined, SearchOutlined ,EyeOutlined,ToolOutlined,CloseOutlined,CodepenCircleOutlined ,YahooOutlined} from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Tag, Space, Tooltip, Input, message, Modal } from 'antd';
import { key, keys } from 'localforage';
import { Fragment, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import useQlistRequset from './Hooks/qListHooks'
import { useToggle } from 'ahooks';



export default () => {
   
    const actionRef = useRef();
    const formRef=useRef()
    const [open,{toggle}]=useToggle(false)
    const {getList,getSubjects,removeItem}=useQlistRequset()
    async function getData(parms){
        const resData=await getList(parms)
        return {
            page:resData.data.page,
            data:resData.data.items,
            total: resData.data.counts,
            success: resData.status===200,
          }
    }
    useEffect(()=>{
        const getSubjectsList=async ()=>{
            const res=await getSubjects()
            columns.find(el=>el.dataIndex==='subjectID').fieldProps.options=res.data
        }
        getSubjectsList()
    },[])
    const columns = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 42,
        },
        {
            title: '标题',
            dataIndex: 'number',
            copyable: true,
            ellipsis: true,
            valueType:'select',
            tip: '标题过长会自动收缩',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
          
        },
        {
            disable: true,
            title: '学科',
            dataIndex: 'subjectID',
            width: 100,
            // filters: true,
            // onFilter: true,
            ellipsis: true,
            valueType: 'select',
            fieldProps: {
                options: [
                  {
                    label: 'item 1',
                    value: 'a',
                  },
                  {
                    label: 'item 2',
                    value: 'b',
                  },
                  {
                    label: 'item 3',
                    value: 'c',
                  },
                ],
              },
            
        },
        {
            title: '目录',
            dataIndex: 'catalog',
            ellipsis: true,
            width: 100,
        },
        {
            title: '题型',
            dataIndex: 'questionType',
            ellipsis: true,
            valueType:'select',
            valueEnum: {
                '3': {
                    text: '单选',
                    status: 'Error',
                },
                '1': {
                    text: '多选',
                    status: 'Success',
                },
                '2': {
                    text: '简答',
                    status: 'Processing',
                },
            },
            width: 100,
        },
        {
            title: '题干',
            dataIndex: 'question',
            ellipsis: true,
            width: 300,
            render: (_, record) => {
                return <div dangerouslySetInnerHTML={ {__html:record.question}} style={{paddingLeft:'20px'}} ></div>
            },
        },
        {
            title: '创建时间',
            dataIndex: 'addDate',
            ellipsis: true,
            valueType:'dateTime',
            sorter: (a,b)=>{
                return  dayjs(a.addDate).unix()-dayjs(b.addDate).unix()
            },
            hideInSearch: true,
        },
        {
            title: '难度',
            dataIndex: 'questionType',
            ellipsis: true,
            key:'id',
            
            valueEnum: {
                '3': {
                    text: '简单',
                    status: 'Processing',
                },
                '1': {
                    text: '中等',
                    status: 'Default',
                },
                '2': {
                    text: '困难',
                    status: 'Error',
                },
            },
        },
        {
            title: '录入人',
            dataIndex: 'creator',
            ellipsis: true,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => {
            return[
            <Fragment key={record.id}>
            <Tooltip title="查看" >
                <Button type="primary" 
                shape="circle" 
                icon={<EyeOutlined />} 
                style={{color:'green',backgroundColor:'#fff'}}
                onClick={async (value) => {
                    message.loading('正在删除中')
                    await removeItem(record)
                    console.log(value)
                    action?.reload()
                }}
                />
            </Tooltip>
            <Tooltip title="修改">
            <Button type="primary" shape="circle" icon={<ToolOutlined />}
            onClick={toggle} 
            style={{color:'orange',backgroundColor:'#fff'
    
            }}  />
            </Tooltip>
            <Tooltip title="删除">
            <Button type="primary" shape="circle" icon={<CodepenCircleOutlined />}  style={{color:'red',backgroundColor:'#fff'}}  />
            </Tooltip>
            <Tooltip title="上架">
                <Button type="primary" shape="circle" icon={<YahooOutlined />} style={{color:'skyblue',backgroundColor:'#fff'}} />
            </Tooltip>
            </Fragment>
            ]},
        },
    ];
    return (
    <>
    <ProTable 
    columns={columns} 
    actionRef={actionRef} 
    formRef={formRef}
    cardBordered 
    request={async (params,sorter,fliter)=>{
        const resdata= getData({
            page:params.current,
            pageSize:params.pageSize,
            subjectID:params.subjectID
        })
        return resdata
    }} 
    editable={{
            type: 'multiple',
        }} 
    columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
            console.log('value: ', value);
        },
    }} 
    rowKey="id" 
    search={{
            labelWidth: 'auto',
            defaultCollapsed:false,
            //额外的搜索项
            // optionRender:()=>{
            //     return <Input label="新家"></Input>
            // }
        }} 
    options={{
            setting: {
                listsHeight: 200,
            },
        }} 
    form={{
        //form Porps配置
    }} 
    pagination={{
    pageSize: 5,
    // onChange: (page) => console.log(page),
        }
    } 
    dateFormatter="string" 
    headerTitle='基础题库' 
    toolBarRender={() => [
    <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
    </Button>,
    <Dropdown key="menu" menu={{
          items: [
                {
                    label: '1st item',
                    key: '1',
                },
                {
                    label: '2nd item',
                    key: '1',
                },
                {
                    label: '3rd item',
                    key: '1',
                },
            ],
        }}>
      <Button>
            <EllipsisOutlined />
      </Button>
    </Dropdown>,
    ]}/>
    <Modal 
     title="Vertically centered modal dialog"
     centered
     open={open}
     onOk={toggle}
     onCancel={toggle}
     width={1000}
     bodyStyle={{height:600}}
     >
        <h2>ahhahahh</h2>
     </Modal>
    </>
    );
};