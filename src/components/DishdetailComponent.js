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
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardImg src={dish.image} alt={dish.name}></CardImg>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </Card>
            </div>
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
              <p> -- {comment.author}, {new Intl.DateTimeFormat('en-us', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
            </li>
          );
        });

        return (
          <div className="col-12 col-md-5 m-1"> 
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
        <div className="container">
            <div className="row">          
                {this.renderDish(this.props.dish)}       
              
                {this.renderComments(this.props.dish)}
              
            </div>
        </div>
      );
    }  

     
}

export default DishDetail;