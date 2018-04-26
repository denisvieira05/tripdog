import React, { PureComponent } from 'react';
import { Row, Spin, Icon, Layout, Modal } from 'antd';
import * as LikeDogsActions from './LikeDogsActions'
import { connect } from 'react-redux'
import GeneralHeader from '../../components/GeneralHeader'
import DogCard from '../../components/DogCard'

const { Content } = Layout;
class LikeDogs extends PureComponent {

  state = {
    previewVisible: false,
    previewImage: ""
  };

  async componentWillMount() {
    this.props.loadDogs()
  }

  handlePreview = img => {
    this.setState({
      previewImage: img,
      previewVisible: true
    });
  };

  handleCancelPreview = () => this.setState({ previewVisible: false });

  render() {
    const { dogs, isFetchingDogs } = this.props
    const { previewVisible, previewImage } = this.state;
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
          <Row type="flex" justify="start" gutter={16} style={{ marginTop: '2em' }}>
            {
              dogs.map((dog, index) => (
                <DogCard
                  key={index}
                  dog={dog}
                  onClickDogCard={dog => this.handlePreview(dog.base64Image)}
                />
              ))
            }
          </Row>
        </Content>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancelPreview}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Layout>
    )
  }
}


const mapStateToProps = (state) => ({
  dogs: state.likeDogs.dogs,
  isFetchingDogs: state.likeDogs.isFetchingDogs
})

const mapDispatchToProps = {
  loadDogs: LikeDogsActions.loadDogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeDogs)
