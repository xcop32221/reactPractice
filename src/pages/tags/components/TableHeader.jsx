import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, theme } from "antd";

const { Option } = Select;
const AdvancedSearchForm = ({ onModal, onFilter }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle = {
    maxWidth: "none",
    background: "#fff",
    borderRadius: token.borderRadiusLG,
    padding: 20,
  };
  const getFields = () => {
    return (
      <>
        <Form.Item name={`tagName`} label={`标签名称`} colon={true}>
          <Input />
        </Form.Item>
        <Form.Item name={`tags`} label={`状态`} colon={true}>
          <Select style={{ width: 200 }}>
            <Option value="启用">启用</Option>
            <Option value="禁用">禁用</Option>
          </Select>
        </Form.Item>
      </>
    );
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form form={form} style={formStyle} onFinish={onFinish} layout="inline">
      {getFields()}

      <Button
        type="primary"
        htmlType="submit"
        onClick={() => onFilter(form.getFieldValue())}
      >
        搜索
      </Button>
      <Button
        style={{
          margin: "0 8px",
        }}
        onClick={() => {
          form.resetFields();
          onFilter(form.getFieldValue());
        }}
      >
        清除
      </Button>
      <Button
        style={{
          position: "absolute",
          right: 80,
          backgroundColor: "#95cc6f",
          color: "#FFF",
        }}
        onClick={onModal}
        icon={<PlusOutlined />}
      >
        新增标签
      </Button>
    </Form>
  );
};
const App = ({ onModal, onFilter }) => {
  const { token } = theme.useToken();
  const listStyle = {
    lineHeight: "200px",
    textAlign: "center",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };
  return (
    <div>
      <AdvancedSearchForm onModal={onModal} onFilter={onFilter} />
    </div>
  );
};
export default App;
