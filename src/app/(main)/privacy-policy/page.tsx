import { Column, Heading, Text, Meta, Schema } from "@once-ui-system/core";
import { CustomMDX } from "@/components";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { baseURL } from "@/resources/once-ui.config";
import { meta } from "@/resources/seo";

async function getPrivacyPolicyContent() {
  const filePath = path.join(process.cwd(), 'src', 'content', 'legal', 'privacy-policy.mdx');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    metadata: data,
    content: content
  };
}

export async function generateMetadata() {
  return Meta.generate({
    title: meta.privacy.title,
    description: meta.privacy.description,
    baseURL: baseURL,
    path: meta.privacy.path,
    canonical: meta.privacy.canonical,
    image: meta.privacy.image,
    robots: meta.privacy.robots,
    alternates: meta.privacy.alternates,
  });
}

export default async function PrivacyPolicy() {
  const { metadata, content } = await getPrivacyPolicyContent();
  
  return (
    <Column maxWidth="s" gap="l" paddingX="l" paddingTop="40">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={metadata.title || meta.privacy.title}
        description={metadata.description || meta.privacy.description}
        path={meta.privacy.path}
      />
      <Column fillWidth gap="4">
        <Heading variant="display-strong-xs">
          {metadata.title}
        </Heading>
        <Text variant="label-default-s" onBackground="neutral-weak">
          Last updated: {metadata.updated}
        </Text>
      </Column>
      <Column fillWidth onBackground="neutral-medium">
        <CustomMDX source={content} />
      </Column>
    </Column>
  );
}
