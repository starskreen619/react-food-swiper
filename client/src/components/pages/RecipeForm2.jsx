import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
//To run install "yarn add @material-ui/core" and "yarn add @material-ui/icons"
//sources: https://material-ui.com/getting-started/installation/
//         https://www.youtube.com/watch?v=zgKH12s_95A

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      background: "white",
      margin: theme.spacing(2),
      width: 400,
    },
  },
  button: {
    margin: theme.spacing(6),
    alignContent: "center",
  },
}));

export default function RecipeForm2() {
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), Ingredients: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), Ingredients: "" }]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <Container>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Button onClick={() => setShow(!show)} variant="contained">
          Create New Recipe
        </Button>
        {show ? (
          <div>
            <TextField
              id="filled-basic"
              label="Recipe Name"
              fullWidth
              variant="filled"
            />
            <br />
            <TextField
              id="filled-basic"
              label="Cooking Time in Mins"
              variant="filled"
            />
            {inputFields.map((inputField) => (
              <div className={classes.root} key={inputField.id}>
                <TextField
                  name="Ingredients"
                  label="Ingredients"
                  variant="filled"
                  value={inputField.Ingredients}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />

                <IconButton
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                >
                  <RemoveIcon />
                  <br />
                </IconButton>
                <IconButton onClick={handleAddFields}>
                  <AddIcon />
                </IconButton>
              </div>
            ))}

            <TextField
              id="filled-multiline-static"
              label="Instructions"
              multiline
              fullWidth
              rows={6}
              length={10}
              // defaultValue="Default Value"
              variant="filled"
            />
            <br />
            <br />
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="black"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <br />
            <br />
            <Button variant="contained" onClick={handleSubmit}>
              Create
            </Button>
          </div>
        ) : null}
      </form>
    </Container>
  );
}
