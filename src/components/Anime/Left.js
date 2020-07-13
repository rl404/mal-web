import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Image, Col } from 'react-bootstrap';
import { parseTime } from '../../utils/utils';

export default class Left extends React.Component {
  render() {
    var data = this.props.data
    if (!data) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div id="anime-left">
        <Row>
          <Col>
            <Image src={data.cover} alt={data.title} className="img-border img-cover" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <div className="hover-primary add-to-list">
              <Link to="">Add to My List</Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="hover-primary add-to-list">
              <Link to="">Add to Favorites</Link>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <h2 className="title-border">Alternative Titles</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {altTitle("English", data.alternativeTitles.english)}
            {altTitle("Synonyms", data.alternativeTitles.synonym)}
            {altTitle("Japanese", data.alternativeTitles.japanese)}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <h2 className="title-border">Information</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {animeType(data.type)}
            {commonCategory("Episodes", data.episode)}
            {commonCategory("Status", data.status)}
            {aired(data)}
            {premiered(data)}
            {broadcast(data)}
            {producer("Producers", data.producers)}
            {producer("Licensors", data.licensors)}
            {producer("Studios", data.studios)}
            {commonCategory("Source", data.source)}
            {genre(data.genres)}
            {commonCategory("Duration", data.duration)}
            {commonCategory("Rating", data.rating)}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <h2 className="title-border">Statistics</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {stats("Score", data.score, false, data.voter)}
            {stats("Ranked", data.rank, true)}
            {stats("Popularity", data.popularity, true)}
            {stats("Members", data.member)}
            {stats("Favorites", data.favorite)}
          </Col>
        </Row>
      </div>
    )
  }
}

const animeType = (data) => {
  if (data === "") {
    data = "?"
  } else {
    data = <Link to="">{data}</Link>
  }

  return (
    <p className="category-detail">
      <span className="category-name">Type: </span>
      <span className="category-value">{data}</span>
    </p>
  )
}

const commonCategory = (type, data) => {
  if (data === "" || data === 0) {
    data = "?"
  }

  return (
    <p className="category-detail">
      <span className="category-name">{type}: </span>
      <span className="category-value">{data}</span>
    </p>
  );
}

const altTitle = (type, title) => {
  if (title !== "") {
    return (
      <p className="category-detail">
        <span className="category-name">{type}: </span>
        <span className="category-value">{title}</span>
      </p>
    );
  }
  return;
}

const aired = (data) => {
  var start = parseTime(data.startDate.start, "MMM D, YYYY")
  var end = parseTime(data.startDate.end, "MMM D, YYYY")
  var range = ""

  if (start === "" && end === "") {
    range = "?"
  }

  if (data.episode !== 1 && end === "") {
    end = "?"
  }

  if (end !== "") {
    range = start + " to " + end
  } else {
    range = start
  }

  return (
    <p className="category-detail">
      <span className="category-name">Aired: </span>
      <span className="category-value">{range}</span>
    </p>
  )
}

const premiered = (data) => {
  if (data.type !== "TV") {
    return
  }

  var premiered
  if (data.premiered === "") {
    premiered = "?"
  } else {
    premiered = (
      <Link to="">{data.premiered}</Link>
    )
  }

  return (
    <p className="category-detail">
      <span className="category-name">Premiered: </span>
      <span className="category-value">{premiered}</span>
    </p>
  )
}

const broadcast = (data) => {
  if (data.type !== "TV") {
    return
  }

  if (data.broadcast === "") {
    data.broadcast = "?"
  }

  return (
    <p className="category-detail">
      <span className="category-name">Broadcast: </span>
      <span className="category-value">{data.broadcast}</span>
    </p>
  )
}

const producer = (type, data) => {
  var producer
  if (!data || data.length === 0) {
    producer = "?"
  } else {
    producer = data
      .map((p) => <Link to="" key={p.id}>{p.name}</Link>)
      .reduce((prev, curr) => [prev, ", ", curr]);
  }

  return (
    <p className="category-detail">
      <span className="category-name">{type}: </span>
      <span className="category-value">{producer}</span>
    </p>
  )
}

const genre = (data) => {
  var genre
  if (!data || data.length === 0) {
    genre = "?"
  } else {
    genre = data
      .map((p) => <Link to="" key={p.id}>{p.name}</Link>)
      .reduce((prev, curr) => [prev, ", ", curr]);
  }

  return (
    <p className="category-detail">
      <span className="category-name">Genres: </span>
      <span className="category-value">{genre}</span>
    </p>
  )
}

const stats = (type, data, isRank, voter) => {
  data = data.toLocaleString()

  if (isRank) {
    data = "#" + data
  }

  if (voter && voter !== 0) {
    data = data + " (scored by " + voter.toLocaleString() + " users)"
  }

  return (
    <p className="category-detail">
      <span className="category-name">{type}: </span>
      <span className="category-value">{data}</span>
    </p>
  );
}