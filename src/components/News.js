import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


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
 capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            articles: [],
            loading: false

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=add1a173661b4246b95ab0bfdb9462a0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedata = await data.json()
        this.props.setProgress(70);
        this.setState({ loading: false });

        this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: false,
            totalResults : 0,
        })
           this.props.setProgress(100);
    }

    async componentDidMount() {

        this.updateNews()
    }
    fetchMoreData = async() => {
     this.setState({ page: this.state.page + 1 })
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=add1a173661b4246b95ab0bfdb9462a0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);

        let parsedata = await data.json()
        this.setState({ loading: false });

        this.setState({
            articles: this.state.articles.concat( parsedata.articles),
            totalResults: parsedata.totalResults,
            // loading: false,
            totalResults : 0,
        })
           
    };

    // handlePrevClick = async () => {

    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews()


    // }
    // handleNextClick = async () => {

    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews()
    // }

    render() {
        return (
            <>
                <h1 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={ this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <Spinner />}
                >
                    <div className='container'>
                        <div className='row my-3'>
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title?.slice(0, 45)}
                                        description={element.description?.slice(0, 88)} imageURL={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}
