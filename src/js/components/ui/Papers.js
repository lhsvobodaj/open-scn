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

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Article from 'grommet/components/Article';

import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';

import { loadPapers } from '../../actions/papers';

export default class Papers extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadPapers());
  }

  render() {
    const values = this.props.papers.map((paper, index) => (
      <AccordionPanel key={index} heading={paper.title}>
        <Paragraph>{paper.abstract}</Paragraph>
      </AccordionPanel>
    ));

    return (
      <Article primary={true}>
        <Header direction='row' size='large' justify='between'>
          <Heading>Papers</Heading>
        </Header>
        <Accordion>
          {values}
        </Accordion>
      </Article>
    );
  }
}

Papers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  papers: PropTypes.arrayOf(PropTypes.object)
};