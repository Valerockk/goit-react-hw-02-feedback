import React, { Component } from "react";
import Section from "./Sections/Sections";
import FeedBackOptions from "./FeedbackOptions/FeedbackOptions";
import Statistics from "./Statistics/Statistics";

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countPositiveFeedbackPercentage = (total) => {
    const { good } = this.state;

    return ((good * 100) / total).toFixed(0);
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;

    return good + neutral + bad;
  };

  handleChange = (e) => {
    const { name } = e.target;
    this.setState({
      [name]: (this.state[name] += 1),
    });
    this.countTotalFeedback();
    this.countPositiveFeedbackPercentage();
  };

  render() {
    const { good, neutral, bad } = this.state;

    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage(total);

    return (
      <div>
        <Section title={"Please leave feedback"}>
          <FeedBackOptions
            options={this.state}
            onLeaveFeedback={this.handleChange}
          />

          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      </div>
    );
  }
}
