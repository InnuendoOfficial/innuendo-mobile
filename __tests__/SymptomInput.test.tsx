import React from 'react';
import { render, screen, waitFor, renderHook } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import SymptomInput from '../src/components/SymptomInput'
import { NativeBaseProvider } from 'native-base';
import { act } from 'react-test-renderer';
import useSymptoms from '../src/hooks/useSymptoms'

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};


describe("SymptomInput", () => {
  it('renders component with data from API', async () => {
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
          <SymptomInput symptomName='douleur menstruelle' />
        </QueryClientProvider>
      </NativeBaseProvider>
    );

    await waitFor(() => expect(tree.getByLabelText("loading")).toBeDefined());
    await waitFor(() => expect(tree.getByText("douleur menstruelle")).toBeDefined());
  });

  it('renders component with not existing symptom name', async () => {
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
          <SymptomInput symptomName="un symptome qui n'existe pas" />
        </QueryClientProvider>
      </NativeBaseProvider>
    );

    await waitFor(() => expect(tree.getByLabelText("loading")).toBeDefined());
    await waitFor(() => expect(tree.getByText("Impossible de trouver le symptome")).toBeDefined());
  });
})