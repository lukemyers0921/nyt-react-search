import React, { Component } from "react";
import API from "./utils/API";
import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer"
import Card from "./components/Card"
import Input from "./components/Input";
import Button from "./components/Button";
import Article from "./components/Article";
import axios from "axios";

class App extends Component {

  state = {
    searchArticles: [],
    savedArticles: [],
    warning: "",
    topic: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ savedArticles: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = (event,id) => {
    event.preventDefault();
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

 saveArticle = (event,article) => {
  event.preventDefault();
  console.log(article);
    API.saveArticle({
      title: article.headline.main,
      url: article.web_url,
      date: article.pub_date
    })
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  
  handleTopicChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if(this.state.warning !== "") {
      this.setState({warning: ""})
    }
  }
  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    if(this.state.topic === ""){
      this.setState({warning:"This field is requried!"})
    } else {
      let url = "&q=" + this.state.topic.trim()
      let startYear = this.state.startYear.trim()
      let endYear = this.state.endYear.trim()
      if (parseInt(startYear)) {
        url += "&begin_date=" + startYear + "0101";
      }
      if (parseInt(endYear)) {
        url += "&end_date=" + startYear + "0101";
      }
      axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931${url}`)
      .then(res => {
        const articles = res.data.response.docs;
        this.setState({searchArticles:articles})
      })
    }
    
  };

  render() {
    return (
    <div>
    <Jumbotron />
    <Card
      title = "Search"  
      body = {[
        <Input 
            text = "Topic:"
            warning = {this.state.warning} 
            id = "topic" 
            key = "topic" 
            name="topic"
            value={this.state.topic}
            onChange={this.handleTopicChange}
          />,
        
        <Input 
            text = "Start Year:" 
            id = "startYear" 
            key = "startYear"
            name="startYear"
            value={this.state.startYear}
            onChange={this.handleInputChange}
        />,
        <Input 
            text = "End Year:" 
            id = "endYear" 
            key = "endYear"
            name="endYear"
            value={this.state.endYear}
            onChange={this.handleInputChange}
          />,
        <Button 
            onClick = {this.handleFormSubmit} 
            className = "btn btn-outline-dark center" 
            children = "Search" 
            key = "btn" 
          />,
        ]}
        />
        <Card 
          title = "Results"
          body = {this.state.searchArticles.map(article => (
            <Article 
            key = {article._id} 
            title = {article.headline.main} 
            url = {article.web_url} 
            date = {article.pub_date} 
            header = 
              {<Button 
                onClick = {(event) => {this.saveArticle(event, article)}}               
                className = "btn btn-outline-primary float-right" 
                children = "Save Article" 
                />}
            />
            ))}
          />
        <Card 
          title = "Saved Articles"
          body = {this.state.savedArticles.map(article => (
            <Article 
            key = {article.id} 
            title = {article.title} 
            url = {article.url} 
            date = {article.date} 
            header = 
              {<Button 
                onClick = {(event) => {this.deleteArticle(event, article._id)}} 
                className = "btn btn-outline-danger float-right" 
                children = "Delete Article"
                key = {article.id}
                />}
            />
            ))}
          />
        <Footer />
        </div>
        )
}
}
export default App;
