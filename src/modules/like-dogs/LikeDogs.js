import React, { PureComponent } from 'react';
import { Row, Spin, Icon, Layout, Modal, message } from 'antd';
import * as LikeDogsActions from './LikeDogsActions'
import { connect } from 'react-redux'
import GeneralHeader from '../../components/GeneralHeader'
import DogCard from '../../components/DogCard'

const { Content } = Layout;
class LikeDogs extends PureComponent {

  state = {
    previewVisible: false,
    previewImage: "",
    dogsList: this.props.dogs || []
  };

  componentWillMount() {
    this.props.loadDogs()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dogs != this.state.dogsList) {
      this.setState({
        dogsList: nextProps.dogs
      })
    }

    if (nextProps.actionMessage !== null && nextProps.actionMessage !== this.props.actionMessage) {
      this._showMessageAfterAction(nextProps.actionMessage)
    }
  }

  _showMessageAfterAction(actionMessage) {
    const { type, text } = actionMessage

    const action = {
      'success': () => message.success(text),
      'error': () => message.success(text)
    }

    action[type]()
  }

  _handlePreview = img => {
    this.setState({
      previewImage: img,
      previewVisible: true
    });
  };

  _textIsPresentOnUsername(textSearched, dogName) {
    if(textSearched === '')
      return true

    return dogName.includes(textSearched)
  }

  _filterDogsList = textSearched => {
    const dogsFiltered = this.props.dogs.filter((dog) => this._textIsPresentOnUsername(textSearched.toLowerCase(), dog.name.toLowerCase()))
    this.setState({
      dogsList: dogsFiltered
    })
  }

  _handleCancelPreview = () => this.setState({ previewVisible: false });

  _handleDogOnWishlist (dogLiked) {
    if(this.props.isAuthenticated){
      this.props.handleDogToWishList(dogLiked)
    } else {
      this.props.history.push('/auth')
    }
  }

  render() {
    const { isFetchingDogs } = this.props
    const { previewVisible, previewImage, dogsList } = this.state;
    const loadingIcon = <Icon type="loading" style={{ fontSize: 50, color: '#ee3923' }} spin />;

    return (
      <Layout style={{ background: 'white'}} >
        <GeneralHeader onSearchChanged={(text) => this._filterDogsList(text)}/>
        <Content style={{ padding: '50px' }}>
            {
              isFetchingDogs ? (
                <Row type="flex" justify="center" align="middle" gutter={16} style={{ marginTop: '15em' }}>
                  <Spin
                    size="large"
                    indicator={loadingIcon}
                  />
                </Row>
              ) : (
                  <Row type="flex" justify="start" gutter={16} style={{ marginTop: '2em' }}>
                    { 
                      dogsList.map((dog, index) => (
                        <DogCard
                          key={index}
                          dog={dog}
                          onClickDogCard={dog => this._handlePreview(dog.base64Image)}
                          onClickLikeButton={dog => this._handleDogOnWishlist(dog)}
                        /> 
                      ))
                    }
                  </Row>
                )
            }
        </Content>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this._handleCancelPreview}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  dogs: state.likeDogs.dogs,
  isFetchingDogs: state.likeDogs.isFetchingDogs,
  actionMessage: state.profileWishlist.actionMessage,
  isAuthenticated: state.authentication.isAuthenticated,
})

const mapDispatchToProps = {
  loadDogs: LikeDogsActions.loadDogs,
  handleDogToWishList: LikeDogsActions.handleDogToWishList,
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeDogs)
