import React, { PureComponent } from 'react';
import { Col, Row, Spin, Icon, Button, Layout} from 'antd';
import * as LikeDogsActions from './LikeDogsActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import GeneralHeader from './components/GeneralHeader'
import MainBreadcrumb from './components/MainBreadcrumb'
const { Content } = Layout;
class LikeDogs extends PureComponent {

  async componentWillMount() {
    this.props.loadDogs()
  }

  render() {
    const { dogs, isFetchingDogs } = this.props
    const loadingIcon = <Icon type="loading" style={{ fontSize: 50, color: '#ee3923' }} spin />;
  
    if (isFetchingDogs) {
      return (
        <Row type="flex" justify="center" align="middle" gutter={16}>
          <Spin
            size="large"
            indicator={loadingIcon}
          />
        </Row>
      )
    } 

    return (
      <Layout className="layout" >
        <GeneralHeader />
        <Content style={{ padding: '50px', backgroundColor: '#F0F2F5' }}>
          <MainBreadcrumb location={this.props.location} />
          <Row type="flex" justify="start" gutter={16}>
            <Link to={'/apps'}>
              <Button type="primary">GO APPS ROUTES LIST</Button>
            </Link>
          </Row>
        </Content>
      </Layout>
    )
  }
}


const mapStateToProps = (state) => ({
  dogs: state.likeDogs.companies,
  isFetchingDogs: state.likeDogs.isFetchingDogs
})

const mapDispatchToProps = {
  loadDogs: LikeDogsActions.loadDogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeDogs)
