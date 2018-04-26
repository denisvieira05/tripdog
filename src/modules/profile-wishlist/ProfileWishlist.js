import React, { PureComponent } from 'react';
import { Row, Spin, Icon, Layout,  Col, Button, Modal} from 'antd';
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

  async componentWillMount() {
    this.props.loadMyDogsWishlist();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isSendingDog){
      this.setState({
        showAddPhotoModalState: false
      })
    }
    if (nextProps.myDogsWishlist != this.state.dogsList) {
      this.setState({
        dogsList: nextProps.myDogsWishlist
      })
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
              <h2>{myDogsWishlist.length} Total Dog Images</h2>
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


const mapStateToProps = (state) => ({
  myDogsWishlist: state.profileWishlist.myDogsWishlist,
  isFetchingMyDogsWishlist: state.profileWishlist.isFetchingMyDogsWishlist,
  isSendingDog: state.profileWishlist.isSendingDog,
  loggedUser: state.authentication.loggedUser,
})

const mapDispatchToProps = {
  loadMyDogsWishlist: ProfileWishlistActions.loadMyDogsWishlist,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWishlist)
