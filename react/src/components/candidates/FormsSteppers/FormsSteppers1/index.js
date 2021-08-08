import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Card,
  MenuItem,
  Button,
  Tooltip,
  TextField,
  FormControl,
  Select
} from '@material-ui/core';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';

const Step1 = () => {
  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">
            Dúvidas ainda sobre clipping?
          </h5>
          <p className="text-black-50 mb-4">
          Gostaria de entender mais sobre nossos serviços? 
          </p>
          <form container spacing={3}>
            <label item md={6} lg={12} xl={12}>
              <TextField
                fullWidth
                label="Nome"
                type="Nome"
                variant="outlined"
              />
            </label>
            <label item md={6} lg={12} xl={12}>
              <TextField
                fullWidth
                label="Telefone"
                type="Telefone"
                variant="outlined"
              />
            </label>
            <label item md={6} lg={12} xl={12}>
              <TextField
                fullWidth
                label="E-mail"
                type="E-mail"
                variant="outlined"
              />
            </label>
            <label item md={6} lg={12} xl={12}>
              <TextField
                fullWidth
                label="Assunto"
                multiline
                rows={4}
                variant="outlined"
              />
            </label>
          </form>
        </div>
      </Container>
    </>
  );
};
const Step2 = () => {
  const [state, setState] = useState('');

  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">
            Billing information
          </h5>
          <p className="text-black-50 mb-4">Wonderful transition effects.</p>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <TextField
                fullWidth
                label="Address 2"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={state}
                  onChange={handleChange}
                  label="State">
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={10}>California</MenuItem>
                  <MenuItem value={20}>Texas</MenuItem>
                  <MenuItem value={30}>Alabama</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <TextField fullWidth label="Zip" variant="outlined" />
            </Grid>
            <Grid item md={12} className="pt-0">
              <FormControlLabel
                control={<Checkbox name="checkedC" />}
                label="Check me out"
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
const Step3 = () => {
  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">
            Payment details
          </h5>
          <p className="text-black-50 mb-4">
            The next and previous buttons help you to navigate through your
            content.
          </p>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <TextField
                fullWidth
                label="Credit card number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField fullWidth label="Name on card" variant="outlined" />
            </Grid>
            <Grid item md={3}>
              <TextField fullWidth label="Exp. date" variant="outlined" />
            </Grid>
            <Grid item md={3}>
              <TextField fullWidth label="CVC/CVV" variant="outlined" />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

function StepIcon(props) {
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <div
      className={clsx(
        'd-50 transition-base d-flex align-items-center bg-gray-400 justify-content-center rounded',
        {
          'd-80 bg-primary text-white shadow-primary-sm': active,
          'd-50 bg-success text-white shadow-success-sm': completed
        }
      )}>
      {completed ? <Check className="completed" /> : icons[String(props.icon)]}
    </div>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

function getSteps() {
  return ['Personal Information', 'Billing Information', 'Payment Details'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    default:
      return <Step1 />;
  }
}

export default function LivePreviewExample() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Card className="card-box">
      <div className="r">
        
        <div className="">
          
        </div>
      </div>
      <div>
        <div className="bg-secondary mb-3">
          
        </div>
        {activeStep === steps.length ? (
          <div className="text-center p-5">
            
          </div>
        ) : (
          <div>
            <div>{getStepContent(activeStep)}</div>
            <div className="mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
