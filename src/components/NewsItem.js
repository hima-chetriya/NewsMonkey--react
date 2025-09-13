import React, { Component } from 'react'
export default class NewsItem extends Component {
  
  render() {
   let {title, description, imageURL, newsurl,author,date,source} = this.props;
        return (
        <div className='my-3'>
            <div className="card">
              <div style={{
                display : 'flex',
                position: 'absolute',
                justifyContent: 'flex-end',
                right: '0'}}>
                <span className=" badge rounded-pill bg-danger" style={{left:400,zIndex:1}}>
                          {source}</span>

              </div>
              
                <img src={!imageURL?"https://media.cnn.com/api/v1/images/stellar/prod/download-20250818065358299.png?c=16x9&q=w_800,c_fill":imageURL} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{description}</p>
                        <div className="card-footer text-body-secondary">By {!author?'Unknown':author} on {new Date(date).toGMTString()} ago</div>
                        <a href={newsurl} target='_blank'  className="btn btn-sm btn-primary">Read More</a>
                    </div>
            </div>
    
      </div>
    )
  }
}
