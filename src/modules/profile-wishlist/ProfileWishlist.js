import React, { PureComponent } from 'react';
import { Row, Spin, Icon, Layout,  Col, Button, Modal, message} from 'antd';
import * as ProfileWishlistActions from './ProfileWishlistActions'
import { connect } from 'react-redux'
import GeneralHeader from '../../components/GeneralHeader'
import DogCard from '../../components/DogCard'
import AddDogModal from './components/AddDogModal'

const { Content } = Layout;

class ProfileWishlist extends PureComponent {
  state = {
    showAddPhotoModalState: false,
    previewVisible: false,
    previewImage: "",
    dogsList: this.props.dogs || []
  };

  componentWillMount() {
    this.props.loadMyDogsWishlist();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isSendingDog){
      this.setState({
        showAddPhotoModalState: false
      })
    }
    if (nextProps.myDogsWishlist !== this.state.dogsList) {
      this.setState({
        dogsList: nextProps.myDogsWishlist
      })
    }

    if (nextProps.actionMessage !== null && nextProps.actionMessage !== this.props.actionMessage){
      this._showMessageAfterAction(nextProps.actionMessage)
    }
  }

  _handlePreview = img => {
    this.setState({
      previewImage: img,
      previewVisible: true
    });
  };

  _handleCancelPreview = () => this.setState({ previewVisible: false });

  _textIsPresentOnUsername(textSearched, dogName) {
    if (textSearched === '')
      return true

    return dogName.includes(textSearched)
  }

  _filterDogsList = textSearched => {
    const { myDogsWishlist } = this.props
    const dogsFiltered = myDogsWishlist.filter(dog => this._textIsPresentOnUsername(textSearched.toLowerCase(), dog.name.toLowerCase()))
    this.setState({
      dogsList: dogsFiltered
    })
  }

  _handleDogOnWishlist(dogLiked) {
    if (this.props.isAuthenticated) {
      this.props.handleDogToWishListOnProfile(dogLiked)
    } else {
      this.props.history.push('/auth')
    }
  }

  _showMessageAfterAction(actionMessage){
    const { type, text} = actionMessage

    const action = {
      'success': () => message.success(text),
      'error': () => message.success(text)
    }

    action[type]()
  }

  render() {
    const { isFetchingDogs, loggedUser, myDogsWishlist } = this.props;
    const { previewVisible, previewImage, dogsList } = this.state;
    const loadingIcon = (
      <Icon type="loading" style={{ fontSize: 50, color: "#ee3923" }} spin />
    );

    if (isFetchingDogs) {
      return (
        <Row
          type="flex"
          justify="center"
          align="middle"
          gutter={16}
          style={{ marginTop: "15em" }}
        >
          <Spin size="large" indicator={loadingIcon} />
        </Row>
      );
    }

    return (
      <Layout style={{ background: "white" }}>
        <GeneralHeader onSearchChanged={(text) => this._filterDogsList(text)}/>
        <Content style={{ padding: "50px" }}>
          <AddDogModal
            visible={this.state.showAddPhotoModalState}
            handleOk={() => this.setState({ showAddPhotoModalState: false })}
            handleCancel={() =>
              this.setState({
                showAddPhotoModalState: false
              })}
          />
          <Row type="flex" justify="center">
            <Col align="middle">
              <h1 style={{ fontWeight: "bold" }}> { loggedUser ? loggedUser.username : null }</h1>
              <h2 style={styles.subTitleStyle}>{myDogsWishlist.length} Images on Your Dog Wishlist</h2>
              <Button
                type="primary"
                style={{ backgroundColor: '#FFB427', borderColor: '#FFB427'}}
                onClick={() =>
                  this.setState({
                    showAddPhotoModalState: true
                  })}
              >
                ADD DOG
              </Button>
            </Col>
          </Row>
          <Row
            type="flex"
            justify="start"
            gutter={16}
            style={{ marginTop: "3em" }}
          >
            {dogsList.map((dog, index) => (
              <DogCard
                key={index}
                dog={dog}
                style={{ marginBottom: "2em" }}
                onClickDogCard={dog => this._handlePreview(dog.base64Image)}
                onClickLikeButton={dog => this._handleDogOnWishlist(dog)}
              />
            ))}
          </Row>
        </Content>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this._handleCancelPreview}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Layout>
    );
  }
}

const styles = {
  subTitleStyle: {
    color: '#CCC',
    marginBottom: '1em'
  },
}

const mapStateToProps = (state) => ({
  myDogsWishlist: state.profileWishlist.myDogsWishlist,
  isFetchingMyDogsWishlist: state.profileWishlist.isFetchingMyDogsWishlist,
  isSendingDog: state.profileWishlist.isSendingDog,
  actionMessage: state.profileWishlist.actionMessage,
  loggedUser: state.authentication.loggedUser,
  isAuthenticated: state.authentication.isAuthenticated,
})

const mapDispatchToProps = {
  loadMyDogsWishlist: ProfileWishlistActions.loadMyDogsWishlist,
  handleDogToWishListOnProfile: ProfileWishlistActions.handleDogToWishListOnProfile,
  showActionMessage: ProfileWishlistActions.showActionMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWishlist)
