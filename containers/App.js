import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import Footer from '../components/Footer';
import * as PlayerActions from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  render() {
    const { actions, players } = this.props;
    const { selected } = this.state;

    return (
      <div>
        <header>
          <h1>Leaderboard</h1>
        </header>

        <Main
          players={players}
          onPlayerClick={player => {
            this.setState({ selected: player });
          }}
        />

        <Footer
          selected={selected}
          onAddPoints={id => {
            actions.addPoints(id);
          }}
        />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { players } = state
  return {
    players
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(PlayerActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
