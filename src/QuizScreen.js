import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import Button from './components/Button';

const Container = styled.View`
  flex: 1;
`;

const QuizCard = styled.View`
  margin: 10px;
  border: 2px gray;
  border-radius: 5px;
  padding: 10px;
`;

const QuestionText = styled.Text`
  font-size: 24;
  text-align: center;
`;

const ProgressText = styled.Text`
  font-size: 24;
  text-align: left;
  margin: 5px;
`;

class QuizScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item', null);
    const title = item ? `${item.title} Quiz` : 'Deck Details';
    return {
      title
    };
  };

  constructor(props) {
    super(props);

    const item = this.props.navigation.getParam('item', null);

    this.state = {
      complete: false,
      questions: {
        answered: [],
        unanswered: [...item.questions]
      },
      correct: 0,
      incorrect: 0,
      showFront: true
    };
  }

  handleToggleCard = () => {
    this.setState({ showFront: !this.state.showFront });
  };

  renderCardHelper = (item) => {
    if (this.state.showFront) {
      return <QuestionText>{item.question}</QuestionText>;
    }
    return <QuestionText>{item.answer}</QuestionText>;
  };

  renderProgressHelper = () => {
    const item = this.props.navigation.getParam('item', null);
    return (
      <ProgressText>
        {this.state.questions.answered.length + 1} / {item.questions.length}
      </ProgressText>
    );
  };

  getRandomQuestionHelper = () => {
    const length = this.state.questions.unanswered.length;
    const rand = Math.floor(Math.random() * length + 0);
    if (length > 0) {
      const question = this.state.questions.unanswered[rand];
      question['id'] = rand;
      return question;
    }
  };

  handleAnswer = (isCorrect, id) => {
    const unanswered = this.state.questions.unanswered;
    unanswered.splice(id, 1);
    this.setState({
      questions: {
        ...this.state.questions,
        unanswered,
        answered: [...this.state.questions.answered, id]
      },
      complete: unanswered.length === 0,
      correct: isCorrect ? this.state.correct + 1 : this.state.correct,
      incorrect: !isCorrect ? this.state.incorrect + 1 : this.state.incorrect,
      showFront: true
    });
  };

  handleBackToDeck = () => {
    this.props.navigation.goBack();
  };

  handleRestartQuiz = () => {
    const item = this.props.navigation.getParam('item', null);

    this.setState({
      complete: false,
      questions: {
        answered: [],
        unanswered: [...item.questions]
      },
      correct: 0,
      incorrect: 0,
      showFront: true
    });
  };

  render() {
    const item = this.getRandomQuestionHelper();
    if (!item && !this.state.complete) {
      return (
        <Container>
          <QuestionText>No Card!</QuestionText>
        </Container>
      );
    }

    return (
      <Container>
        {this.state.complete ? (
          <Container>
            <ProgressText>Results</ProgressText>
            <QuizCard>
              <ProgressText>Breakdown</ProgressText>
              <QuestionText>Correct: {this.state.correct}</QuestionText>
              <QuestionText>Incorrect: {this.state.incorrect}</QuestionText>
            </QuizCard>
            <QuizCard>
              <ProgressText>Summary</ProgressText>
              <QuestionText>
                {this.state.correct} {' / '}
                {this.state.correct + this.state.incorrect}
              </QuestionText>
              <QuestionText>
                Percent:
                {Math.floor(
                  (this.state.correct /
                    (this.state.correct + this.state.incorrect)) *
                    100
                )}{' '}
                %
              </QuestionText>
            </QuizCard>
            <Button onPress={() => this.handleBackToDeck()}>
              Back to Deck
            </Button>
            <Button onPress={() => this.handleRestartQuiz()}>
              Restart Quiz
            </Button>
          </Container>
        ) : (
          <Container>
            {this.renderProgressHelper()}
            <QuizCard>
              {this.renderCardHelper(item)}
              <Button onPress={this.handleToggleCard} secondary>
                {this.state.showFront ? 'Show Answer' : 'Show Question'}
              </Button>
            </QuizCard>
            <Button onPress={() => this.handleAnswer(true, item.id)}>
              Correct
            </Button>
            <Button onPress={() => this.handleAnswer(false, item.id)}>
              Incorrect
            </Button>
          </Container>
        )}
      </Container>
    );
  }
}

export default QuizScreen;
