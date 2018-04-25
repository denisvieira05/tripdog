import React, { PureComponent } from 'react';
import { Row, Spin, Icon, Layout, Card, Avatar, Col, Button} from 'antd';
import * as ProfileWishlistActions from './ProfileWishlistActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import GeneralHeader from '../../components/GeneralHeader'
import MainBreadcrumb from '../../components/MainBreadcrumb'
import DogCard from '../../components/DogCard'
import AvatarUpload from './components/AvatarUpload'
import AddDogModal from './components/AddDogModal'

const { Content } = Layout;

class ProfileWishlist extends PureComponent {
  
  state = { 
    showAddPhotoModalState: false,
  }

  async componentWillMount() {
    this.props.loadDogs()
  }

  render() {
    const { dogs, isFetchingDogs } = this.props
    const loadingIcon = <Icon type="loading" style={{ fontSize: 50, color: '#ee3923' }} spin />;
  
    if (isFetchingDogs) {
      return (
        <Row type="flex" justify="center" align="middle" gutter={16} style={{ marginTop: '15em' }}>
          <Spin
            size="large"
            indicator={loadingIcon}
          />
        </Row>
      )
    } 

    return (
      <Layout style={{ background: 'white'}} >
        <GeneralHeader />
        <Content style={{ padding: '50px' }}>
          <AddDogModal 
            visible={this.state.showAddPhotoModalState} 
            handleOk={() => this.setState({ showAddPhotoModalState: false})}
            handleCancel={() => this.setState({ showAddPhotoModalState: false})}
          />
          <Row type="flex" justify="center"  >
            <Col align="middle">
              <h1 style={{ fontWeight: 'bold' }}>Denis Vieira</h1>
              <h2>12 Dog Images</h2>
              <Button type="primary" onClick={() => this.setState({ showAddPhotoModalState: true })}>ADD DOG</Button>
            </Col>
          </Row>
          <Row type="flex" justify="start" align="middle" gutter={160} style={{ marginTop: '2em' }}>
            {
              dogs.map((dog, index) => (
                <DogCard dog={dog} style={{ marginBottom: '2em' }} />
              ))
            }
            {
              dogs.map((dog, index) => (
                <DogCard dog={dog} />
              ))
            }
            {
              dogs.map((dog, index) => (
                <DogCard dog={dog} />
              ))
            }
          </Row>
        </Content>
      </Layout>
    )
  }
}


const mapStateToProps = (state) => ({
  dogs: state.likeDogs.dogs,
  isFetchingDogs: state.likeDogs.isFetchingDogs
})

const mapDispatchToProps = {
  loadDogs: ProfileWishlistActions.loadDogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWishlist)
