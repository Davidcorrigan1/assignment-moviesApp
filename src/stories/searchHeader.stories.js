import React from "react";
import SearchHeader from "../components/searchHeader";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 360000,
        refetchInterval: 360000,
        refetchOnWindowFocus: false,
      },
    },
  });
  
export default {
  title: "Movie Search Page/SearchHeader",
  component: SearchHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => (
        <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
};

export const Basic = () => <SearchHeader movie={SampleMovie} />;

Basic.storyName = "Default";
