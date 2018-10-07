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
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Article from 'grommet/components/Article';

import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPapers } from '../../actions/papers';

class Papers extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadPapers());
  }

  render() {
    const values = this.props.papers.map((paper, index) =>
    {
      return (
        <AccordionPanel key={index} heading={paper.title}>
          <Box direction='row' justify='end' full='horizontal'>
            <Button label='Open' href={`/papers/${paper.address}`} />
          </Box>
          <Paragraph>
            {paper.description}
          </Paragraph>
        </AccordionPanel>
      );
    });

    return (
      <Article primary={true}>
        <Header>
          <Title>
            Papers
          </Title>
          <Box flex={true} justify='end' direction='row' responsive={false}>
            <Button label='Create' href='/papers/new' />
          </Box>
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

const mapStateToProps = (state) => {
  return {
    papers: state.papers
  };
};

export default connect(mapStateToProps)(Papers);
