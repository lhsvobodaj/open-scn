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

import { newPaper, loadPaper } from '../../actions/paper';

class Paper extends Component {

  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this._handleFieldChange = this._handleFieldChange.bind(this);

    this._paper = {};
  }

  componentDidMount() {
    const { address } = this.props.match.params;

    if (address === 'new') {
      this.props.dispatch(newPaper());
    } else {
      this.props.dispatch(loadPaper(address));
    }
  }

  _handleFieldChange(event) {
    this._paper[event.target.id] = event.target.value;
  }

  _onSubmit() {
    console.log(this._paper);
  }

  render() {
    let title = this.props.paper.title || '';
    let description = this.props.paper.description || '';
    let address = this.props.paper.address;
    let header = (title && description) ? address : 'New Paper';

    return (
      <Article>
        <Header>
          <Title>
            {header}
          </Title>
        </Header>
        <Section>
          <hr/>
          <Label align='start'>Title:</Label>
          <TextInput id='title' onDOMChange={this._handleFieldChange} />

          <Label align='start'>Description:</Label>
          <TextInput id='description' onDOMChange={this._handleFieldChange} />

          <Label align='start'>Abstract</Label>
          <textarea rows='5' type='text' id='abstract' onChange={this._handleFieldChange} />

          <Label align='start'>Content</Label>
          <textarea rows='10' type='text' id='content' onChange={this._handleFieldChange} />
        </Section>
        <Footer>
          <Box align='end' full='horizontal' justify='end' alignContent='end' direction='row'>
            <Button label='Submit' type='submit' onClick={this._onSubmit} />
          </Box>
        </Footer>
      </Article>
    );
  }
}

Paper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  paper: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    paper: state.paper
  };
};

export default connect(mapStateToProps)(Paper);
