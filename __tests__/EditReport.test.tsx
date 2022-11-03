/**
 * @format
 */

import React from 'react';
import { NativeBaseProvider } from 'native-base';
import renderer from 'react-test-renderer';
import EditReportScreen from '../src/screens/EditReport';
import 'moment/locale/fr';
import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';

jest.useFakeTimers();

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('EditReportScreen', () => {
  moment.locale("fr")
  describe("Snapshot", () => {
    let props: any = {
      navigation: {
        navigate: jest.fn()
      },
      route: {
        params: {
          reportDate: "2022-01-08"
        }
      }
    }

    const component = (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <EditReportScreen {...props}/>
        </NavigationContainer>
      </NativeBaseProvider>
    )

    it('rendering', () => {
      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    })
  })

});