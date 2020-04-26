import React, { useState } from "react";
import { FormControlLabel, Container, Grid, Checkbox, Button } from '@material-ui/core';

const Symptoms = () => {

    const [state, setState] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false,
        ten: false,
        eleven: false,
        twelve: false,
        thirteen: false,
        fourteen: false,
        fifteen: false,
        sixteen: false,
        seventeen: false,
        eighteen: false,
        nineteen: false,
        twenty: false,
        twentyOne: false,
        twentyTwo: false
    });
    const [age, setAge] = useState();

    const [result, setResult] = useState("");

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const getResult = () => {
        const responseValues = Object.values(state);
        let count = parseInt(age) / 30;
        console.log(count)
        responseValues.forEach((value, i) => {
            if (i >= 0 && i <= 7 && value) {
                count += 1000;
            }
            else if (value) count++;
        })
        if (count > 1000) setResult("Call 911 immediately.");
        if (count > 8) setResult("Urgent medical attention may be needed. Go to the ER.")
        else if (count < 8 && count > 2) setResult("Stay home and stay safe. If your ilness worsens, call your doctor.");
        else if (count < 2) setResult("You're probably ok.")
    }

    return (
        <>
            <h1 style={{ textAlign: "center", fontSize: "4em", margin: "1%", color: "#C7F9CC" }}>Symptoms</h1>
            <p style={{ textAlign: "center", fontSize: "2.3em", color: "#C0C0C0" }}>Please check all of the boxes which apply to you.</p>
            <Grid
                container
                spacing={3}
            >
                <Grid item xs={3}>
                    <FormControlLabel
                        control={<Checkbox checked={state.one} onChange={handleChange} name="one" />}
                        center
                        label="Extremely difficult breathing"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.two} onChange={handleChange} name="two" />}
                        center
                        label="Blue-colored lips or face"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.three} onChange={handleChange} name="three" />}
                        center
                        label="Severe and constant pain or pressure in the chest"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.four} onChange={handleChange} name="four" />}
                        center
                        label="Severe and constant dizziness or lightheadedness"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.five} onChange={handleChange} name="five" />}
                        center
                        label="Acting confused (new or worsening)"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.six} onChange={handleChange} name="six" />}
                        center
                        label="Unconscious or very difficult to wake up"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.seven} onChange={handleChange} name="seven" />}
                        center
                        label="Slurred speech (new or worsening)"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.eight} onChange={handleChange} name="eight" />}
                        center
                        label="New seizure or seizure that won't stop"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.nine} onChange={handleChange} name="nine" />}
                        center
                        label="Fever"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.ten} onChange={handleChange} name="ten" />}
                        center
                        label="Cough"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.eleven} onChange={handleChange} name="eleven" />}
                        center
                        label="Shortness of breath or difficulty breathing"
                        style={{ color: "#FFFFFF" }}
                    />
                </Grid>

                <Grid item xs={3}>
                    <FormControlLabel
                        control={<Checkbox checked={state.twelve} onChange={handleChange} name="twelve" />}
                        center
                        label="Chills"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.thirteen} onChange={handleChange} name="thirteen" />}
                        center
                        label="Repeated shaking with chills"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.fourteen} onChange={handleChange} name="fourteen" />}
                        center
                        label="Muscle pain"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.fifteen} onChange={handleChange} name="fifteen" />}
                        center
                        label="Headache"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.sixteen} onChange={handleChange} name="sixteen" />}
                        center
                        label="Sore throat"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.seventeen} onChange={handleChange} name="seventeen" />}
                        center
                        label="New loss of taste or smell"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.eighteen} onChange={handleChange} name="eighteen" />}
                        center
                        label="Chronic lung disease, moderate to severe asthma, or smoking"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.nineteen} onChange={handleChange} name="nineteen" />}
                        center
                        label="Serious heart conditions"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.twenty} onChange={handleChange} name="twenty" />}
                        center
                        label="Weakened immune system (cancer treatment, prolonged use of steroids, transplant or HIV/AIDS)"
                        style={{ color: "#FFFFFF" }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.twentyOne} onChange={handleChange} name="twentyOne" />}
                        center
                        label="Severe obesity (Body Mass Index [BMI] greater than or equal to 40)"
                        style={{ color: "#FFFFFF" }}
                    />

                    <FormControlLabel
                        control={<Checkbox checked={state.twentyTwo} onChange={handleChange} name="twentyTwo" />}
                        center
                        label="Underlying conditions (diabetes, renal failure, or liver disease)"
                        style={{ color: "#FFFFFF" }}
                    />
                </Grid>
                <div style={{ margin: "1%" }} />
                <p style={{ color: "white", fontSize: "1.5em" }}>Enter your age:</p>
                <input type="text"
                    onChange={(e) => {
                        e.preventDefault();
                        setAge(e.target.value);
                    }} value={age} />
                <div style={{ margin: "2%" }} />
                <button onClick={() => getResult()} style={{ textAlign: "center", margin: "1em" }}>Get Feedback</button>
                <button onClick={() => window.location.reload()} style={{ textAlign: "center", margin: "1em", marginBottom: "1em" }}>Reset</button>
                <h1 style={{ marginBottom: "2em", marginTop: "0.5em", color: "#DCE2C8" }}>{result}</h1>
            </Grid>
            </>
    )
}

export default Symptoms;