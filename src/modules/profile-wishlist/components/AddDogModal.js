import React, { PureComponent } from 'react';
import { Upload, Icon, Modal, Button, Row, Col, Form, Select, Input } from 'antd';
import { connect } from 'react-redux'
import * as ProfileWishlistActions from '../ProfileWishlistActions'
import moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;

class AddDogModal extends PureComponent {
  state = { 
    uploading: false, 
    currentImageToSend: '',
    confirmUploaded: false,
    photosDate: moment.utc(new Date()).format("L")
  }

  _convertToBase64(file, onLoadCallback) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = onLoadCallback;
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  _onBeforeUpload(file) {
    this._convertToBase64(file, (e) => {
      this._updateDogImage(e.target.result, file)
    })
    return false;
  }

  _onRemoveImage() {
    this.setState({ currentImageToSend: ''});
  }

  _updateDogImage(base64Image, file) {
    // console.log(base64Image)
    this.setState({ currentImageToSend: base64Image });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields( async (err, values) => {
      if (!err) {

        const { currentImageToSend } = this.state
        const { name, genre } = values
        const newDog = {
          base64Image: currentImageToSend,       
          genre,
          name  
        }

        this.props.sendDog(newDog)
      }
    });
  }

  _handleResetFields = () => {
    this.props.form.resetFields();
    this.setState({ currentImageToSend: '' });
  }

  render() {
    const { currentImageToSend } = this.state;
    const { isSendingDog } = this.props
    const { getFieldDecorator } = this.props.form;

    const uploadButton = (
      <div >
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginRight: '4em' }}>
        <Modal
          title="Add Dog"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.props.handleCancel}
          width={600}
          afterClose={() => this._handleResetFields()}
          maskClosable={false}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Cancelar
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              loading={isSendingDog} 
              onClick={this.handleSubmit} 
              htmlType="submit"
              style={{ backgroundColor: '#FFB427', borderColor: '#FFB427' }}
            >
              {isSendingDog ? 'Enviando' : 'Enviar'}
            </Button>,
          ]}
        >
            <Row type="flex" justify="start" style={{ marginTop: 5, marginBottom: 20 }}>
              <Col span={18} >
                  <FormItem
                    label="Dog Name"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                  >
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Please input dog name !' }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    label="Dog Genre"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                  >
                    {getFieldDecorator('genre', {
                      rules: [{ required: true, message: 'Please select dog genre!' }],
                    })(
                      <Select
                        placeholder="Select a option and change input text above"
                        style={{ width: '99%' }}
                      >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                      </Select>
                    )}
                  </FormItem>
              </Col>
              <Col span={6} >
              <FormItem
                >
                  {getFieldDecorator('image', {
                    valuePropName: 'currentImageToSend',
                    getValueFromEvent: this.normFile,
                    rules: [{ required: true, message: 'Please select dog photo!' }],
                  })(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={(file) => this._onBeforeUpload(file)}
                    onRemove={(file) => this._onRemoveImage(file)}
                    action="//jsonplaceholder.typicode.com/posts/">
                      {currentImageToSend ? <img src={currentImageToSend} style={{ width: '10em', height: '10em'}} /> : uploadButton}
                    </Upload>
                  )}
                </FormItem>
              </Col>
            </Row>
        </Modal>
      </Form>
    )
  }

}

const mapStateToProps = (state) => ({
  isSendingDog: state.profileWishlist.isSendingDog,
})

const mapDispatchToProps = {
  sendDog: ProfileWishlistActions.sendDog,
}


const AddDogModalWrapped = Form.create()(AddDogModal);

export default connect(mapStateToProps, mapDispatchToProps)(AddDogModalWrapped)