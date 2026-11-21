"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

// Same ids as the Services section, so the dropdown shows the same 9 titles
const serviceIds = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

const inputClass =
  "block w-full bg-transparent text-base font-normal leading-[26px] tracking-[-0.005em] text-white outline-none placeholder:text-white/70";

// Shows the dotted arrow icon in black (the file itself is white)
const dotMask = {
  maskImage: "url(/assets/dot-btn.svg)",
  WebkitMaskImage: "url(/assets/dot-btn.svg)",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  maskSize: "contain",
  WebkitMaskSize: "contain",
};

// The small 4-point star on the left end of each line (large screens only, like Figma)
function StarMark() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="pointer-events-none absolute -start-2.5 bottom-[-10.5px] hidden size-5 fill-white lg:block"
    >
      <path d="M10 0C10 5.5 14.5 10 20 10C14.5 10 10 14.5 10 20C10 14.5 5.5 10 0 10C5.5 10 10 5.5 10 0Z" />
    </svg>
  );
}

// One row: label on top, the input below, a line at the bottom
function Field({ id, label, children }) {
  return (
    <div className="relative border-b border-white/90 py-5 transition-colors first:pt-0 focus-within:border-white">
      <label
        htmlFor={id}
        className="block text-base font-normal leading-[26px] tracking-[-0.005em] text-white/70 uppercase"
      >
        {label}
      </label>
      <div className="mt-3.5">{children}</div>
      <StarMark />
    </div>
  );
}

// Our own dropdown (the browser's built-in list can't be styled).
// It also keeps a hidden input, so the chosen value is still part of the form.
function CategorySelect({ id, name, value, onChange, placeholder, options }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);

  const listId = `${id}-list`;
  const selected = options.find((option) => option.value === value);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const openList = () => {
    const index = options.findIndex((option) => option.value === value);
    setActiveIndex(index >= 0 ? index : 0);
    setOpen(true);
  };

  const choose = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  // Keyboard: arrows, Home, End, Enter, Space, Escape, Tab
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(options[activeIndex]);
        else openList();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          open ? `${id}-option-${options[activeIndex].value}` : undefined
        }
        onClick={(e) => {
          // Keyboard presses are handled in onKeyDown, so only mouse clicks count here
          if (e.detail === 0) return;
          if (open) setOpen(false);
          else openList();
        }}
        onKeyDown={onKeyDown}
        onKeyUp={(e) => {
          if (e.key === " ") e.preventDefault();
        }}
        className={`flex w-full items-center justify-between gap-3 text-start text-base font-normal leading-[26px] tracking-[-0.005em] outline-none ${
          selected ? "text-white" : "text-white/70"
        }`}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`size-3 shrink-0 text-white transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <input type="hidden" name={name} value={value} />

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-6 max-h-80 overflow-y-auto rounded-xl border border-white/15 bg-[#270F00] p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                id={`${id}-option-${option.value}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(option)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-normal leading-5 tracking-[-0.005em] transition-colors ${
                  isSelected ? "text-brand" : "text-white"
                } ${index === activeIndex ? "bg-white/10" : ""}`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function ContactForm({ className = "" }) {
  const t = useTranslations("Footer");
  const services = useTranslations("Services");
  const [interest, setInterest] = useState("");

  const categoryOptions = serviceIds.map((id) => ({
    value: id,
    label: services(`items.${id}.title`),
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: send the form data (email, database...) once we decide how.
    // For now the form is design only and does not send anything.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-[550px] ${className}`}
    >
      <Field id="name" label={t("form.name.label")}>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={t("form.name.placeholder")}
          className={inputClass}
        />
      </Field>

      <Field id="company" label={t("form.company.label")}>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder={t("form.company.placeholder")}
          className={inputClass}
        />
      </Field>

      <Field id="email" label={t("form.email.label")}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("form.email.placeholder")}
          className={inputClass}
        />
      </Field>

      <Field id="phone" label={t("form.phone.label")}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={t("form.phone.placeholder")}
          className={inputClass}
        />
      </Field>

      <Field id="interest" label={t("form.interest.label")}>
        <CategorySelect
          id="interest"
          name="interest"
          value={interest}
          onChange={setInterest}
          placeholder={t("form.interest.placeholder")}
          options={categoryOptions}
        />
      </Field>

      <Field id="message" label={t("form.message.label")}>
        <textarea
          id="message"
          name="message"
          rows={1}
          placeholder={t("form.message.placeholder")}
          className={`${inputClass} field-sizing-content resize-none`}
        />
      </Field>

      {/* Submit button */}
      <div className="mt-12">
        <button
          type="submit"
          className="inline-flex h-12 items-center gap-3 rounded-full bg-white px-7 text-base font-normal leading-[26px] tracking-[-0.005em] text-black uppercase transition-colors hover:bg-white/90"
        >
          {t("form.submit")}
          <span
            aria-hidden="true"
            className="block size-5 bg-black rtl:-scale-x-100"
            style={dotMask}
          />
        </button>
      </div>

      {/* Terms and Privacy Policy */}
      <p className="mt-9 text-base font-normal leading-[26px] tracking-[-0.005em] text-white/60 uppercase">
        {t.rich("form.terms", {
          terms: (chunks) => (
            <a href="#" className="underline-offset-4 hover:underline">
              {chunks}
            </a>
          ),
          privacy: (chunks) => (
            <a href="#" className="underline-offset-4 hover:underline">
              {chunks}
            </a>
          ),
        })}
      </p>
    </form>
  );
}