import React from 'react';

import { Alert, Breadcrumb } from 'antd';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
  '/tags': '标签管理',
  '/Login': '登录',
  '/QuestionList': '列表管理',
  '/test':'测试'
};
const LayoutBreadcrumb = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <div className="demo">
      
      <Breadcrumb style={{
            margin: '16px 0',
        }}>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default LayoutBreadcrumb;