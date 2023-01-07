import React, {useState} from "react";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

export interface HangmanProps {
    currentWord: string;
}

const Hangman = (props: HangmanProps) => {
    const [graveyard, setGraveyard] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [correctBank, setCorrectBank] = useState("");
    const {currentWord} = props;
    const [remainingLetters, setRemainingLetters] = useState(currentWord)
    const [openDialog, setOpenDialog] = useState(false)

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (currentWord.includes(inputValue)) {
            setCorrectBank(correctBank + inputValue);
            setRemainingLetters(remainingLetters.replace(inputValue, ''))
            if (remainingLetters.length === 0) {
                setOpenDialog(true )
            }
        }
        const newGraveyard = graveyard;
        newGraveyard.push(inputValue);
        setInputValue("");
        setGraveyard(newGraveyard);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    let isSubmitDisabled =
        inputValue.length !== 1 || graveyard.includes(inputValue);
    return (
        <div>
            <h2>{currentWord}</h2>
            <Stack
                className="app__graveyard"
                direction="row"
                alignItems="flex-end"
                gap={0.5}
            >
                <Typography variant="h6">Guessed Letters: </Typography>
                <Typography mb="3px">{graveyard}</Typography>
            </Stack>
            <Stack
                aria-label="target word"
                alignItems="flex-end"
                direction="row"
                gap={0.5}
            >
                <Typography variant="h6">Correct Letters: </Typography>
                <Typography mb="3px">{correctBank}</Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" gap={1}>
                    <TextField
                        onChange={handleChange}
                        label="Letter"
                        placeholder="type one letter"
                        value={inputValue}
                        error={inputValue.length !== 0 && isSubmitDisabled}
                        // helperText="input must be one new letter"
                    />
                    <Button
                        disabled={isSubmitDisabled}
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                    >
                        submit
                    </Button>
                </Stack>
            </form>
            <img src = {`/hang${graveyard.length + 1}.PNG`} alt = "empty gallows"/>
            <Dialog
                open={openDialog}
                // aria-labelledby="alert-dialog-title"
                // aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                {/*<DialogActions>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
};

export default Hangman;
