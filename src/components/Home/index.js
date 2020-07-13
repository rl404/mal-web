import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { Container, Row, Col } from 'react-bootstrap';
import SeasonalList from './Seasonal';
import TopList from './TopList';
import { getCurrentSeason } from '../../utils/utils.js';
import { AnimeTopType } from '../../constant.js';
import News from './News';
import Article from './Article';
import Review from './Review';
import MiniHeader from '../Header/MiniHeader';
import Recommendation from './Recommendation';

const mapStateToProps = state => ({
  animeSeasonal: state.homeSeasonal,
  topAiring: state.homeTopAiring,
  topUpcoming: state.homeTopUpcoming,
  popular: state.homePopular,
  news: state.homeNews,
  article: state.homeArticle,
  review: state.homeReview,
  recommendation: state.homeRecommendation,
});

const mapDispatchToProps = dispatch => ({
  loadSeasonal: (payload) => dispatch({ type: 'HOME_SEASONAL', payload }),
  loadTopAiring: (payload) => dispatch({ type: 'HOME_TOP_AIRING', payload }),
  loadTopUpcoming: (payload) => dispatch({ type: 'HOME_TOP_UPCOMING', payload }),
  loadPopular: (payload) => dispatch({ type: 'HOME_POPULAR', payload }),
  loadNews: (payload) => dispatch({ type: 'HOME_NEWS', payload }),
  loadArticle: (payload) => dispatch({ type: 'HOME_ARTICLE', payload }),
  loadReview: (payload) => dispatch({ type: 'HOME_REVIEW', payload }),
  loadRecommendation: (payload) => dispatch({ type: 'HOME_RECOMMENDATION', payload }),
})

class Home extends React.Component {
  componentWillMount() {
    var year = new Date().getFullYear();
    var season = getCurrentSeason();
    this.props.loadSeasonal(agent.Seasonal.current(year, season));
    this.props.loadTopAiring(agent.Top.anime(AnimeTopType["airing"], 1));
    this.props.loadTopUpcoming(agent.Top.anime(AnimeTopType["upcoming"], 1));
    this.props.loadPopular(agent.Top.anime(AnimeTopType["popular"], 1));
    this.props.loadNews(agent.News.list("", ""));
    this.props.loadArticle(agent.Article.list("", ""));
    this.props.loadReview(agent.Review.list("anime", ""));
    this.props.loadRecommendation(agent.Recommendation.list("anime", ""));
  };

  render() {
    var topAiringData, topUpcomingData, popularData, newsData, articleData, reviewData, recommendationData
    if (this.props.topAiring) {
      topAiringData = this.props.topAiring.slice(0, 5)
    }
    if (this.props.topUpcoming) {
      topUpcomingData = this.props.topUpcoming.slice(0, 5)
    }
    if (this.props.popular) {
      popularData = this.props.popular.slice(0, 10)
    }
    if (this.props.news) {
      newsData = this.props.news.slice(0, 4)
    }
    if (this.props.article) {
      articleData = this.props.article.slice(0, 4)
    }
    if (this.props.review) {
      reviewData = this.props.review.slice(0, 4)
    }
    if (this.props.recommendation) {
      recommendationData = this.props.recommendation.slice(0, 4)
    }

    return (
      <div className="home-page">
        <MiniHeader title="Welcome to MyAnimeList.net!" />
        <Container className="border-side">
          <Row>
            <Col md={9} className="border-right">
              <SeasonalList data={this.props.animeSeasonal} />
              <News data={newsData} />
              <Article data={articleData} />
              <Review data={reviewData} />
              <Recommendation data={recommendationData} />
            </Col>
            <Col md={3}>
              <TopList title="Top Airing Anime" data={topAiringData} />
              <TopList title="Top Upcoming Anime" data={topUpcomingData} />
              <TopList title="Most Popular Anime" data={popularData} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);