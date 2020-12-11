import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props); 
        this.state = {

        }                      

    }

    renderDish(dish) {
        if(dish != null) {
          return (
            <Card>
              <CardImg src={dish.image} alt={dish.name}></CardImg>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </Card>
          );
        }
    
        else {
          return (
            <div></div>
          );
        }
    }

    renderComments(dish) {
      if (dish != null && dish.comments != null) {
        const comnt = dish.comments.map((comment) => 
        {   
          return(              
          
            <li key={comment.id}>
              <p>{comment.comment} </p>
              <p> -- {comment.author}, {comment.date} </p>
            </li>
          );
        });

        return (
          <div> 
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {comnt}
            </ul>
          </div>
        );
      }

        else {
          return (
            <div></div>
          );
        }           
        
      
    }
    

    render() {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>          
        
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish)}
          </div>
        </div>
      );
    }  

     
}

export default DishDetail;