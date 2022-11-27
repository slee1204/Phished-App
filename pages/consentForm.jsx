import { Button, createStyles, TextInput, Textarea } from '@mantine/core';
import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';



const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 16,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

const textAreaStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 16,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

const confirmStyle = {
  backgroundColor: 'RGBA(150,183,80,0.43)',
  padding: '10px',
  margin: '10px',
  textAlign: 'center',
  fontSize: '10px',
  borderRadius: '4px',
};

export default function ConsentForm({ submitHandler }) {
  const { classes } = useStyles();
  const { textarea } = textAreaStyles();

  // Inputs
  const [fromEmail, setFromEmail] = useState('');
  const [to, setTo] = useState('');
  const [html, setHtml] = useState('');
  const [subject, setSubject] = useState('Consent request for phishing Education');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [targetName, setTargetName] = useState('');
  const [template, setTemplate] = useState('consent');

  const [successNote, setSuccessNote] = useState(false);

  async function onClick(e) {
    e.preventDefault();

    setFromEmail('');
    setTo('');
    setFname('');
    setLname('');
    // setSubject('');
    // setHtml('');
    setTargetName('');

    let from = `${fname} ${lname} ${fromEmail}`;
    let validation = submitHandler({
      from,
      to,
      subject,
      html,
      targetName,
      template,
    });

    setSuccessNote(true);
    const timeId = setTimeout(() => {
      setSuccessNote(false);
    }, 2000);
    return () => clearTimeout(timeId);
  }

  return (
    
      <>
      <div className="container">
    
        <form onSubmit={onClick} style={{ marginTop: 20 }}>
          <TextInput
            label="Receiver: First Name"
            placeholder="Jane"
            classnames={classes}
            mb={12}
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <TextInput
            label="Receiver: Last Name"
            placeholder="Doe"
            classnames={classes}
            mb={12}
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <TextInput
            label="Sender Email"
            placeholder="my.email@gmail.com"
            classnames={classes}
            mb={12}
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            type="email"
            required
          />
          <TextInput
            label="Receiver Email"
            placeholder="receivers.email@gmail.com"
            classnames={classes}
            mb={12}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            type="email"
            required
          />

          <TextInput
            label="Subject"
            // placeholder="Consent request for phishing Education"
            classnames={classes}
            mb={12}
            defaultValue={subject}
            onChange={(e) => setSubject(e.target.value)}
            readOnly
          />

          <Textarea
            label="Content"
            placeholder="Hello, We received a request for a phishing campaign against you. By clicking the link below, you give us consent, and it will take you to our website. Thank you."
            autosize
            minRows={4}
            classnames={textarea}
            // value={html}
            onChange={(e) => setHtml(e.target.value)}
            readOnly
          />

          <div className="button">
            <Button variant="outline" type="submit">
              Send Consent Email
            </Button>
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
      {successNote && (
        <div style={confirmStyle}>
          <p> Submitted successfully</p>
        </div>
      )}
    
    </>
  );
}