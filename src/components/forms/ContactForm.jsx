"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  fullName: Yup.string().trim().min(2, "name: too short").max(80, "name: too long").required("name: required"),
  email: Yup.string().trim().email("email: invalid address").required("email: required"),
  subject: Yup.string().trim().max(120, "subject: too long"),
  msg: Yup.string()
    .trim()
    .min(10, "message: at least 10 characters")
    .max(2000, "message: under 2000 characters")
    .required("message: required"),
});

const STEPS = ["validating input", "opening smtp connection", "encrypting payload (TLS)", "delivering message"];

function Field({ formik, name, label, optional, as = "input", ...props }) {
  const Tag = as;
  const error = formik.touched[name] && formik.errors[name];
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline gap-2 font-mono text-xs">
        <span className="text-accent">?</span>
        <span className="text-ink">{label}</span>
        {optional && <span className="text-subtle">(optional)</span>}
      </label>
      <Tag
        id={id}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.isSubmitting}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field ${error ? "border-danger/70" : ""} ${as === "textarea" ? "resize-y" : ""}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-mono text-[11px] text-danger">
          ✗ {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [log, setLog] = useState([]);

  const formik = useFormik({
    initialValues: { fullName: "", email: "", subject: "", msg: "", website: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLog([]);
      // Show progress lines while the request is in flight
      const timers = STEPS.map((step, i) => setTimeout(() => setLog((l) => [...l, { text: step, ok: true }]), i * 350));
      try {
        await Promise.all([
          axios.post("/api/contact", values, { timeout: 15000 }),
          new Promise((r) => setTimeout(r, STEPS.length * 350)),
        ]);
        setLog((l) => [...l, { text: "message delivered · exit 0", ok: true, done: true }]);
        toast.success("Message delivered. I'll get back to you soon!");
        resetForm();
      } catch (error) {
        timers.forEach(clearTimeout);
        setLog((l) => [...l, { text: "delivery failed · exit 1", ok: false, done: true }]);
        toast.error(error.response?.data?.error || "Something went wrong. Email me at ganeshhh2003@gmail.com.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="window relative">
      <div className="window-bar">
        <span className="dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span>bash — send_message.sh</span>
      </div>

      <div className="space-y-6 p-5 sm:p-7">
        <p className="font-mono text-xs text-subtle">
          <span className="text-accent">guest@ganesh-os</span>:<span className="text-cyan">~</span>$ ./send_message.sh
          --interactive
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field formik={formik} name="fullName" label="your name" autoComplete="name" placeholder="Ada Lovelace" />
          <Field formik={formik} name="email" label="your email" type="email" autoComplete="email" placeholder="ada@company.com" />
        </div>
        <Field formik={formik} name="subject" label="subject" optional placeholder="backend role / project / just saying hi" />
        <Field
          formik={formik}
          as="textarea"
          name="msg"
          label="message"
          rows={4}
          placeholder="Tell me what you're building…"
        />

        {/* Honeypot: hidden from people, bots tend to fill it in */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formik.values.website} onChange={formik.handleChange} />
          </label>
        </div>

        {log.length > 0 && (
          <div className="rounded-lg border border-line bg-bg/70 p-3 font-mono text-xs leading-6" role="status">
            {log.map((l, i) => (
              <p key={i} className={l.done ? (l.ok ? "text-accent" : "text-danger") : "text-muted"}>
                {l.done ? (l.ok ? "✓ " : "✗ ") : "→ "}
                {l.text}
                {!l.done && <span className="text-accent"> ok</span>}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary">
            {formik.isSubmitting ? "executing…" : "execute ⏎"}
          </button>
          <span className="font-mono text-[11px] text-subtle">replies land in your inbox, usually within 24h</span>
        </div>
      </div>
    </form>
  );
}
