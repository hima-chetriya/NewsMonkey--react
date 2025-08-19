import React, { Component } from 'react'
export default class NewsItem extends Component {
  
  render() {
   let {title, description, imageURL, newsurl} = this.props;
        return (
        <div className='my-3'>
            <div className="card" style={{width: "18rem"}}>
                <img src={!imageURL?"https://media.cnn.com/api/v1/images/stellar/prod/download-20250818065358299.png?c=16x9&q=w_800,c_fill":imageURL} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsurl} target='_blank'  className="btn btn-sm btn-primary">Read More</a>
                    </div>
            </div>
    
      </div>
    )
  }
}
