import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  
  interface VerificationEmailProps {
    username: string;
    resetCode: string;
  }
  
  export default function resetCodeEmail({ username, resetCode }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Reset Code</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Here&apos;s your password reset code: {resetCode}</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello {username},</Heading>
          </Row>
          <Row>
            <Text>
               Please use the following reset
              code to reset your password:
            </Text>
          </Row>
          <Row>
            <Text>{resetCode}</Text> 
          </Row>
          <Row>
            <Text>
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
         
        </Section>
      </Html>
    );
  }