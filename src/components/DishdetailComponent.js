import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Row, Col, Label, Button } from 'reactstrap';
import { Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
    
    function RenderDish({dish}) {        
          return (
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardImg top src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
            </div>
          );
    }    

    function RenderComments({comments}) {
      if (comments != null) {
        const comnt = comments.map((comment) => {
           
          return(              
          
            <li key={comment.id}>
              <p>{comment.comment} </p>
              <p> -- {comment.author}, {new Intl.DateTimeFormat('en-us', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
            </li>
          );
        });

        return (
          <div className="col-12 col-md-5 m-1"> 
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {comnt}
              <CommentForm />
            </ul>
          </div>
        );
      }

        else 
          return (
            <div></div>
          );
    }  
    
    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.state= {
              isModalOpen: false

            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

        }

      toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
      }

      handleSubmit(values) {
        alert("Current State is: " + JSON.stringify(values));
        this.toggleModal();
      }

      render() {
        return (
          <div>
            <Button outline onClick={this.toggleModal}> <span className="fa fa-pencil fa-lg"></span> Submit Comment </Button>         
          
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Comment Form </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group" md={2}>
                <Label htmlFor="rating" md={12}>Rating</Label>
                <Col md={8}>
                    <Control.select model =".rating" id="rating" name="rating" className="form-control" md={4}> 
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                      <option> 4 </option>
                      <option> 5 </option>
                    </Control.select>      
                  </Col> 
              </Row>
              <Row className="form-group">
                <Label htmlFor="yourname" md={12}>Your name</Label>
                <Col md={8}>
                  <Control.text model =".yourname" id="yourname" name="yourname" className="form-control" md={4}
                  validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                  }}
                  />  
                  <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}                            
                                    
                                    />
                 </Col>              

              </Row>

              <Row className="form-group">
                <Label htmlFor="comments" md={12}>Comments</Label>
                <Col md={12}>
                  <Control.textarea model =".comments" id="comments" name="comments" className="form-control" rows="6" />  
                </Col> 
              </Row>

              <Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">Submit</Button> 
                                </Col>
                            </Row>

            </LocalForm>

          </ModalBody>
        </Modal>
        </div>

        )};        

    }
      
    
    const DishDetail = (props) => {
      if (props.dish != null)
        return (
          <div className="container">
            <div className="row">
                      <Breadcrumb>                        
                          <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                      </Breadcrumb>
                      <div className="col-12">
                          <h3>{props.dish.name}</h3>
                          <hr />
                      </div>
              </div>
              <div className="row">          
                  <RenderDish dish={props.dish} />               
                  <RenderComments comments={props.comments} />
                                
              </div>
          </div>
      );
    }  

     


export default DishDetail;