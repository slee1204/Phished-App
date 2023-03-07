import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  Title,
} from '@mantine/core';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export function HeroHeader() {
  const { data: session } = useSession();
  const { classes } = useStyles();
  const r = useRouter();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <Title className={classes.title}>
          Protect Mom from phishing attacks by{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'blue', to: 'blue' }}
            inherit
          >
            phishing her yourself
          </Text>
        </Title>

        <h1 className={classes.description} color="dimmed">
          Send personalized phishing emails to test and educate your friends and
          family – never worry about their internet safety again
        </h1>

        <Group className={classes.controls}>
          {session ? (
            <Button
              size="xl"
              className={classes.control}
              variant="fill"
              type="null"
              onClick={() => {
                r.push({ pathname: '/account' });
              }}
            >
              Get Phishing
            </Button>
          ) : (
            <Button
              size="xl"
              className={classes.control}
              variant="fill"
              type="null"
              onClick={() => {
                r.push({ pathname: '/onboarding' });
              }}
            >
              Get started
            </Button>
          )}

          <Button
            component="a"
            href="https://github.com/phished-co/phished_web_app"
            target="_blank"
            size="xl"
            variant="default"
            className={classes.control}
            leftIcon={<FaGithub size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
