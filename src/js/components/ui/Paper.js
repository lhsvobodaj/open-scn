/**
 * Copyright (2018) Luiz Hermes Svoboda Junior
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

import React from 'react';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import TextInput from 'grommet/components/TextInput';
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Title from 'grommet/components/Title';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Component } from 'react';

import { loadPaper, onChangePaper, savePaper } from '../../actions/paper';

class Paper extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { address } = this.props.match.params;

    this.props.dispatch(loadPaper(address));
  }

  handleChange(event) {
    const field = event.target.id;
    const content = event.target.value;

    this.props.dispatch(onChangePaper(field, content));

    this.forceUpdate();
  }

  onSubmit() {
    this.props.dispatch(
      savePaper(this.props.session.token, this.props.paper));
  }

  render() {
    let paper = this.props.paper;

    return (
      <Article>
        <Header>
          <Title>
            {(paper.address) ? 'Id: ' + paper.address : 'New Paper'}
          </Title>
        </Header>
        <Section>
          <hr/>
          <Label align='start'>Title (required):</Label>
          <TextInput id='title'
            value={paper.title}
            onDOMChange={this.handleChange} />

          <Label align='start'>Description (required):</Label>
          <TextInput id='description'
            value={paper.description}
            onDOMChange={this.handleChange} />

          <Label align='start'>Abstract</Label>
          <textarea rows='5' type='text' id='abstract'
            value={paper.abstract}
            onChange={this.handleChange} />

          <Label align='start'>Content</Label>
          <textarea rows='10' type='text' id='content'
            value={paper.content}
            onChange={this.handleChange} />
        </Section>
        <Footer>
          <Box align='end' full='horizontal' justify='end' alignContent='end' direction='row'>
            <Button label='Submit' type='submit' onClick={this.onSubmit}/>
          </Box>
        </Footer>
      </Article>
    );
  }
}

Paper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  session: PropTypes.object,
  paper: PropTypes.object,
  error: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    session: state.session,
    paper: state.paper,
    error: state.error
  };
};

export default connect(mapStateToProps)(Paper);
