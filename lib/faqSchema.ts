export type FaqItem = {
  question: string;
  answer: string;
};

export function buildFaqPageSchema(faqs: FaqItem[]): Record<string, unknown> | null {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
