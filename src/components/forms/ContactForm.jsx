"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Send, Loader2 } from "lucide-react";

const validationSchema = Yup.object({
  fullName: Yup.string().trim().min(2, "Please enter your name").max(80, "Name is too long").required("Name is required"),
  email: Yup.string().trim().email("Enter a valid email address").required("Email is required"),
  subject: Yup.string().trim().max(120, "Subject is too long"),
  msg: Yup.string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message should be under 2000 characters")
    .required("Message is required"),
});

function Field({ formik, name, label, optional, as = "input", className = "", ...props }) {
  const Tag = as;
  const error = formik.touched[name] && formik.errors[name];
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-muted">
        {label}
        {optional && <span className="text-subtle"> (optional)</span>}
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
        className={`field ${className} ${error ? "border-red-400/70" : ""}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const formik = useFormik({
    initialValues: { fullName: "", email: "", subject: "", msg: "", website: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("/api/contact", values, { timeout: 15000 });
        toast.success("Thanks! Your message is on its way — I'll get back to you soon.");
        resetForm();
      } catch (error) {
        toast.error(
          error.response?.data?.error ||
            `Something went wrong. You can also email me directly at ganeshhh2003@gmail.com.`,
        );
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field formik={formik} name="fullName" label="Name" autoComplete="name" placeholder="Your name" />
        <Field
          formik={formik}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>
      <Field formik={formik} name="subject" label="Subject" optional placeholder="Role, project or just hello" />
      <Field
        formik={formik}
        as="textarea"
        name="msg"
        label="Message"
        rows={5}
        placeholder="Tell me a bit about what you're working on…"
        className="resize-y"
      />

      {/* Honeypot: hidden from people, bots tend to fill it in */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formik.values.website} onChange={formik.handleChange} />
        </label>
      </div>

      <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary w-full sm:w-auto">
        {formik.isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
