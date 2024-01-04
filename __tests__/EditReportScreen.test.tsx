import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from '../src/navigation/types';
import axiosAPI from "../src/api/config"
import mockSymptomTypes from "../src/mock/symptom_types"
import useEditedReportStore from '../src/store/useEditedReport';
import EditReportScreen from '../src/screens/EditReport';

jest.mock("../src/api/config", () => ({
  __esModule: true,
  default: {
    request: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}))

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
const Stack = createNativeStackNavigator<StackParamList>();

describe("EditReportScreen", () => {
  it('renders screen with data from API', async () => {
    const { report, editReport } = useEditedReportStore.getState()
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity
        }
      }
    });
    (axiosAPI.request as jest.MockedFunction<typeof axiosAPI.request>)
      .mockResolvedValue({ data: mockSymptomTypes });
    editReport({ ...report, date: new Date().toISOString() })

    const tree = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="EditReport"
                component={EditReportScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </NativeBaseProvider>
    );

    await waitFor(() => expect(tree.getByLabelText("loading")).toBeDefined());
    await waitFor(() => expect(tree.getByText("Confirmer le rapport")).toBeDefined());
    const validateButton = tree.getByText("Confirmer le rapport")
    expect(validateButton).toBeDefined();
    (axiosAPI.request as jest.MockedFunction<typeof axiosAPI.request>)
      .mockRejectedValue({ error: "Given error" })
    fireEvent.press(validateButton);

    expect(tree).toMatchSnapshot()
  });

  // it('goes back when the "Go Back" button is pressed', () => {
  //   const queryClient = new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         retry: false,
  //         cacheTime: Infinity
  //       }
  //     }
  //   })

  //   const tree = render(
  //     <NativeBaseProvider initialWindowMetrics={inset}>
  //       <QueryClientProvider client={queryClient}>
  //         <NavigationContainer>
  //           <Stack.Navigator>
  //             <Stack.Screen
  //               name="EditReportSymptom"
  //               component={EditReportSymptomScreen}
  //               initialParams={{
  //                 symptomName: "douleur menstruelle",
  //               }}
  //             />
  //           </Stack.Navigator>
  //         </NavigationContainer>
  //       </QueryClientProvider>
  //     </NativeBaseProvider>
  //   );

  //   const goBackButton = tree.getByText("Valider")
  //   expect(goBackButton).toBeDefined()
  //   fireEvent.press(goBackButton)
  //   // expect(goBackButton).toThrowError()
  // });
})