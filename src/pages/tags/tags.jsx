import { useRequest } from "ahooks";
import useTagsRequset from "./Hooks/useTagsRequest";
import TableHeader from "./components/TableHeader";
import { Space, Table, Tag, Button, Form } from "antd";
import {
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
const pages = {
  page: 1,
  pagesize: 99999,
};
const Tags = () => {
  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "所属学科",
      dataIndex: "subjectName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "标签名称",
      dataIndex: "tagName",
      key: "age",
    },
    {
      title: "创建者",
      dataIndex: "username",
      key: "address",
    },
    {
      title: "创建日期",
      dataIndex: "addDate",
      key: "address",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "状态",
      key: "state",
      dataIndex: "state",
      render: (_, { state }) => (
        <>
          <Tag color={state ? "geekblue" : "red"}>
            {state ? "启用" : "禁用"}
          </Tag>
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="small">
            <Button
              type="link"
              size="small"
              onClick={() => {
                runChangeState({
                  id: _.id,
                  state: _.state ? 0 : 1,
                });
              }}
            >
              {_.state ? <span>禁用</span> : <span>启用</span>}
            </Button>
            <Button
              type="link"
              size="small"
              disabled={_.tags === "禁用"}
              onClick={() => {
                setDrawerVisit(true);
                setFormMode({
                  mode: false,
                  value: _,
                });
              }}
            >
              修改
            </Button>
            <Button
              type="link"
              size="small"
              disabled={_.tags === "禁用"}
              onClick={() => {
                runRemove(_);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  //state
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataList, setDataList] = useState([]);
  const [isShowModal, setIsShowModa] = useState(false);
  const [formMode, setFormMode] = useState({
    mode: true,
    value: {},
  });
  const [subjectList, setSubjectList] = useState([]);
  const [search, setSearch] = useState({
    tagName: "",
    tags: "",
  });
  const {
    listloading,
    runDetail,
    runList,
    runSubjectList,
    runRemove,
    runAdd,
    runUpdate,
    runChangeState,
  } = useTagsRequset(dataList, setDataList, setSubjectList);

  const isfliter = Object.values(search).some((el) => el);

  const filterList = dataList.filter((el) => {
    if (search.tagName && !search.tags) {
      return el.tagName.includes(search.tagName);
    }
    if (!search.tagName && search.tags) {
      return el.tags === search.tags;
    }
    if (search.tagName && search.tags) {
      return el.tags === search.tags && el.tagName.includes(search.tagName);
    }
  });

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      runDetail({
        ...pages,
        subjectID: id,
      });
    } else {
      runList(pages);
    }

    runSubjectList();
  }, []);

  //eventHandlers
  const setDrawerVisit = (value) => {
    setIsShowModa(value);
  };
  const getfilterList = (value) => {
    setSearch({ ...value });
  };

  return (
    <>
      <TableHeader
        onModal={() => {
          setDrawerVisit(true);
          setFormMode({
            ...formMode,
            mode: true,
          });
        }}
        onFilter={getfilterList}
      ></TableHeader>
      <Space
        size={[0, 8]}
        wrap
        style={{ marginBottom: "20px", marginLeft: "20px" }}
      >
        <Tag icon={<SyncOutlined spin />} color="processing">
          当前共有{isfliter ? filterList.length : dataList.length}条数据
        </Tag>
      </Space>
      {listloading ? (
        <h2>加载中</h2>
      ) : (
        <Table
          columns={columns}
          dataSource={isfliter ? filterList : dataList}
        />
      )}
      <MyModal
        isModalOpen={isShowModal}
        setDrawerVisit={setDrawerVisit}
        formMode={formMode}
        subjectList={subjectList}
        FormSubmit={formMode.mode ? runAdd : runUpdate}
      ></MyModal>
    </>
  );
};

//表格头部
const MyModal = ({
  isModalOpen,
  setDrawerVisit,
  formMode,
  subjectList,
  FormSubmit,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (isModalOpen) {
      if (!formMode.mode) {
        form.setFieldsValue({
          subjectId: formMode.value.subjectID,
          tagName: formMode.value.tagName,
        });
      } else {
        form.resetFields();
      }
    }
  }, [formMode, isModalOpen]);

  return (
    <>
      <DrawerForm
        onOpenChange={setDrawerVisit}
        title={
          <span style={{ color: "#fff" }}>
            {formMode.mode ? "新增目录" : "修改目录"}
          </span>
        }
        open={isModalOpen}
        onFinish={async (e) => {
          if (formMode.mode) {
            FormSubmit({
              subjectID: Number(e.subjectId),
              tagName: e.tagName,
            });
          } else {
            FormSubmit({
              id: formMode.value.id,
              subjectID: Number(e.subjectId),
              tagName: e.tagName,
            });
          }
          return true;
        }}
        width="600px"
        form={form}
      >
        <ProForm.Group>
          <ProFormSelect
            options={subjectList}
            width="md"
            name="subjectId"
            label="所属学科"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="tagName"
            label="目录名称"
            placeholder="请输入名称"
            tooltip="最长为 24 位"
          />
        </ProForm.Group>
      </DrawerForm>
    </>
  );
};
export default Tags;
