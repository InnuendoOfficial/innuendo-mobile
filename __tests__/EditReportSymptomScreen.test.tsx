import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditReportSymptomScreen from '../src/screens/EditReportSymptom';
import { StackParamList } from '../src/navigation/types';
type NavigationScreenPropAlias = NavigationScreenProp<{}>;

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
const Stack = createNativeStackNavigator<StackParamList>();

describe("EditReportSymptomScreen", () => {
  it('renders screen with data from API', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity
        }
      }
    })
    const tree = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="EditReportSymptom"
                component={EditReportSymptomScreen}
                initialParams={{ symptomName: "douleur menstruelle"}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </NativeBaseProvider>
    );

    await waitFor(() => expect(tree.getByLabelText("loading")).toBeDefined());
    await waitFor(() => expect(tree.getByText("douleur menstruelle")).toBeDefined());
    expect(tree.getByText("Valider")).toBeDefined()
    // expect(tree).toMatchSnapshot()
  });

  it('goes back when the "Go Back" button is pressed', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity
        }
      }
    })

    const tree = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="EditReportSymptom"
                component={EditReportSymptomScreen}
                initialParams={{
                  symptomName: "douleur menstruelle",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </NativeBaseProvider>
    );

    const goBackButton = tree.getByText("Valider")
    expect(goBackButton).toBeDefined()
    fireEvent.press(goBackButton)
    // expect(goBackButton).toThrowError()
  });
})