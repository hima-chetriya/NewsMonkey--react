import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        general: PropTypes.string,
        category: PropTypes.string,
    }


    constructor() {
        super()
        console.log("helllo i am constructor from news componet");
        this.state = {
            page: 1,
            articles: [],
            loading: false

        }
    }



    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=add1a173661b4246b95ab0bfdb9462a0&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);

        let parsedata = await data.json()
        this.setState({ loading: false });
        console.log(parsedata);

        this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: false
        })
    }
    handlePrevClick = async () => {
        console.log("Previous Click");

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=add1a173661b4246b95ab0bfdb9462a0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);

        let parsedata = await data.json()
        this.setState({ loading: false });
        this.setState({
            page: this.state.page - 1,
            articles: parsedata.articles,
            loading: false
        })


    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=add1a173661b4246b95ab0bfdb9462a0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });

            let data = await fetch(url);
            let parsedata = await data.json();

            this.setState({
                page: this.state.page + 1,
                articles: parsedata.articles,
                loading: false
            });
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>

                {this.state.loading && <Spinner />}

                <div className='row my-3'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?.slice(0, 45)}
                                description={element.description?.slice(0, 88)} imageURL={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}

                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
