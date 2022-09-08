import React from "react";
import App from "./App";
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'


describe('emoji tests', () => {
  test("header was checked", () => {
    render(<App/>)
    const element = screen.getByText(/Emoji Search/);
    expect(element).toBeInTheDocument();
  });

  test('20 emoji list elements were rendered without problem', () => {
    const { container } = render(<App/>);
    const elements = container.getElementsByClassName('component-emoji-result-row');
    expect(elements.length).toBe(20);
   
  });

  test('searching filter was worked without error', async () => {
    render(<App/>);  
    let inputElement = screen.getByRole('searchinput');

    fireEvent.change(inputElement, {target : {value: 'rose'}});
    const elements = screen.getAllByRole('listElement');
    expect(elements.length).toBe(3);
  });

  test('check if emoji was copied', () => {
    render(<App/>); 
    const elements = screen.getAllByRole('listElement');
    fireEvent.click(elements[10]);
    expect(elements[10].getAttribute('data-clipboard-text').length).toBeGreaterThan(0);
  });



})
