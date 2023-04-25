import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

afterEach(() => {
  localStorage.clear();
});
it("renders without crashing", () => {
  render(<App />);
  expect(screen.getByText(/What do you want to do?/i)).toBeDefined();
});

it("creates a Task", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Enter a task");
  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.submit(input);
  expect(screen.getByText(/Test Task/i)).toBeDefined();
});

it("completes a Task", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Enter a task");
  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.submit(input);
  const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
  fireEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);
  screen.debug();
});

it("deletes a Task", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Enter a task");
  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.submit(input);
  const deleteButton = screen.getByText(/x/i);
  fireEvent.click(deleteButton);
  expect(screen.queryByText(/Test Task/i)).toBeNull();
});

export {};
