import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomeView from "./containers/HomeView";
import DetailView from "./containers/DetailView";
import {
    expect
} from 'chai';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( < App / > , div);
    ReactDOM.unmountComponentAtNode(div);
});

it('the home page renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render( < HomeView / > , div);
    ReactDOM.unmountComponentAtNode(div);
})

it('the detail page renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render( < DetailView / > , div);
    ReactDOM.unmountComponentAtNode(div);
})

it('the detail page checks the slug info on component mount', () => {
    let detail = new DetailView()
    detail.props = {
        location: {
            pathname: "blah"
        }
    }
    detail.componentDidMount();
})

it('the home page sets the default filters to articles', () => {
    let home = new HomeView();
    home.componentDidMount();
    expect(home.state.contentType).to.equal('articles');

})

it('the columns in the table are rendered properly', () => {
    let home = new HomeView();
    expect(home.columns.length).to.equal(3);
})

it('the posts are populated on component mount', () => {
    let home = new HomeView();
    expect(home.getAbridgedPosts()).to.not.be.undefined;
    expect(home.getContentType()).to.not.be.undefined;
})