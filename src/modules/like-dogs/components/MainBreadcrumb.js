import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'


const breadcrumbNameMap = {
  '/apps': 'App Routes List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail',
  '/auth': 'Authentication',
  '/auth/signup': 'Sign Up',
  '/auth/remember': 'Remember Password',
};

export const AppRoutes = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
    </li>
    <li>
      <Link to="/auth">Login</Link>
    </li>
  </ul>
);

const MainBreadcrumb = ({ location }) => {

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [(
    <Breadcrumb.Item key="home">
      <Link to="/">Dashboard</Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);

  return (
    <Breadcrumb>
      {breadcrumbItems}
    </Breadcrumb>
  )
}

export default MainBreadcrumb