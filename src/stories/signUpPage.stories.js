import React from "react";
import SignUp from "../pages/signupPage";
import { MemoryRouter } from "react-router";
import AuthContextProvider from "../contexts/authContext";

export default {
  title: "Authentication Page/SignUp",
  component: SignUp,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <AuthContextProvider>{Story()}</AuthContextProvider>,
  ],
};

export const Basic = () => <SignUp />;

Basic.storyName = "Default";
