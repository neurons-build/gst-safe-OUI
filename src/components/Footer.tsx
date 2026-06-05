import { social } from "@/resources/once-ui.config";
import { Row, IconButton, Text } from "@once-ui-system/core";

export const Footer: React.FC<React.ComponentProps<typeof Row>> = ({ ...flex }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" {...flex}>
      <Row
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{direction: "column"}}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">GST Safe</Text>
          <Text onBackground="neutral-weak">/ All rights reserved</Text>
        </Text>
        <Row gap="16">
          <IconButton size="s" variant="ghost" href={social.threads} icon="threads" tooltip="Threads" />
          <IconButton size="s" variant="ghost" href={social.discord} icon="discord" tooltip="Discord" />
          <IconButton size="s" variant="ghost" href={social.github} icon="github" tooltip="GitHub" />
        </Row>
      </Row>
    </Row>
  );
};