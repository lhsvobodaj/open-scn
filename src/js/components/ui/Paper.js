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

import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';

import React from 'react';
import { Component } from 'react';

export default class Paper extends Component {

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    alert('Submit button pressed!');
  }

  render() {
    return (
      <Form compact={false} pad={{horizontal: 'small'}} >
        <Header>
          <Title>
            New Paper
          </Title>
        </Header>
        <FormFields>
          <FormField label='Title'>
            <TextInput  />
          </FormField>
          <FormField label='Abstract'>
            <TextInput />
          </FormField>
        </FormFields>
        <Footer pad={ {'vertical': 'medium'} }>
          <Button label='Submit' type='submit' primary={true} onClick={this._onClick} />
        </Footer>
      </Form>
    );
  }
}
