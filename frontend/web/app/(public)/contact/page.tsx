import { ContactHero, ContactInfo, ContactForm, ContactFAQ } from '@/components/contact';

export default function Contact() {
  return (
    <main className="min-h-screen">
      <ContactHero
        title="Let's Connect"
        subtitle="Get in Touch"
        description="Have a question or want to learn more about ConQ? We're here to help. Reach out to us and we'll get back to you as soon as possible."
      />
      <ContactInfo />
      <div id="contact-form">
        <ContactForm />
      </div>
      <ContactFAQ />
    </main>
  );
}
