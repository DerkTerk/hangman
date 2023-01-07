import React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hangman from "./Hangman";

describe("hangman", () => {
    // test("renders given word", () => {
    //   render(<Hangman currentWord={"pineapple"} />);
    //   expect(screen.getByText("pineapple")).toBeVisible();
    // });

    it("elements render", () => {
        render(<Hangman currentWord=""/>);
        expect(input()).toBeVisible();
        expect(getSubmitButton()).toBeVisible();
    });
    it("input() updates graveyard", () => {
        render(<Hangman currentWord=""/>);
        userEvent.type(input(), "z");
        userEvent.click(getSubmitButton());
        expect(screen.getByText("z")).toBeVisible();
    });
    it("input() takes one value", () => {
        render(<Hangman currentWord=""/>);
        userEvent.type(input(), "asdfasdfasdf");
        expect(getSubmitButton()).toBeDisabled();
    });
    it("no repeat inputs", () => {
        render(<Hangman currentWord=""/>);
        userEvent.type(input(), "z");
        userEvent.click(getSubmitButton());
        userEvent.type(input(), "z");
        expect(getSubmitButton()).toBeDisabled();
    });
    it("target word", () => {
        render(<Hangman currentWord="at"/>);
        const bank = screen.getByLabelText("target word");
        userEvent.type(input(), "a");
        userEvent.click(getSubmitButton());
        expect(within(bank).getByText("a")).toBeVisible();
    });

    it("winning", () => {
        render(<Hangman currentWord="at"/>);
        userEvent.type(input(), "a");
        userEvent.click(getSubmitButton());
        userEvent.type(input(), "t");
        userEvent.click(getSubmitButton());
        expect(screen.getByRole("presentation")).toBeVisible();
    });
});

function getSubmitButton() {
    return screen.getByRole("button", {name: "submit"});
}

const input = () => screen.getByRole("textbox", {name: "Letter"});
