import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components'


const EditDeleteButton = styled.h4`
color: #ffffff;
padding-top: 15px
text-decoration-line: underline;
display: inline;
margin: 0 7%;
&:hover {
  cursor: pointer;
}
`;

const ModalDiv = styled.div`
display: inline;
`;


class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: '',
    };
    this.toggle = this.toggle.bind(this);
  }

  delete = () => {
    console.log(`the id is ${this.props.id}`);
    
    axios
      .delete(`https://backendprojectserver.herokuapp.com/notes/${this.props.id}`)
      .then(response => {
        console.log(response);
        this.setState(
          {
            title: response.data.title,
            contents: response.data.contents
          },
        );
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
      this.toggle();
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <ModalDiv>
        <EditDeleteButton onClick={this.toggle}>delete</EditDeleteButton>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <div className=" text-center"> 
          <ModalBody>
          Are you sure you want to delete this?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" size="lg" className='ml-auto  '  onClick={this.delete}>Delete</Button>
            <Button color="info" size="lg" className='mr-auto '  onClick={this.toggle}>No</Button>
            
          </ModalFooter>
          </div>
        </Modal>
      </ModalDiv>
    );
  }
}

export default ModalExample;