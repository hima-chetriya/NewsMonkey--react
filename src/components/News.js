import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

    constructor() {
        super()
        console.log("helllo i am constructor from news componet");
        this.state = {
            articles: [],
            loading: false

        }
    }
    
    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=add1a173661b4246b95ab0bfdb9462a0";
        let data = await fetch(url);
        let parsedata = await data.json()
        console.log(parsedata);
        this.setState({ articles: parsedata.articles })
    }
    render() {
        return (
            <div className='container my-3'>
                <h1>NewsMonkey - Top Headlines</h1>

                <div className='row my-3'>
                    {this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItem title={element.title?.slice(0, 45)}
                                description={element.description?.slice(0, 88)} imageURL={element.urlToImage} newsurl={element.url} />

                        </div>
                    })}

                </div>
            </div>
        )
    }
}
