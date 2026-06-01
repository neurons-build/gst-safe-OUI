import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { CustomMDX } from "@/components";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { meta } from "@/resources/seo";
import { baseURL } from "@/resources/once-ui.config";

async function getTermsOfUseContent() {
  const filePath = path.join(process.cwd(), 'src', 'content', 'legal', 'terms-of-use.mdx');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    metadata: data,
    content: content
  };
}

export async function generateMetadata() {
  return Meta.generate({
    title: meta.terms.title,
    description: meta.terms.description,
    baseURL: baseURL,
    path: meta.terms.path,
    canonical: meta.terms.canonical,
    image: meta.terms.image,
    robots: meta.terms.robots,
    alternates: meta.terms.alternates,
  });
}

export default async function TermsOfUse() {
  const { metadata, content } = await getTermsOfUseContent();
  
  return (
    <Column maxWidth="s" gap="l" paddingX="l" paddingTop="40">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={metadata.title || meta.terms.title}
        description={metadata.description || meta.terms.description}
        path={meta.terms.path}
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