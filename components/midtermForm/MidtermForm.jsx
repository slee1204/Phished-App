import { Button, createStyles, TextInput, Textarea } from '@mantine/core';
import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';
// import Calendar from '../datetimepicker/Calendar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30vw;
  margin: 3rem auto;

  h1 {
    margin-bottom: 2rem;
    font-family: "Verdana";
    text-transform: uppercase;
    color: #459cfb;
  }

  .button {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .description {
    margin: 1rem;
    width: 25vw;
  }
`;

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


const templateStyle ={
  marginTop: 20,
  padding: 20,
  backgroundColor: '#D4EBFF',
  border: '1px dashed #50A7F2',
  borderRadius: '5px',
  color: '#3F3F3F',
  fontSize: '10px',


}

export function MidtermForm({ submitHandler, onScheduleEmail }) {
  // Styles
  const { classes } = useStyles();
  const { textarea } = textAreaStyles();

  // Inputs
  const [fromEmail, setFromEmail] = useState('');
  const [to, setTo] = useState('');
  const [html, setHtml] = useState('');
  const [subject, setSubject] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [targetName, setTargetName] = useState('');
  const [template, setTemplate] = useState('basic');
  const [submissionNote, setSubmissionNote] = useState("invisable");



  async function onClick(e) {
    e.preventDefault();

    setTo('');
    setFromEmail('');
    setFname('');
    setLname('');
    setSubject('');
    setHtml('');
    setTargetName('');

    let from = `${fname} ${lname} ${fromEmail}`;
    let validation = await submitHandler({ from, to, subject, html, targetName, template})

    setSubmissionNote(validation.toString())
    const timeId = setTimeout(() => {
      setSubmissionNote("invisable");
    }, 2500);
    return () => clearTimeout(timeId);


  }

  return (

      <>
        <Container>
          <div style={templateStyle} >
            {/*<p>[your text] <br/> link</p>*/}
            <p>[Phish emoticon]</p>
            <p>[your text]</p>
            <p><u>Click Here</u></p>

          </div>

          <form onSubmit={onClick} style={{marginTop: 20 }} >

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
                placeholder="senders.email@gmail.com"
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
                placeholder="You won!"
                classnames={classes}
                mb={12}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required

            />

            <Textarea
                label="Content"
                placeholder="Hi Mom..."
                autosize
                minRows={4}
                classnames={textarea}
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                required
            />




            <div className="button">
              <Button type="submit" variant="outline">
                Send email
              </Button>

              <Link href="/scheduleEmail" passHref>
                <a
                    onClick={() =>
                        onScheduleEmail({ fname, lname, fromEmail, to, subject, html })
                    }
                >
                  <Button variant="subtle">Schedule email for later</Button>
                </a>
              </Link>
            </div>
          </form>

          {submissionNote=="true" &&
          <Notification icon={<IconCheck size={18} />} color="teal" title="Email Sent">
            Submitted successfully
          </Notification>
          }

          {submissionNote=="false" &&
          <Notification icon={<IconX size={18} />} color="red" title="Consent Needed">
            The person you are trying to phish has not consented to receiving our phishing emails yet. <a>Learn more</a>
          </Notification>
          }

        </Container>
      </>

  );
}

export default MidtermForm;
