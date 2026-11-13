"use client";

import { useRef, useState } from "react";
import { buttonClasses } from "./Button";
import { families } from "@/lib/content";
import { SITE } from "@/lib/site";

/* Aucun serveur d'envoi n'est configuré (le site est statique). Le
   formulaire valide les champs, puis prépare un message dans l'application
   e-mail du visiteur. Il ne dit JAMAIS « envoyé » : seule l'étape « message
   prêt » est affichée, et c'est le visiteur qui envoie. */

type Field = "name" | "email" | "company" | "area" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", email: "", company: "", area: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 1500;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Indiquez votre nom.";
  if (!values.email.trim()) {
    errors.email = "Indiquez votre e-mail professionnel.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email =
      "Indiquez une adresse e-mail valide, par exemple nom@entreprise.com.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Décrivez le problème en quelques mots.";
  }
  return errors;
}

function buildMailto(values: Values): string {
  const company = values.company.trim();
  const subject = `Demande de Value Scan${company ? ` — ${company}` : ""}`;
  const lines = [
    `Nom : ${values.name.trim()}`,
    `E-mail professionnel : ${values.email.trim()}`,
  ];
  if (company) lines.push(`Entreprise : ${company}`);
  if (values.area) lines.push(`Domaine à améliorer : ${values.area}`);
  lines.push("", values.message.trim());
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`;
}

const inputClasses = (invalid: boolean) =>
  `mt-2 block w-full border bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/70 ${
    invalid ? "border-accent-deep" : "border-ink/30 hover:border-ink"
  }`;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [mailto, setMailto] = useState<string | null>(null);

  const update =
    (field: Field) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setMailto(null);
    };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      setMailto(null);
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    const href = buildMailto(values);
    setMailto(href);
    window.location.href = href;
  };

  const errorProps = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-[0.9rem] text-accent-deep">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-7">
      <div>
        <label htmlFor="name" className="block text-[0.95rem] font-medium">
          Nom <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-required="true"
          value={values.name}
          onChange={update("name")}
          className={inputClasses(Boolean(errors.name))}
          {...errorProps("name")}
        />
        {errorText("name")}
      </div>

      <div>
        <label htmlFor="email" className="block text-[0.95rem] font-medium">
          E-mail professionnel <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          value={values.email}
          onChange={update("email")}
          className={inputClasses(Boolean(errors.email))}
          {...errorProps("email")}
        />
        {errorText("email")}
      </div>

      <div>
        <label htmlFor="company" className="block text-[0.95rem] font-medium">
          Entreprise <span className="text-muted">(facultatif)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={update("company")}
          className={inputClasses(false)}
        />
      </div>

      <div>
        <label htmlFor="area" className="block text-[0.95rem] font-medium">
          Que souhaitez-vous améliorer ?{" "}
          <span className="text-muted">(facultatif)</span>
        </label>
        <select
          id="area"
          name="area"
          value={values.area}
          onChange={update("area")}
          className={inputClasses(false)}
        >
          <option value="">Choisir un domaine</option>
          {families.map((family) => (
            <option key={family.id} value={family.title}>
              {family.title}
            </option>
          ))}
          <option value="Je ne sais pas encore">Je ne sais pas encore</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-[0.95rem] font-medium">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={MAX_MESSAGE}
          aria-required="true"
          value={values.message}
          onChange={update("message")}
          className={inputClasses(Boolean(errors.message))}
          {...errorProps("message")}
        />
        {errorText("message")}
        <p className="mt-2 text-[0.85rem] text-muted">
          Qu&rsquo;est-ce qui ralentit votre entreprise ? Quelques lignes
          suffisent.
        </p>
      </div>

      <button type="submit" className={buttonClasses("primary")}>
        Préparer mon message
        <span aria-hidden="true">→</span>
      </button>

      <div role="status" aria-live="polite">
        {mailto ? (
          <div className="border-t border-ink pt-5 text-[0.95rem] leading-relaxed">
            <p className="font-medium">
              Votre message est prêt. Dernière étape.
            </p>
            <p className="mt-2 text-muted">
              Votre application de messagerie devrait s&rsquo;ouvrir avec le
              message prérempli. Rien n&rsquo;est envoyé tant que vous
              n&rsquo;appuyez pas sur Envoyer.
            </p>
            <p className="mt-3">
              <a
                href={mailto}
                className="font-medium underline underline-offset-4"
              >
                Rouvrir le message
              </a>
              <span className="text-muted">
                {" "}
                ou écrivez à{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline underline-offset-4"
                >
                  {SITE.email}
                </a>
                .
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
